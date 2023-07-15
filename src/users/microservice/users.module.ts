import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { colUsers } from '../entities/user.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/chat-app'),
    MongooseModule.forFeature([colUsers]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
