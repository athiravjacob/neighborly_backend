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

    async updateTaskCode(taskId: string, code: string): Promise<void>{
        await this.taskRepository.addTaskCode(taskId,code)
    }

    async getTaskCode(taskId: string): Promise<string>{
        return await this.taskRepository.getTaskcode(taskId)
    }
    async getTaskById(taskId: string): Promise<TaskDetails>{
        return await this.taskRepository.getTaskById(taskId)
    }

    async verifyTaskcode(taskId: string, neighborId: string, taskCode: string): Promise<void>{
        const isCodeValid = await this.taskRepository.verifyCode(taskId, neighborId, taskCode)
        if (isCodeValid) {
            await this.taskRepository.updateTaskStatus(taskId,'in_progress' )
        }else throw new Error("Invalid code or task and neighbor doesnt match")
    }

    async taskCompleted(taskId: string): Promise<void>{
        await this.taskRepository.updateTaskStatus(taskId,'completed' )
    }
} 