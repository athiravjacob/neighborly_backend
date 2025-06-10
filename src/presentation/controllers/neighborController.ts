import {Request,Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../../shared/utils/responseHandler";
import { WeeklySchedule } from "../../application/usecases/neighbor/WeeklySchedule";
import { SkillsUsecase } from "../../application/usecases/neighbor/SkillsUsecase";
import { LocationUsecase } from "../../application/usecases/neighbor/LocationUsecase";
import { TimeslotDTO } from "../../shared/types/TimeslotDTO";
import { TimeslotUsecase } from "../../application/usecases/neighbor/TimeslotUsecase";
import { SkillsDTO } from "../../shared/types/SkillsDTO";
import { locationDTO } from "../../shared/types/LocationDetailsDTO";
import { NeighborsListUsecase } from "../../application/usecases/neighbor/NeighborsListUsecase";
import { NeighborProfileUsecase } from "../../application/usecases/neighbor/NeighborProfileUsecase";
import { WalletUsecase } from "../../application/usecases/payment/walletUsecase";
import { TaskUsecase } from "../../application/usecases/task/TaskUsecase";
import { saveTransaction } from "../../application/usecases/payment/saveTransactionUsecase";
import { HttpStatus } from "../../shared/constants/httpStatus";
import { Messages } from "../../shared/constants/messages";
import { HttpStatusCode } from "axios";

interface NeighborQuery {
    lat?: number;
    lng?: number;
    subCategory?: string;
  }

export class NeighborController {
    constructor(
        private availabilityUseCase: WeeklySchedule,
        private skillsUseCase: SkillsUsecase,
        private serviceLocationUseCase: LocationUsecase,
        private getTimeslotUsecase: TimeslotUsecase,
        private neighborsList: NeighborsListUsecase,
        private neighborProfile: NeighborProfileUsecase,
        private walletUsecase: WalletUsecase,
        private taskUsecase: TaskUsecase,
        private recordTransactionUsecase: saveTransaction,
    ) { }

    //*****************Post available data and time****************/

    weeklySchedule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { neighborId } = req.params
            const { availability } = req.body
            const schedule = {
                neighborId,
                availability
            }
            const neighborSchedules = await this.availabilityUseCase.saveAvailability(schedule)
            successResponse(res, HttpStatus.OK, Messages.SUCCESS.NEIGHBOR_TIMESLOT_UPDATED, neighborSchedules)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    //**********************Add New Skill**************** */
    addSkills = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {neighborId} = req.params
            const { skill } = req.body
            const skills = await this.skillsUseCase.saveSkills(neighborId, skill)
            successResponse(res, HttpStatus.OK,Messages.SUCCESS.NEIGHBOR_SKILL_ADDED, skills)
        } catch (error) {
            next(error)
        }

    }

    //*************************Add Service Location***************************** */
    availableLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {neighborId}=req.params
            const {  location } = req.body
            const serviceLocation = await this.serviceLocationUseCase.saveLocation(neighborId, location)
            successResponse(res, HttpStatus.OK, Messages.SUCCESS.NEIGHBOR_LOCATION_ADDED, serviceLocation)
        } catch (error) {
            next(error)
        }
    }

    //********************* Upload ID For verification ************************************* */
    uploadId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { imageUrl } = req.body
            const id = req.params.neighborId
        
            const status = await this.neighborProfile.uploadIdUrl(id!, imageUrl)
            successResponse(res, HttpStatus.OK, Messages.SUCCESS.NEIGHBOR_ID_ADDED, status)
        } catch (error) {
            next(error)
        }
    }

    //*************************Fetch AVAILABLE date and time************************************** */
    getWeeklySchedule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.neighborId
            const data = await this.availabilityUseCase.getAvailability(id)
            console.log(data)
            successResponse(res, HttpStatus.OK, Messages.SUCCESS.NEIGHBOR_TIMESLOT_FETCHED, data)
        } catch (error) {
            next(error)
        }
    }

    //**************************** Fetch Skills ************************** */
    getSkills = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.neighborId
            const data = await this.skillsUseCase.getSkills(id)
            successResponse(res, HttpStatus.OK, Messages.SUCCESS.NEIGHBOR_SKILLS_FETCHED, data)
        } catch (error) {
            next(error)
        }
    }

    //**************************** Fetch sevice location ************************** */
    fetchLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.neighborId
            const data = await this.serviceLocationUseCase.getServiceLocation(id)
            successResponse(res, HttpStatus.OK, Messages.SUCCESS.NEIGHBOR_LOCATION_FETCHED, data)
        } catch (error) {
            next(error)
        }
    }

    //********************************* List of available neighbors ***************************/

    availableNeighbors = async (req: Request<{}, {}, {}, NeighborQuery>, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { lng,lat, subCategory } = req.query
           // Validate all required query parameters
      if (!lng || !lat || !subCategory) {
        errorResponse(res, HttpStatus.BAD_REQUEST, Messages.ERROR.MISSING_FIELDS);
        return;
      }

    
      if (isNaN(lat) || isNaN(lng)) {
        errorResponse(res, HttpStatus.BAD_REQUEST, 'Invalid coordinates: lat and lng must be valid numbers');
        return;
      }

      // Validate subCategory
      if (typeof subCategory !== 'string' || subCategory.trim() === '') {
        errorResponse(res, HttpStatus.BAD_REQUEST, 'Invalid subCategory: must be a non-empty string');
        return;
      }

      // Call the service to get neighbors
      const data = await this.neighborsList.getNeighborsList(lng, lat, subCategory);
      successResponse(res, HttpStatus.OK, Messages.SUCCESS.AVAILABLE_NEIGHBORS, data);
        } catch (error) {
            next(error)
        }
    }

    // ************************************ CHECK SERVICE AVAILABLITY ************************
    // checkServiceAvailability = async (req: Request<{}, {}, {}, NeighborQuery>, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         const { lng,lat ,subCategory} = req.query
    //         if (!lng ||!lat || !subCategory) {
    //             errorResponse(res,HttpStatus.BAD_REQUEST,Messages.ERROR.MISSING_FIELDS)
    //             return;
    //         }
    //         const latitude = parseFloat(lat);
    //   const longitude = parseFloat(lng);
    //   if (isNaN(latitude) || isNaN(longitude)) {
    //     errorResponse(res, HttpStatus.BAD_REQUEST, 'Invalid coordinates: lat and lng must be valid numbers');
    //     return;
    //   }

    //   // Validate subCategory
    //   if (typeof subCategory !== 'string' || subCategory.trim() === '') {
    //     errorResponse(res, HttpStatus.BAD_REQUEST, 'Invalid subCategory: must be a non-empty string');
    //     return;
    //   }
    //         const data = await this.neighborsList.checkServiceLocation(longitude,latitude, subCategory)
    //         console.log(data)
    //         if (data === true) {
    //             successResponse(res, HttpStatus.OK, Messages.SUCCESS.SERVICE_AVAILABLE,data)
    //         } else
    //         successResponse(res, HttpStatus.OK, Messages.SUCCESS.SERVICE_NOT_AVAILABLE,data)

    //     } catch (error) {
    //         console.log(error)
    //         next(error)
    //     }
    // }

    fetchVerificationStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.neighborId
            const status = await this.neighborProfile.fetchStatus(id!)
            successResponse(res, HttpStatus.OK, Messages.SUCCESS.NEIGHBOR_VERIFICATION_STATUS, status)

        } catch (error) {
            next(error)
        }
    }

    // *********************Fetch Wallet Details*************

    fetchWallet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            
            const id = req.params.neighborId
            if (!id) throw new Error("neigbor Id missing")
            const data = await this.walletUsecase.fetchNeighborWallet(id)
            console.log(data)
            successResponse(res, HttpStatus.OK,Messages.SUCCESS.NEIGHBOR_WALLET, data)
        } catch (error) {
            console.log(error)
            next(error)

        }
    }

    //******************Fetch Tasks Assigned to neighbor ************** */
    fetchAssignedTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { neighborId } = req.params
            const data = await this.taskUsecase.showNeighborTasks(neighborId)
            successResponse(res, HttpStatus.OK, Messages.SUCCESS.NEIGHBOR_TASKS_DETAILS, data)
        } 
        catch (error) {
            next(error)
        }
    }

    // ***********************Transaction Details *********************

    getTransactionHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
        try {
          const  id  = req.params.neighborId
          const transactions = await this.recordTransactionUsecase.neighborTransactions(id)
          console.log(transactions)
          successResponse(res, HttpStatus.OK, Messages.SUCCESS.NEIGHBOR_TRANSACTIONS, transactions);
    
          
        } catch (error) {
          next(error)
        }
      }
    
}
