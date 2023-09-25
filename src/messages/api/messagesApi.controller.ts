import { Controller } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('messages')
export class MessagesApiController {
  constructor(private readonly roomService: RoomsService<string>) {}
}
