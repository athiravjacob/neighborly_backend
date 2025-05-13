import { JsonWebTokenError } from "jsonwebtoken";
import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interface/repositories/ITaskRepository";
import { PaymentStatus, TaskDetails, TaskStatus } from "../../shared/types/TaskDetailsDTO";
import { TaskModel } from "../model/taskModel";

export class taskRepository implements ITaskRepository {
  async updatePaymentStatus(id:string,status: PaymentStatus): Promise<void> {
    await TaskModel.findByIdAndUpdate(id,{payment_status:status}) 
  }

  async fetchTaskStatus(id: string): Promise<TaskStatus> {
    const task = await TaskModel.findById(id);
    if (!task) {
      throw new Error("Invalid task id or this task doesn't exist");
    }

  
    return task.task_status as TaskStatus;
  }

  //**********Accept Task ************************ */
  async acceptTask(id: string): Promise<void> {
    try {
      const task = await TaskModel.findById(id)
    if (task) {
      const task =await TaskModel.findByIdAndUpdate(id, { task_status: "assigned" },{new:true});
      console.log(task?.task_status,"taskStatus")
      return
      }
      throw new Error("Incorrect Task Id")
    } catch (error) {
      console.log(error)
      throw new Error("Some error occured couldnt update task status")
    }
    
  }

  async fetchAllTasks(): Promise<[] | TaskDetails[]> {
    const TaskList = await TaskModel.find().populate([
      { path: "assignedNeighbor", select: "-password" },
      { path: "createdBy", select: "-password" },
    ]);
    return TaskList ? JSON.parse(JSON.stringify(TaskList)) : [];
  }

  async fetchNeighborTasks(id: string): Promise<[] | TaskDetails[]> {
    const taskList = await TaskModel.find({ assignedNeighbor: id }).populate([
      { path: "assignedNeighbor", select: "-password" },
      { path: "createdBy", select: "-password" },
    ]);
    return taskList ? JSON.parse(JSON.stringify(taskList)) : [];
  }

  async fetchUserTasks(id: string): Promise<TaskDetails[]> {
    const taskList = await TaskModel.find({ createdBy: id }).populate([
      { path: "assignedNeighbor", select: "-password" },
      { path: "createdBy", select: "-password" },
    ]);
    return taskList ? JSON.parse(JSON.stringify(taskList)) : [];
  }

  async createTask(taskDetails: TaskDetails): Promise<TaskDetails> {
    
    try {
      const taskDoc = await TaskModel.create(taskDetails);
      console.log(taskDoc._id)
      return JSON.parse(JSON.stringify(taskDoc));
    } catch (error) {
      console.log(error)
      throw new Error("error creating task")
    }

  }
}
