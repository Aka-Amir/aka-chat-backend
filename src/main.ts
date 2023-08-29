import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { fork } from 'child_process';
import { Observable, concat } from 'rxjs';
import { AppModule } from './app.module';

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
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    //   AppModule,
    //   {
    //     transport: Transport.GRPC,
    //     options: {
    //       package: ['aka_app', 'aka_users', 'aka_messages'],
    //       protoPath: [
    //         join(__dirname, 'core/proto/app.proto'),
    //         join(__dirname, 'core/proto/users.proto'),
    //         join(__dirname, 'core/proto/messages.proto'),
    //       ],
    //       credentials: ServerCredentials.createInsecure(),
    //       url: '0.0.0.0:3100',
    //     },
    //   },
    // );

    if (process.argv[process.argv.length - 1] === 'DEV') {
      concat(runMicroservice('users'), runMicroservice('messages')).subscribe({
        complete: async () => {
          await app.listen(process.env.PORT || 3000);
          resolve(process.pid);
        },
      });
    }
  });
}

bootstrap().then((pid) => {
  Logger.log('App Started', `Main App ${pid}`);
});
