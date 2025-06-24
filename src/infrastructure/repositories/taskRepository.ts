import { JsonWebTokenError } from "jsonwebtoken";
import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interface/repositories/ITaskRepository";
import {  PaymentStatus, TaskDetails, TaskRequestDetails, TaskStatus, taskAcceptDetails } from "../../shared/types/TaskDetailsDTO";
import { TaskModel } from "../model/taskModel";

export class taskRepository implements ITaskRepository {
  async updateTaskStatus(taskId: string, task_status: TaskStatus): Promise<void> {
    await TaskModel.findByIdAndUpdate(taskId,{task_status:task_status}) 
  }
  async verifyCode(taskId: string, neighborId: string, code: string): Promise<Boolean> {
    const task = await TaskModel.findById(taskId)
   
  
    const neighborIdStr = neighborId.toString();
    if (!task || !task.task_code ) 
      throw new Error("Task or task code doesnt exist or task id is invalid")
    if (task.task_code === code && neighborIdStr === neighborId) return true
    
    else return false
  }
// ****************** get task by id *************************
  async getTaskById(taskId: string): Promise<TaskDetails> {
    const task = await TaskModel.findById(taskId)
    if (!task ) throw new Error("Task doesnt exist or task id is invalid")
    return JSON.parse(JSON.stringify(task))
  }
  
  //************************Get task Code****************** */
  async getTaskcode(taskId: string): Promise<string> {
    const task = await TaskModel.findById(taskId)
    if (!task || !task.task_code) throw new Error("Task code doesnt exist for this task or task id is invalid")
    return task.task_code
  }

  // *****************Add task Code **************************
  async addTaskCode(taskID: string, code: string): Promise<void> {
    console.log(code,"taskcode")
    await TaskModel.findByIdAndUpdate(taskID,{task_code:code})
  }
  //************Update Payment status ************ */
  async updatePaymentStatus(id:string,status: PaymentStatus): Promise<void> {
    await TaskModel.findByIdAndUpdate(id,{payment_status:status}) 
  }

  // ******************** Fetch Task status ****************************
  async fetchTaskStatus(id: string): Promise<TaskStatus> {
    const task = await TaskModel.findById(id);
    if (!task) {
      throw new Error("Invalid task id or this task doesn't exist");
    }

  
    return task.task_status as TaskStatus;
  }

  //**********Accept Task ************************ */
  async acceptTask(id: string,taskAcceptDetails:taskAcceptDetails): Promise<void> {
    try {
      const task = await TaskModel.findById(id)
      const {actual_hours,base_amount,platform_fee,final_amount,task_status,startTime}= taskAcceptDetails
    if (task) {
      const task =await TaskModel.findByIdAndUpdate(id, {"timeSlot.startTime":startTime,base_amount,platform_fee,final_amount,actual_hours, task_status },{new:true});
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
