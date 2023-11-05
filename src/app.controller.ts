import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

<<<<<<<<<<<<<<  ✨ Codeium Command ⭐ >>>>>>>>>>>>>>>>
  @Get('/health')
  getHealth(): string {
    const currentTime = new Date().toISOString();
    return `Server is healthy. Current time: ${currentTime}`;
  }
<<<<<<<  5e0d9b7b-8da9-4699-8d72-87d472a64961  >>>>>>>
}
