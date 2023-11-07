import { Module } from '@nestjs/common';
import { UserModule } from './module/v1/user/user.module';
import { DatabaseModule } from './module/v1/database/database.module';
import { ProductModule } from './module/v1/product/product.module';
import { AuthModule } from './module/v1/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
