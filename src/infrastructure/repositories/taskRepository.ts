import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interface/repositories/ITaskRepository";
import { TaskDetails } from "../../shared/types/TaskDetailsDTO";
import { TaskModel } from "../model/taskModel";

export class taskRepository implements ITaskRepository{
    async createTask(taskDetails: TaskDetails): Promise<void> {
        console.log(taskDetails)
        const taskDoc = await TaskModel.create(taskDetails)

        console.log(taskDoc)

    }

}