import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { from, map } from 'rxjs';
import { UserModel, colUsers } from '../entities/user.entity';
import { ICreateUser } from '../interfaces/ICreateUser';

@Injectable()
export class UsersService {
  constructor(@InjectModel(colUsers.name) private model: UserModel) {}

  createUser(user: ICreateUser) {
    const doc = new this.model({
      username: user.username,
      phoneNumber: user.phoneNumber,
    });
    return from(doc.save()).pipe(
      map((item) => ({
        _id: item._id.toString(),
      })),
    );
  }
}
