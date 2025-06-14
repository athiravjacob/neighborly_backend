import { forgotPasswordUsecase } from "../application/usecases/auth/ForgotPassword";
import { SendOtpUsecase } from "../application/usecases/auth/SendOTP-email";
import { SignupUseCase } from "../application/usecases/auth/signUp";
import { verifyOtpUseCase } from "../application/usecases/auth/VerifyOTP";
import { AuthService } from "../infrastructure/services/authService-impl";
import { EmailServiceImpl } from "../infrastructure/services/emailService-impl";
import { AuthController } from "../presentation/controllers/authController";
import { ResetPasswordUseCase } from "../application/usecases/auth/ResetPassword";
import {OtpRepository} from "../infrastructure/repositories/otpRepository";
import { LoginUsecase } from "../application/usecases/auth/Login";
import { LogoutUsecase } from "../application/usecases/auth/Logout";
import { tokenRepository } from "../infrastructure/repositories/tokenRepository";
import { neighborRepository } from "../infrastructure/repositories/neighborRepository";
import { WeeklySchedule } from "../application/usecases/neighbor/WeeklySchedule";
import { NeighborController } from "../presentation/controllers/neighborController";
import { SkillsUsecase } from "../application/usecases/neighbor/SkillsUsecase";
import { LocationUsecase } from "../application/usecases/neighbor/LocationUsecase";
import { TimeslotUsecase } from "../application/usecases/neighbor/TimeslotUsecase";
import { NeighborsListUsecase } from "../application/usecases/neighbor/NeighborsListUsecase";
import { taskRepository } from "../infrastructure/repositories/taskRepository";
import { TaskUsecase } from "../application/usecases/task/TaskUsecase";
import { TaskController } from "../presentation/controllers/taskController";
import { userController } from "../presentation/controllers/userController";
import { refreshTokenUsecase } from "../application/usecases/auth/RefreshToken";
import { ProfileUsecase } from "../application/usecases/user/ProfileUsecase";
import { AdminController } from "../presentation/controllers/adminController";
import { AdminFetchUsecase } from "../application/usecases/admin/adminFetchUsecase";
import { NeighborProfileUsecase } from "../application/usecases/neighbor/NeighborProfileUsecase";
import { MessageRepository } from "../infrastructure/repositories/messageRepository";
import { SendMessageUseCase } from "../application/usecases/message/sendMessageUsecase";
import { GetMessagesUseCase } from "../application/usecases/message/getMessageUsecase";
import { MessageController } from "../presentation/controllers/messageController";
import { UserRepository } from "../infrastructure/repositories/userRepository";
import { TransactionRepository } from "../infrastructure/repositories/transactionRepository";
import { saveTransaction } from "../application/usecases/payment/saveTransactionUsecase";
import { PaymentController } from "../presentation/controllers/paymentController";
import { WalletRepository } from "../infrastructure/repositories/walletRepository";
import { EscrowRepository } from "../infrastructure/repositories/escrowRepository";
import { VerificationUsecase } from "../application/usecases/admin/verificationUsecase";
import { WalletUsecase } from "../application/usecases/payment/walletUsecase";
import { BanUsecase } from "../application/usecases/admin/banUsecase";
import { AdminRepository } from "../infrastructure/repositories/adminRepository";
import { scheduleRepository } from "../infrastructure/repositories/scheduleRepository";
import { CheckUserBanStatusUsecase } from "../application/usecases/user/checkUserBanStatus";
import { bookingRepository } from "../infrastructure/repositories/bookingRepository";
import { AvailableDaysUsecase } from "../application/usecases/neighbor/AvailableDaysUsecase";

export class Container {
  
