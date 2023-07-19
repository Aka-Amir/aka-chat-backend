import { Module } from '@nestjs/common';
import { CommonModule } from '../../core/common/common.module';
import { colUsers } from '../entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [CommonModule.registerForMicroservice([colUsers])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
