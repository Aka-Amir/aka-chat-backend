import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages.module';
import { join } from 'path';

export async function messagesBootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MessagesModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'aka_messages',
        protoPath: join(__dirname, '../../core/proto/messages.proto'),
        url: 'localhost:3003',
      },
    },
  );

  app.listen();
}

messagesBootstrap().then(() => {
  process.send('messages=1');
});
