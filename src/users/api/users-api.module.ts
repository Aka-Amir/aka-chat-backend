import { Module } from '@nestjs/common';
import { UsersApiService } from './users-api.service';
import { UsersApiResolver } from './users-api.resolver';
import { ClientsModule } from '@nestjs/microservices';
import { getMicroserviceConfig } from 'src/core/utils/getMicroserviceConfig';

@Module({
  imports: [ClientsModule.register(getMicroserviceConfig())],
  providers: [UsersApiResolver, UsersApiService],
})
export class UsersApiModule {}
