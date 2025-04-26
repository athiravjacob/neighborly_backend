import { TaskDetails } from "../../../shared/types/TaskDetailsDTO";
import { Task } from "../../entities/Task";

export interface ITaskRepository{
    createTask(taskDetails: TaskDetails): Promise<TaskDetails>;
    fetchUserTasks(id: string): Promise<TaskDetails[]>
    fetchNeighborTasks(id: string): Promise<TaskDetails[] | []>
    fetchAllTasks():Promise<TaskDetails[]|[]>

}