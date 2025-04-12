import { JsonWebTokenError } from "jsonwebtoken";
import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interface/repositories/ITaskRepository";
import { TaskDetails } from "../../shared/types/TaskDetailsDTO";
import { TaskModel } from "../model/taskModel";

export class taskRepository implements ITaskRepository{
    async fetchUserTasks(id: string): Promise<TaskDetails[]> {
        const taskList = await TaskModel.find({ createdBy: id })
        return taskList? JSON.parse(JSON.stringify(taskList)):[]
    }



    async createTask(taskDetails: TaskDetails): Promise<TaskDetails> {
        console.log(taskDetails)
        const taskDoc = await TaskModel.create(taskDetails)
        return JSON.parse(JSON.stringify(taskDoc))
    }

}