import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { join } from 'path';

export async function usersBootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'aka_users',
        protoPath: join(__dirname, '../../proto/users.proto'),
        url: 'localhost:3002',
      },
    },
  );

  app.listen();
}
