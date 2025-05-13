import { PaymentStatus, TaskDetails, TaskStatus } from "../../../shared/types/TaskDetailsDTO";
import { Task } from "../../entities/Task";

export interface ITaskRepository{
    createTask(taskDetails: TaskDetails): Promise<TaskDetails>;
    fetchUserTasks(id: string): Promise<TaskDetails[]>
    fetchNeighborTasks(id: string): Promise<TaskDetails[] | []>
    fetchAllTasks(): Promise<TaskDetails[] | []>
    acceptTask(id: string): Promise<void>
    fetchTaskStatus(id: string): Promise<TaskStatus>
    updatePaymentStatus(id:string,status:PaymentStatus):Promise<void>

}