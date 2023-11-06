import * as dotenv from 'dotenv';
dotenv.config();

export interface IEnvironment {
  APP: {
    NAME: string;
    PORT: number | string;
    ENV: string;
  };
  DB: {
    URL: string;
  };
  JWT: {
    SECRET: string;
  };
}

export const ENVIRONMENT: IEnvironment = {
  APP: {
    NAME: process.env.APP_NAME,
    PORT: process.env.APP_PORT,
    ENV: process.env.APP_ENV,
  },
  DB: {
    URL: process.env.DATABASE_URL,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
  },
};
