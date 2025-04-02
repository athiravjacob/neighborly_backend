import {Request,Response, NextFunction } from "express";
import { successResponse } from "../../shared/utils/responseHandler";
import { SaveAvailability } from "../../application/usecases/neighbor/SaveAvailbility";
import { SkillsUsecase } from "../../application/usecases/neighbor/SkillsUsecase";
import { LocationUsecase } from "../../application/usecases/neighbor/LocaionUsecase";
import { TimeslotDTO } from "../../shared/types/TimeslotDTO";
import { TimeslotUsecase } from "../../application/usecases/neighbor/TimeslotUsecase";
import { SkillsDTO } from "../../shared/types/SkillsDTO";
import { locationDTO } from "../../shared/types/LocationDetailsDTO";

export class NeighborController {
    constructor(
        private availabilityUseCase: SaveAvailability,
        private skillsUseCase: SkillsUsecase,
        private serviceLocationUseCase: LocationUsecase,
        private getTimeslotUsecase:TimeslotUsecase
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
            console.log(skills)
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
            console.log(data)
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
            console.log(data)
            successResponse(res,200,"fetched neighbors skills",data)
        } catch (error) {
            next(error)
        }
    }
}