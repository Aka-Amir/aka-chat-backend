import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { from, map } from 'rxjs';
import { UserModel, colUsers } from '../entities/user.entity';
import { ICreateUser } from '../interfaces/ICreateUser';
import { IUpdateUser } from '../interfaces/IUpdateUser';

@Injectable()
export class UsersService {
  constructor(@InjectModel(colUsers.name) private model: UserModel) {}

  createUser(user: ICreateUser) {
    const doc = new this.model({
      username: user.username,
      userId: user.userId,
      password: user.password,
    });
    return from(doc.save()).pipe(
      map((item) => ({
        _id: item._id.toString(),
      })),
    );
  }

  findUserByPhoneNumber(phoneNumber: string) {
    return from(
      this.model
        .findOne({
          phoneNumber: phoneNumber,
        })
        .exec(),
    ).pipe(
      map((user) => {
        if (!user) {
          throw new Error('404');
        }
        return user;
      }),
    );
  }

  updateUser(updateData: IUpdateUser) {
    const data = { ...updateData };
    delete data.userID;
    return from(
      this.model
        .updateOne(
          {
            _id: updateData.userID,
          },
          {
            $set: {
              ...data,
            },
          },
        )
        .exec(),
    );
  }
}
