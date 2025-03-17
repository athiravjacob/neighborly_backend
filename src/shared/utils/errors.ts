export class AppError extends Error {
    public statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
    //   this.name = "AppError"; 
      Object.setPrototypeOf(this, AppError.prototype);
    }
  }