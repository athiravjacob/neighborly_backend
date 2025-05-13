import { Task } from "../../../domain/entities/Task";
import { ITaskRepository } from "../../../domain/interface/repositories/ITaskRepository";
import { TaskDetails, TaskStatus } from "../../../shared/types/TaskDetailsDTO";

export class TaskUsecase{
    constructor(
        private taskRepository:ITaskRepository
    ) { }
    
    async createNewTask(taskDetails: TaskDetails): Promise<TaskDetails>{
        const newTask = await this.taskRepository.createTask(taskDetails)
        return newTask
    }

    async showUserTasks(id: string): Promise<TaskDetails[]>{
        const tasksList = await this.taskRepository.fetchUserTasks(id)
        return tasksList
        
    }
    async showNeighborTasks(id: string): Promise<TaskDetails[]>{
        const tasksList = await this.taskRepository.fetchNeighborTasks(id)
        return tasksList
    }
    async showAllTasks(): Promise<TaskDetails[]>{
        const tasksList = await this.taskRepository.fetchAllTasks()
        console.log(tasksList,"show all task")
        return tasksList
    }

    async acceptTask(taskId:string): Promise<void>{
        await this.taskRepository.acceptTask(taskId)
    }

    async fetctTaskStatus(taskId: string): Promise<TaskStatus>{
        const taskStatus = await this.taskRepository.fetchTaskStatus(taskId)
        return taskStatus
        
    }
}