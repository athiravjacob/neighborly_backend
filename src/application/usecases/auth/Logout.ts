import { ITokenRepository } from "../../../domain/interface/repositories/ITokenRepository";

export class LogoutUsecase{
    constructor(
        private tokenRepository: ITokenRepository,
    ) { }
    

    async execute(token:string): Promise<void> {

      await this.tokenRepository.deleteRefreshToken(token)
  }
}