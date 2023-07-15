import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersApi } from './users/api/usersApi.module';
// import {} from './';

@Module({
  imports: [UsersApi],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
