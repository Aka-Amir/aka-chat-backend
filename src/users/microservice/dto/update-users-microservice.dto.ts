import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersMicroserviceDto } from './create-users-microservice.dto';

export class UpdateUsersMicroserviceDto extends PartialType(
  CreateUsersMicroserviceDto,
) {
  id: number;
}
