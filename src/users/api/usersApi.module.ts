import { Module } from '@nestjs/common';
import { UsersApiController } from './usersApi.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'UsersService',
        transport: Transport.GRPC,
        options: {
          package: 'aka_users',
          protoPath: join(__dirname, '../../proto/users.proto'),
          url: 'localhost:3002',
        },
      },
    ]),
  ],
  controllers: [UsersApiController],
})
export class UsersApi {}
