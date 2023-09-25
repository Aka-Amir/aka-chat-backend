import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { colChats } from '../entities/chats.entity';
import { colMessage } from '../entities/messages.entity';
import { CommonModule } from 'src/core/common/common.module';

@Module({
  imports: [CommonModule.registerForMicroservice([colChats, colMessage])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
