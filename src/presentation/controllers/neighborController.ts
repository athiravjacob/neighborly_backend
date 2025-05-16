import {Request,Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../../shared/utils/responseHandler";
import { SaveAvailability } from "../../application/usecases/neighbor/SaveAvailbility";
import { SkillsUsecase } from "../../application/usecases/neighbor/SkillsUsecase";
import { LocationUsecase } from "../../application/usecases/neighbor/LocationUsecase";
import { TimeslotDTO } from "../../shared/types/TimeslotDTO";
import { TimeslotUsecase } from "../../application/usecases/neighbor/TimeslotUsecase";
import { SkillsDTO } from "../../shared/types/SkillsDTO";
import { locationDTO } from "../../shared/types/LocationDetailsDTO";
import { NeighborsListUsecase } from "../../application/usecases/neighbor/NeighborsListUsecase";
import { NeighborProfileUsecase } from "../../application/usecases/neighbor/NeighborProfileUsecase";
import { WalletUsecase } from "../../application/usecases/payment/walletUsecase";

interface NeighborQuery {
    city?: string;
    subCategory?: string;
  }

export class NeighborController {
    constructor(
        private availabilityUseCase: SaveAvailability,
        private skillsUseCase: SkillsUsecase,
        private serviceLocationUseCase: LocationUsecase,
        private getTimeslotUsecase: TimeslotUsecase,
        private neighborsList: NeighborsListUsecase,
        private neighborProfile: NeighborProfileUsecase,
        private walletUsecase:WalletUsecase

    ) { }

    //*****************Post available data and time****************/

    availableTimeslots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { neighborId, availability } = req.body
            console.groupCollapsed(req.body)
            const updatedNeighbor = await this.availabilityUseCase.execute(neighborId,availability)
            successResponse(res,200,'Availability updated successfully',updatedNeighbor)
        } catch (error) {
            next(error)
        }
    }

    //**********************Add New Skill**************** */
    addSkills = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { neighborId,skill } = req.body
            const skills = await this.skillsUseCase.saveSkills(neighborId, skill)
            successResponse(res,200,"skills Updated",skills)
        } catch (error) {
            next(error)
        }

    }

    //*************************Add Service Location***************************** */
    availableLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { neighborId, location } = req.body
            const serviceLocation = await this.serviceLocationUseCase.saveLocation( neighborId, location )
            successResponse(res,200,"service location details saved",serviceLocation)
        } catch (error) {
            next(error)
        }
    }

    //********************* Upload ID For verification ************************************* */
    uploadId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { imageUrl } = req.body
            const id = req.userId
        
            const status =await this.neighborProfile.uploadIdUrl(id!,imageUrl)
            successResponse(res,200,"Id card uploaded for verification",status)
        } catch (error) {
            next(error)
        }
    }

    //*************************Fetch AVAILABLE date and time************************************** */
    getTimeslots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id
            const data = await this.getTimeslotUsecase.getTimeslots(id)
            successResponse(res,200,"fetched neighbors available timeslots",data)
        } catch (error) {
            next(error)
        }
    }

    //**************************** Fetch Skills ************************** */
    getSkills = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id
            const data = await this.skillsUseCase.getSkills(id)
            successResponse(res,200,"fetched neighbors skills",data)
        } catch (error) {
            next(error)
        }
    }

    //**************************** Fetch sevice location ************************** */
    fetchLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id
            const data = await this.serviceLocationUseCase.getServiceLocation(id)
            successResponse(res,200,"fetched neighbors skills",data)
        } catch (error) {
            next(error)
        }
    }

    //********************************* List of available neighbors ***************************/

    availableNeighbors = async (req: Request<{},{},{},NeighborQuery>, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { city, subCategory } = req.query
            if (!city || !subCategory) {
                res.status(400).json({ success: false, message: "City and sub category is required" });
                return;
              }
            const data = await this.neighborsList.getNeighborsList(city, subCategory)
            successResponse(res,200,"fetched available neighbors ",data)

        } catch (error) {
            next(error)
        }
    }

    checkServiceAvailability = async (req: Request<{},{},{},NeighborQuery>, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {city} = req.query
            if (!city) {
                res.status(400).json({ success: false, message: "City is required" });
                return
            }
            const data = await this.neighborsList.checkServiceLocation(city)
            if (data === true) {
                successResponse(res,200,"Service available",data)
            } else
                errorResponse(res, 400, "No Service available in this area ")

        } catch (error) {
            next(error)
        }
    }

    fetchVerificationStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.userId
            const status = await this.neighborProfile.fetchStatus(id!)
            successResponse(res,200,"verifiation status",status)

        } catch (error) {
            next(error)
        }
    }

    // *********************Fetch Wallet Details*************

    fetchWallet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id
            if(!id) throw new Error("neigbor Id missing")
            const data = await this.walletUsecase.fetchNeighborWallet(id)
            successResponse(res,200,'neighbor fetched',data)
        } catch (error) {
            next(error) 

        }
    }
}