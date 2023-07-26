import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersApi } from './users/api/usersApi.module';
import { MessagesApi } from './messages/api/messagesApi.module';

@Module({
  imports: [UsersApi, MessagesApi],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
