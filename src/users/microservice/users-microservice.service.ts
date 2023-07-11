import { Injectable } from '@nestjs/common';
import { CreateUsersMicroserviceDto } from './dto/create-users-microservice.dto';
import { UpdateUsersMicroserviceDto } from './dto/update-users-microservice.dto';

@Injectable()
export class UsersMicroserviceService {
  create(createUsersMicroserviceDto: CreateUsersMicroserviceDto) {
    return 'This action adds a new usersMicroservice';
  }

  findAll() {
    return `This action returns all usersMicroservice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersMicroservice`;
  }

  update(id: number, updateUsersMicroserviceDto: UpdateUsersMicroserviceDto) {
    return `This action updates a #${id} usersMicroservice`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersMicroservice`;
  }
}
