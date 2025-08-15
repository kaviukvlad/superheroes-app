import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    let status = HttpStatus.BAD_REQUEST;
    if (exception.code === 'P2025') status = HttpStatus.NOT_FOUND;

    res
      .status(status)
      .json({ message: exception.message, code: exception.code });
  }
}
