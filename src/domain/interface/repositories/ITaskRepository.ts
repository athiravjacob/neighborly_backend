import {  PaymentStatus, TaskDetails, TaskStatus, taskAcceptDetails } from "../../../shared/types/TaskDetailsDTO";
import { Task } from "../../entities/Task";

export interface ITaskRepository{
    createTask(taskDetails: TaskDetails): Promise<TaskDetails>;
    fetchUserTasks(userId: string): Promise<TaskDetails[]>
    fetchNeighborTasks(neighborId: string): Promise<TaskDetails[] | []>
    fetchAllTasks(): Promise<TaskDetails[] | []>
    acceptTask(taskId: string,taskAcceptDetails:taskAcceptDetails): Promise<void>
    fetchTaskStatus(taskId: string): Promise<TaskStatus>
    updatePaymentStatus(taskId: string, status: PaymentStatus): Promise<void>
    addTaskCode(taskID: string, code: string): Promise<void>
    getTaskcode(taskId: string): Promise<string>
    getTaskById(taskId:string):Promise<TaskDetails>
    verifyCode(taskId: string, neighborId: string, code: string): Promise<Boolean>
    updateTaskStatus(taskId:string,task_status:TaskStatus):Promise<void>
}