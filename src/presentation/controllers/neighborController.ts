import {Request,Response, NextFunction } from "express";
import { successResponse } from "../../shared/utils/responseHandler";
import { SaveAvailability } from "../../application/usecases/neighbor/SaveAvailbility";
import { SkillsUsecase } from "../../application/usecases/neighbor/SkillsUsecase";
import { LocationUsecase } from "../../application/usecases/neighbor/LocaionUsecase";
import { TimeslotDTO } from "../../shared/types/TimeslotDTO";
import { TimeslotUsecase } from "../../application/usecases/neighbor/TimeslotUsecase";

export class NeighborController {
    constructor(
        private availabilityUseCase: SaveAvailability,
        private skillsUseCase: SkillsUsecase,
        private serviceLocationUseCase: LocationUsecase,
        private getTimeslotUsecase:TimeslotUsecase
    ) { }

    availableTimeslots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log("hello")
            const { neighborId, availability } = req.body
            console.groupCollapsed(req.body)
            const updatedNeighbor = await this.availabilityUseCase.execute(neighborId,availability)
            successResponse(res,200,'Availability updated successfully',updatedNeighbor)
        } catch (error) {
            next(error)
        }
    }

    addSkills = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id,skill } = req.body
            await this.skillsUseCase.saveSkills(id, skill )
            successResponse(res,200,"skills Updated")
        } catch (error) {
            next(error)
        }

    }

    availableLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id, location } = req.body
            await this.serviceLocationUseCase.saveLocation( id, location )
            successResponse(res,200,"service location details saved")
        } catch (error) {
            next(error)
        }
    }

    getTimeslots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id
            const data = await this.getTimeslotUsecase.getTimeslots(id)
            successResponse(res,200,"fetched neighbors available timeslots",data)
        } catch (error) {
            next(error)
        }
    }
}