    public static userRepository = new UserRepository();
    public static authService = new AuthService();
    public static emailService = new EmailServiceImpl()
    public static OTPRepository = new OtpRepository()
    public static tokenRepository = new tokenRepository()
    public static neighborRepository = new neighborRepository()
    public static adminRepository = new AdminRepository()
    public static signupUseCase = new SignupUseCase(Container.userRepository,Container.neighborRepository, Container.authService);
    public static loginUseCase = new LoginUsecase(Container.userRepository,Container.neighborRepository,Container.adminRepository,Container.tokenRepository,Container.authService)
    public static logoutUsecase = new LogoutUsecase(Container.tokenRepository)
    public static VerifyOtpUsecase = new verifyOtpUseCase(Container.OTPRepository)
    public static resetPasswordUseCase = new ResetPasswordUseCase(Container.userRepository,Container.authService,Container.neighborRepository)
    public static forgotPassword = new forgotPasswordUsecase(Container.userRepository,Container.emailService)
    public static sendotpUsecase = new SendOtpUsecase(Container.OTPRepository,Container.emailService)
    public static refreshTokenUsecase  = new refreshTokenUsecase(Container.tokenRepository,Container.authService)
    public static authController = new AuthController(
      Container.signupUseCase,
      Container.sendotpUsecase,
      Container.VerifyOtpUsecase,
      Container.forgotPassword,
      Container.resetPasswordUseCase,
      Container.loginUseCase,
      Container.logoutUsecase,
      Container.refreshTokenUsecase
  );
  public static walletRepository = new WalletRepository()
  public static taskRepository = new taskRepository()
  public static taskUsecase = new TaskUsecase(Container.taskRepository,Container.neighborRepository)
  public static taskController = new TaskController(Container.taskUsecase)
  public static scheduleRepository = new scheduleRepository()
  public static bookingRepository = new bookingRepository()

  public static saveAvailbleTimeSlot = new WeeklySchedule(Container.scheduleRepository)
  public static availableDaysUsecase = new AvailableDaysUsecase(Container.scheduleRepository,Container.bookingRepository)
  public static skillsUsecase = new SkillsUsecase(Container.neighborRepository)
  public static timeslotUsecase = new TimeslotUsecase(Container.neighborRepository)
  public static locationUsecase = new LocationUsecase(Container.neighborRepository)
  public static neighborListUsecae = new NeighborsListUsecase(Container.neighborRepository)
  public static neighborProfileUsecase = new NeighborProfileUsecase(Container.neighborRepository)
  public static walletUsecase = new WalletUsecase(Container.walletRepository)
  public static escrowRepository = new EscrowRepository()
  
  public static checkUserBanStatusUsecase = new CheckUserBanStatusUsecase(
    Container.userRepository,
    Container.neighborRepository
  );
  public static transactionRepository = new TransactionRepository()
  public static saveTransactionUsecase = new saveTransaction(Container.transactionRepository,
    Container.escrowRepository,
    Container.walletRepository,
  Container.taskRepository)
  public static neighborController = new NeighborController(
    Container.saveAvailbleTimeSlot,
    Container.skillsUsecase,
    Container.locationUsecase,
    Container.availableDaysUsecase,
    Container.neighborListUsecae,
    Container.neighborProfileUsecase,
    Container.walletUsecase,
    Container.taskUsecase,
    Container.saveTransactionUsecase

  )



  


  public static userProfileusecase = new ProfileUsecase(Container.userRepository)
  public static userController = new userController(Container.userProfileusecase,Container.taskUsecase)
  public static banUsecase = new BanUsecase(Container.neighborRepository,Container.userRepository)

  public static verificationUsecase = new VerificationUsecase(Container.neighborRepository)
  public static adminFetchusecase = new AdminFetchUsecase(Container.userRepository,Container.neighborRepository,Container.taskRepository)
  public static adminController = new AdminController(Container.adminFetchusecase,Container.verificationUsecase,Container.banUsecase)

  public static messageRepo = new MessageRepository();

  public static sendMessageUseCase = new SendMessageUseCase(Container.messageRepo);
  public static getMessagesUseCase = new GetMessagesUseCase(Container.messageRepo);

  public static  messageController = new MessageController(Container.sendMessageUseCase, Container.getMessagesUseCase);


  
  public static paymentController = new PaymentController(Container.saveTransactionUsecase,Container.taskUsecase)

  }