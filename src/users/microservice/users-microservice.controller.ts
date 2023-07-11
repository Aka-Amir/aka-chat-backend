import { Controller } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { CreateUsersMicroserviceDto } from './dto/create-users-microservice.dto';
import { UpdateUsersMicroserviceDto } from './dto/update-users-microservice.dto';
import { UsersMicroserviceService } from './users-microservice.service';

@Controller()
export class UsersMicroserviceController {
  constructor(
    private readonly usersMicroserviceService: UsersMicroserviceService,
  ) {}

  @GrpcMethod('UsersService', 'Create')
  create(@Payload() createUsersMicroserviceDto: CreateUsersMicroserviceDto) {
    return this.usersMicroserviceService.create(createUsersMicroserviceDto);
  }

  findAll() {
    return this.usersMicroserviceService.findAll();
  }

  findOne(@Payload() id: number) {
    return this.usersMicroserviceService.findOne(id);
  }

  update(@Payload() updateUsersMicroserviceDto: UpdateUsersMicroserviceDto) {
    return this.usersMicroserviceService.update(
      updateUsersMicroserviceDto.id,
      updateUsersMicroserviceDto,
    );
  }

  remove(@Payload() id: number) {
    return this.usersMicroserviceService.remove(id);
  }
}
