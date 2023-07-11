import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
// import { UsersResolver } from './users/users.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersApiModule } from './users/api/users-api.module';
import { UsersMicroserviceModule } from './users/microservice/users-microservice.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gpl'),
      path: '/app',
    }),
    UsersApiModule,
    UsersMicroserviceModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
