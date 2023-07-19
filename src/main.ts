import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { usersBootstrap } from './users/microservice/users.main';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ServerCredentials } from '@grpc/grpc-js';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['aka_app', 'aka_users'],
        protoPath: [
          join(__dirname, 'core/proto/app.proto'),
          join(__dirname, 'core/proto/users.proto'),
        ],
        credentials: ServerCredentials.createInsecure(),
        url: 'localhost:3100',
      },
    },
  );
  await usersBootstrap();
  await app.listen();
}

bootstrap();
