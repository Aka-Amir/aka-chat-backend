import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersMicroserviceModule } from './users-microservice.module';
import { join } from 'path';

export async function usersBootstrap() {
  const users = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersMicroserviceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'aka_users',
        protoPath: join(__dirname, '../proto/users.proto'),
      },
    },
  );
  users.listen();
}
