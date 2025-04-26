import { JsonWebTokenError } from "jsonwebtoken";
import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interface/repositories/ITaskRepository";
import { TaskDetails } from "../../shared/types/TaskDetailsDTO";
import { TaskModel } from "../model/taskModel";

export class taskRepository implements ITaskRepository{
    async fetchAllTasks(): Promise<[] | TaskDetails[]> {
        const TaskList = await TaskModel.find().select('-password');
        return TaskList? JSON.parse(JSON.stringify(TaskList)) : []
    }

    async fetchNeighborTasks(id: string): Promise<[] | TaskDetails[]> {
        const taskList = await TaskModel.find({ assignedNeighbor: id })
        return taskList ? JSON.parse(JSON.stringify(taskList)) : []
    }
    
    async fetchUserTasks(id: string): Promise<TaskDetails[]> {
        const taskList = await TaskModel.find({ createdBy: id })
        return taskList? JSON.parse(JSON.stringify(taskList)):[]
    }



    async createTask(taskDetails: TaskDetails): Promise<TaskDetails> {
        const taskDoc = await TaskModel.create(taskDetails)
        return JSON.parse(JSON.stringify(taskDoc))
    }

}