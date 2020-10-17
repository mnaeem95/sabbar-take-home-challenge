export class ApiError extends Error {
  status: number;
  errorCode: string;

  constructor(code: number, message: string, errorCode: string = '') {
    super(message);
    this.status = code;
    this.errorCode = errorCode;
  }
}
