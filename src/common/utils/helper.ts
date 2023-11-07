import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

export function generateRandomString(length: number): string {
  return randomBytes(length).toString('hex');
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
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
