import { Module } from '@nestjs/common';
import { UsersMicroserviceService } from './users-microservice.service';
import { UsersMicroserviceController } from './users-microservice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { colUsers } from './entities/users-microservice.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/chat-app'),
    MongooseModule.forFeature([colUsers]),
  ],
  controllers: [UsersMicroserviceController],
  providers: [UsersMicroserviceService],
})
export class UsersMicroserviceModule {}
