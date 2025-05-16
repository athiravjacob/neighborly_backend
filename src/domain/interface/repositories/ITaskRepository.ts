import { PaymentStatus, TaskDetails, TaskStatus } from "../../../shared/types/TaskDetailsDTO";
import { Task } from "../../entities/Task";

export interface ITaskRepository{
    createTask(taskDetails: TaskDetails): Promise<TaskDetails>;
    fetchUserTasks(id: string): Promise<TaskDetails[]>
    fetchNeighborTasks(id: string): Promise<TaskDetails[] | []>
    fetchAllTasks(): Promise<TaskDetails[] | []>
    acceptTask(id: string): Promise<void>
    fetchTaskStatus(id: string): Promise<TaskStatus>
    updatePaymentStatus(id: string, status: PaymentStatus): Promise<void>
    addTaskCode(taskID: string, code: string): Promise<void>
    getTaskcode(taskId: string): Promise<string>
    getTaskById(taskId:string):Promise<TaskDetails>
    verifyCode(taskId: string, neighborId: string, code: string): Promise<Boolean>
    updateTaskStatus(taskId:string,task_status:TaskStatus):Promise<void>
}