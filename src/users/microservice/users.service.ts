import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { from, map } from 'rxjs';
import { UserDocument, UserModel, colUsers } from '../entities/user.entity';
import { ICreateUser } from '../interfaces/ICreateUser';
import { IUpdateUser } from '../interfaces/IUpdateUser';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(colUsers.name) private model: UserModel,
    private readonly jwt: JwtService,
  ) {}

  signUser(user: UserDocument) {
    const authToken = this.jwt.sign({
      username: user.username,
      userId: user.userId,
      profileImage: user.profileImage,
    });
    const refreshToken = this.jwt.sign({
      userId: user.userId,
      privateId: user._id.toString(),
    });

    return {
      authToken,
      refreshToken,
    };
  }

  createUser(user: ICreateUser) {
    const doc = new this.model({
      username: user.username,
      userId: user.userId,
      password: user.password,
    });
    return from(doc.save()).pipe(
      map((item) => ({
        ...item,
        _id: item._id.toString(),
      })),
    );
  }

  findUserByUserID(userId: string) {
    return from(
      this.model
        .findOne({
          userId,
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
    delete data._id;
    return from(
      this.model
        .updateOne(
          {
            _id: updateData._id,
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
