import { Task } from "../../../domain/entities/Task";
import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { ITaskRepository } from "../../../domain/interface/repositories/ITaskRepository";
import { Availability, TimeSlot } from "../../../shared/types/NeighborsDTO";
import { TaskDetails, TaskStatus, taskAcceptDetails } from "../../../shared/types/TaskDetailsDTO";

export class TaskUsecase {
    constructor(
        private taskRepository: ITaskRepository,
        private neighborRepository: INeighborRepository
    ) { }
    
    async createNewTask(taskDetails: TaskDetails): Promise<TaskDetails> {
        const newTask = await this.taskRepository.createTask(taskDetails)
        return newTask
    }

    async showUserTasks(id: string): Promise<TaskDetails[]> {
        const tasksList = await this.taskRepository.fetchUserTasks(id)
        return tasksList
        
    }
    async showNeighborTasks(id: string): Promise<TaskDetails[]> {
        const tasksList = await this.taskRepository.fetchNeighborTasks(id)
        return tasksList
    }
    async showAllTasks(): Promise<TaskDetails[]> {
        const tasksList = await this.taskRepository.fetchAllTasks()
        console.log(tasksList, "show all task")
        return tasksList
    }

    async acceptTask(taskId: string, neighborId: string, taskAcceptDetails: taskAcceptDetails): Promise<void> {
        // Validate inputs
        if (isNaN(Number(taskAcceptDetails.startTime)) || isNaN(taskAcceptDetails.est_hours) || taskAcceptDetails.est_hours <= 0) {
            throw new Error('Invalid start time or estimated hours');
        }
    
        // Calculate task details
        const platformFeePercentage = 0.1; // 10%
        const endTime = taskAcceptDetails.startTime + (taskAcceptDetails.est_hours * 3600);
        const platform_fee = taskAcceptDetails.baseAmount * platformFeePercentage;
        const final_amount = Number(taskAcceptDetails.baseAmount) + Number(platform_fee || 0) + Number(taskAcceptDetails.extra_charges || 0);
        const new_details = { ...taskAcceptDetails, endTime, platform_fee, final_amount };
    
        // Update task
                await this.taskRepository.acceptTask(taskId, new_details);

    
        // Fetch neighbor availability
        // const neighborAvailability = await this.neighborRepository.getavailableTimeslot(neighborId);
        // if (!neighborAvailability) {
        //     throw new Error('Neighbor not found');
        // }
        // if (!Array.isArray(neighborAvailability)) {
        //     throw new Error('Invalid availability data');
        // }
    
        // // Get task date (midnight UTC, adjust to IST if needed)
        // const taskDate = new Date(Number(taskAcceptDetails.startTime) * 1000);
        // taskDate.setUTCHours(0, 0, 0, 0); // Midnight UTC
        // // For IST: Uncomment the following
        // /*
        // const istOffsetMs = 5.5 * 60 * 60 * 1000;
        // const istDate = new Date(taskDate.getTime() + istOffsetMs);
        // istDate.setUTCHours(0, 0, 0, 0);
        // const finalIstDate = new Date(istDate.getTime() - istOffsetMs);
        // */
    
        // // Update availability
        // const updatedAvailability = this.updateNeighborAvailability(
        //     neighborAvailability, // Pass array directly
        //     taskDate, // Use finalIstDate for IST
        //     Number(taskAcceptDetails.startTime),
        //     Number(endTime)
        // );
        // console.log('Updated Availability:', JSON.stringify(updatedAvailability, null, 2));
    
        // // Save updated availability
        // try {
        //     await this.neighborRepository.saveAvailabilty(neighborId, updatedAvailability);
        // } catch (error) {
        //     console.log(error)
        //     throw new Error(`Failed to save availability: ${error}`);
        // }

    }

    private updateNeighborAvailability(
        availability: Availability[],
        taskDate: Date,
        taskStartTime: number,
        taskEndTime: number
    ): Availability[] {
        console.log("update Neighbor Availblity")
        let availabilityEntry = availability.find(
            (entry) => entry.date.toDateString() === taskDate.toDateString()
        );
    
        if (!availabilityEntry) {
            availabilityEntry = {
                date: taskDate,
                timeSlots: [
                    { startTime: taskStartTime, endTime: taskEndTime, note: 'booked' },
                ],
            };
            availability.push(availabilityEntry);
            return availability;
        }
    
        const newSlots: TimeSlot[] = [];
        availabilityEntry.timeSlots.forEach((slot) => {
            const isOverlapping =
                slot.startTime <= taskEndTime && slot.endTime >= taskStartTime;
    
            if (!isOverlapping) {
                newSlots.push(slot);
            } else {
                if (slot.startTime < taskStartTime) {
                    newSlots.push({
                        startTime: slot.startTime,
                        endTime: taskStartTime,
                        note: 'available',
                    });
                }
                if (slot.endTime > taskEndTime) {
                    newSlots.push({
                        startTime: taskEndTime,
                        endTime: slot.endTime,
                        note: 'available',
                    });
                }
            }
        });
    
        newSlots.push({
            startTime: taskStartTime,
            endTime: taskEndTime,
            note: 'booked',
        });
    
        newSlots.sort((a, b) => a.startTime - b.startTime);
        availabilityEntry.timeSlots = newSlots;
        return availability;
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