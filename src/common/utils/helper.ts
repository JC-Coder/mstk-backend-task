import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';
import { Response } from 'express';

export function generateRandomString(length: number): string {
  return randomBytes(length).toString('hex');
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function sendAppResponse(
  res: Response,
  statusCode: number,
  data?: Record<string, number> | unknown,
  message?: string | string[],
) {
  return res.status(statusCode).json({
    statusCode,
    data: data ?? null,
    message: message ?? null,
  });
}
