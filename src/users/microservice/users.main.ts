import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { join } from 'path';
import { Logger } from '@nestjs/common';

export async function usersBootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'aka_users',
        protoPath: join(__dirname, '../../core/proto/users.proto'),
        url: 'localhost:3002',
      },
    },
  );
  app.listen();
  Logger.debug(process.pid, 'UsersMicroservice');
}

usersBootstrap().then(() => {
  process.send(`users=1`);
});
