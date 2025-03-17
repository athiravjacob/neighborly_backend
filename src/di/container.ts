import { SignupUseCase } from "../application/usecases/auth/Signup";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { AuthService } from "../infrastructure/services/authService-impl";
import { AuthController } from "../presentation/controllers/authController";

export class Container {
    public static userRepository = new UserRepository();
    public static authService = new AuthService();
    public static signupUseCase = new SignupUseCase(Container.userRepository, Container.authService);
    public static authController = new AuthController(Container.signupUseCase);
  }