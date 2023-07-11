import { Injectable } from '@nestjs/common';
import { CreateUsersApiInput } from './dto/create-users-api.input';
import { UpdateUsersApiInput } from './dto/update-users-api.input';

@Injectable()
export class UsersApiService {
  create(createUsersApiInput: CreateUsersApiInput) {
    return 'This action adds a new usersApi';
  }

  findAll() {
    return `This action returns all usersApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersApi`;
  }

  update(id: number, updateUsersApiInput: UpdateUsersApiInput) {
    return `This action updates a #${id} usersApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersApi`;
  }
}
