import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/v1/user/user.module';
import { DatabaseModule } from './module/v1/database/database.module';
import { ProductModule } from './module/v1/product/product.module';

@Module({
  imports: [DatabaseModule, UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
