import { User } from "../../../domain/entities/User";
import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { ITaskRepository } from "../../../domain/interface/repositories/ITaskRepository";
import { IUserRepository } from "../../../domain/interface/repositories/IUserRepository";
import { NeighborInfo } from "../../../shared/types/NeighborsDTO";
import { TaskDetails } from "../../../shared/types/TaskDetailsDTO";

export class AdminFetchUsecase{
    constructor(
        private userRepository: IUserRepository,
        private neighborRepository:INeighborRepository,
        private taskRepository:ITaskRepository,
    ) { }
    
    async usersList(): Promise<User[] | []>{
        return await this.userRepository.fetchAllUsers()
    }

    async neighborsList(): Promise<NeighborInfo[] | []>{
        return this.neighborRepository.fetchAllNeighbors()
    }

    async tasksList(): Promise<TaskDetails[] | []>{
        return this.taskRepository.fetchAllTasks()
    }
}