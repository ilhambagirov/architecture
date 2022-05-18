import { HttpException } from '@nestjs/common';

export class ErrorResponse extends HttpException {
  constructor(statusCode: number, message: string) {
    super(message, statusCode);
  }
}
