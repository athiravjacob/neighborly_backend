import { Task } from "../../../domain/entities/Task";
import { ITaskRepository } from "../../../domain/interface/repositories/ITaskRepository";
import { TaskDetails } from "../../../shared/types/TaskDetailsDTO";

export class TaskUsecase{
    constructor(
        private taskRepository:ITaskRepository
    ) { }
    
    async createNewTask(taskDetails: TaskDetails): Promise<TaskDetails>{
        console.log("no prob at task uc",taskDetails)
        const newTask = await this.taskRepository.createTask(taskDetails)
        return newTask
    }

    async showUserTasks(id: string): Promise<TaskDetails[]>{
        console.log(id, "usecase")
        const tasksList = await this.taskRepository.fetchUserTasks(id)
        console.log(tasksList)
        return tasksList
        
    }
}