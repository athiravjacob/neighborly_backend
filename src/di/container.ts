import { forgotPasswordUsecase } from "../application/usecases/auth/ForgotPassword";
import { SendOtpUsecase } from "../application/usecases/auth/SendOTP-email";
import { SignupUseCase } from "../application/usecases/auth/Signup";
import { verifyOtpUseCase } from "../application/usecases/auth/VerifyOTP";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { AuthService } from "../infrastructure/services/authService-impl";
import { EmailServiceImpl } from "../infrastructure/services/emailService-impl";
import { AuthController } from "../presentation/controllers/authController";
import { ResetPasswordUseCase } from "../application/usecases/auth/ResetPassword";
import {OtpRepository} from "../infrastructure/repositories/otpRepository";
import { LoginUsecase } from "../application/usecases/auth/Login";
import { LogoutUsecase } from "../application/usecases/auth/Logout";
import { tokenRepository } from "../infrastructure/repositories/tokenRepository";
import { neighborRepository } from "../infrastructure/repositories/neighborRepository";
import { SaveAvailability } from "../application/usecases/neighbor/SaveAvailbility";
import { NeighborController } from "../presentation/controllers/neighborController";
import { SkillsUsecase } from "../application/usecases/neighbor/SkillsUsecase";
import { LocationUsecase } from "../application/usecases/neighbor/LocationUsecase";
import { TimeslotUsecase } from "../application/usecases/neighbor/TimeslotUsecase";
import { NeighborsListUsecase } from "../application/usecases/neighbor/NeighborsListUsecase";
import { taskRepository } from "../infrastructure/repositories/taskRepository";
import { TaskUsecase } from "../application/usecases/task/TaskUsecase";
import { TaskController } from "../presentation/controllers/taskController";

export class Container {
  
    public static userRepository = new UserRepository();
    public static authService = new AuthService();
    public static emailService = new EmailServiceImpl()
    public static OTPRepository = new OtpRepository()
    public static tokenRepository = new tokenRepository()
    public static neighborRepository = new neighborRepository()
    public static signupUseCase = new SignupUseCase(Container.userRepository,Container.neighborRepository, Container.authService);
    public static loginUseCase = new LoginUsecase(Container.userRepository,Container.neighborRepository,Container.tokenRepository,Container.authService)
    public static logoutUsecase = new LogoutUsecase(Container.tokenRepository)
    public static VerifyOtpUsecase = new verifyOtpUseCase(Container.OTPRepository)
    public static resetPasswordUseCase = new ResetPasswordUseCase(Container.userRepository,Container.authService)
    public static forgotPassword = new forgotPasswordUsecase(Container.userRepository,Container.emailService)
    public static sendotpUsecase = new SendOtpUsecase(Container.OTPRepository,Container.emailService)
    public static authController = new AuthController(
      Container.signupUseCase,
      Container.sendotpUsecase,
      Container.VerifyOtpUsecase,
      Container.forgotPassword,
      Container.resetPasswordUseCase,
      Container.loginUseCase,
      Container.logoutUsecase
  );
  

  public static saveAvailbleTimeSlot = new SaveAvailability(Container.neighborRepository)
  public static skillsUsecase = new SkillsUsecase(Container.neighborRepository)
  public static timeslotUsecase = new TimeslotUsecase(Container.neighborRepository)
  public static locationUsecase = new LocationUsecase(Container.neighborRepository)
  public static neighborListUsecae = new NeighborsListUsecase(Container.neighborRepository)
  public static neighborController = new NeighborController(
    Container.saveAvailbleTimeSlot,
    Container.skillsUsecase,
    Container.locationUsecase,
    Container.timeslotUsecase,
    this.neighborListUsecae
  )



  public static taskRepository = new taskRepository()
  public static taskUsecase = new TaskUsecase(Container.taskRepository)
  public static taskController = new TaskController(Container.taskUsecase)

  }