interface IAppError {
  message: string;
  statusCode: number;
}

class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor({ statusCode, message }: IAppError) {
    this.message = message;
    this.statusCode = 400 || statusCode;
  }
}

export default AppError;
