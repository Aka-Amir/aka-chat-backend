import { ServerCredentials } from '@grpc/grpc-js';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { fork } from 'child_process';
import { join } from 'path';
import { Observable, concat } from 'rxjs';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

function runMicroservice(serviceName: string) {
  return new Observable((sub) => {
    const cp = fork(
      __dirname + `/${serviceName}/microservice/${serviceName}.main.js`,
    );
    cp.on('message', async (message) => {
      if (message === `${serviceName}=1`) {
        sub.complete();
      }
    });
  });
}

function bootstrap() {
  return new Promise(async (resolve) => {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.GRPC,
        options: {
          package: ['aka_app', 'aka_users', 'aka_messages'],
          protoPath: [
            join(__dirname, 'core/proto/app.proto'),
            join(__dirname, 'core/proto/users.proto'),
            join(__dirname, 'core/proto/messages.proto'),
          ],
          credentials: ServerCredentials.createInsecure(),
          url: 'localhost:3100',
        },
      },
    );

    if (process.argv[process.argv.length - 1] === 'DEV') {
      concat(runMicroservice('users'), runMicroservice('messages')).subscribe({
        complete: async () => {
          await app.listen();
          resolve(process.pid);
        },
      });
    }
  });
}

bootstrap().then((pid) => {
  Logger.log('App Started', `Main App ${pid}`);
});
