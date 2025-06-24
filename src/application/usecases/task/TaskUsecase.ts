import { Booking } from "../../../domain/entities/Booking";
import { Task } from "../../../domain/entities/Task";
import { IBookingRepository } from "../../../domain/interface/repositories/IBookingRepository";
import { INeighborRepository } from "../../../domain/interface/repositories/INeighborRepository";
import { IScheduleRepository } from "../../../domain/interface/repositories/IScheduleRepository";
import { ITaskRepository } from "../../../domain/interface/repositories/ITaskRepository";
import { BookingDetails } from "../../../shared/types/Booking";
import { Availability, TimeSlot } from "../../../shared/types/NeighborsDTO";
import { TaskAcceptForm, TaskDetails, TaskStatus, taskAcceptDetails } from "../../../shared/types/TaskDetailsDTO";
import { AppError } from "../../../shared/utils/errors";

export class TaskUsecase {
  constructor(
    private taskRepository: ITaskRepository,
    private neighborRepository: INeighborRepository,
    private scheduleRepository: IScheduleRepository,
    private bookingRepository:IBookingRepository
  ) {}

  async createNewTask(taskDetails: TaskDetails): Promise<TaskDetails> {
    const newTask = await this.taskRepository.createTask(taskDetails);
    return newTask;
  }

  async showUserTasks(id: string): Promise<TaskDetails[]> {
    const tasksList = await this.taskRepository.fetchUserTasks(id);
    return tasksList;
  }
  async showNeighborTasks(id: string): Promise<TaskDetails[]> {
    const tasksList = await this.taskRepository.fetchNeighborTasks(id);
    return tasksList;
  }
  async showAllTasks(): Promise<TaskDetails[]> {
    const tasksList = await this.taskRepository.fetchAllTasks();
    console.log(tasksList, "show all task");
    return tasksList;
  }

  async acceptTask(
    taskId: string,
    neighborId: string,
    acceptDetails: TaskAcceptForm
  ): Promise<void> {
    
    try {
      const ADMIN_FEE_PERCENTAGE = 0.05
      let platform_fee = acceptDetails.paymentAmount * ADMIN_FEE_PERCENTAGE
      let final_amount = acceptDetails.paymentAmount + platform_fee

      const taskAcceptDetails:taskAcceptDetails  = {
        actual_hours: acceptDetails.estimatedHours,
        base_amount: acceptDetails.paymentAmount,
        platform_fee,
        final_amount,
        task_status:"assigned" ,
        startTime: acceptDetails.arrivalTime!,

      }
      let endTime = acceptDetails.arrivalTime! + (acceptDetails.estimatedHours *60)
      let booking: BookingDetails = { taskId, neighborId, date:acceptDetails.date, startTime: acceptDetails.arrivalTime!, endTime,bufferTime:30, status: "pending" }


      await this.taskRepository.acceptTask(taskId, taskAcceptDetails)
      await this.bookingRepository.addBookingDetails(booking)

      



    } catch (error) {
      
    }
  }

  

  async fetctTaskStatus(taskId: string): Promise<TaskStatus> {
    const taskStatus = await this.taskRepository.fetchTaskStatus(taskId);
    return taskStatus;
  }

  async updateTaskCode(taskId: string, code: string): Promise<void> {
    await this.taskRepository.addTaskCode(taskId, code);
  }

  async getTaskCode(taskId: string): Promise<string> {
    return await this.taskRepository.getTaskcode(taskId);
  }
  async getTaskById(taskId: string): Promise<TaskDetails> {
    return await this.taskRepository.getTaskById(taskId);
  }

  async verifyTaskcode(
    taskId: string,
    neighborId: string,
    taskCode: string
  ): Promise<void> {
    const isCodeValid = await this.taskRepository.verifyCode(
      taskId,
      neighborId,
      taskCode
    );
    if (isCodeValid) {
      await this.taskRepository.updateTaskStatus(taskId, "in_progress");
    } else throw new Error("Invalid code or task and neighbor doesnt match");
  }

  async taskCompleted(taskId: string): Promise<void> {
    await this.taskRepository.updateTaskStatus(taskId, "completed");
  }

  // ***********************Arraival time of neighbor ***********************************
  async neighborsArrivalTime(
    taskId: string,
    neighborId: string,
    date: Date,
    hours_needed: number
): Promise<number | null> {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const dayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const dayOfWeek = dayMap[day];

    // Fetch neighbor's schedule
    const neighbor_schedule = await this.scheduleRepository.getNeighborSchedule(neighborId);
    const daySchedule = neighbor_schedule.availability.find(
        (d) => d.dayOfWeek === dayOfWeek
    );

    if (
        !daySchedule ||
        !daySchedule.timeslots ||
        daySchedule.timeslots.length === 0
    ) {
        throw new AppError(404, "Neighbor is not available on the selected date");
    }

    // Calculate required minutes (hours_needed + 30-minute buffer)
    const bufferTime = 30;
    const requiredMinutes = hours_needed * 60 + bufferTime;

    // Fetch bookings for the date
    const bookings = await this.bookingRepository.getBookingDetails(neighborId, newDate);

    // Sort bookings by startTime to ensure chronological order
    bookings.sort((a, b) => a.startTime - b.startTime);

    // For each timeslot, find the earliest available slot
    for (const slot of daySchedule.timeslots) {
        const slotDuration = slot.endTime - slot.startTime;

        // Skip if the timeslot is too short
        if (slotDuration < requiredMinutes) {
            continue;
        }

        // If no bookings, check if the entire slot can accommodate the booking
        if (bookings.length === 0) {
          if (slot.endTime - slot.startTime >= requiredMinutes) {
              
                    return slot.startTime + bufferTime;
                
            }
            continue;
        }

        // Check gaps before the first booking
        if (bookings[0].startTime > slot.startTime) {
            const gap = bookings[0].startTime - slot.startTime;
            if (gap >= requiredMinutes) {
                    return slot.startTime + bufferTime;
  
            }
        }

        // Check gaps between consecutive bookings
        for (let i = 0; i < bookings.length - 1; i++) {
            const currentBooking = bookings[i];
            const nextBooking = bookings[i + 1];

            // Ensure the gap is within the current timeslot
            if (
                currentBooking.endTime >= slot.startTime &&
                nextBooking.startTime <= slot.endTime
            ) {
                const gap = nextBooking.startTime - currentBooking.endTime;
                if (gap >= requiredMinutes) {
                    const potentialStartTime = currentBooking.endTime;
                    // Ensure the start time is within the slot
                    if (potentialStartTime >= slot.startTime) {

                        
                            return potentialStartTime+ bufferTime;
                    }
                }
            }
        }

        // Check gap after the last booking
        const lastBooking = bookings[bookings.length - 1];
        if (lastBooking.endTime < slot.endTime) {
            const gap = slot.endTime - lastBooking.endTime;
            if (gap >= requiredMinutes) {
                return lastBooking.endTime + bufferTime;
                
            }
        }
    }

    return null;
}
} 