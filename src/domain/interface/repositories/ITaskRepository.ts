import { TaskDetails } from "../../../shared/types/TaskDetailsDTO";
import { Task } from "../../entities/Task";

export interface ITaskRepository{
    createTask(taskDetails: TaskDetails): Promise<void>;
}