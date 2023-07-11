import { CreateUsersApiInput } from './create-users-api.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUsersApiInput extends PartialType(CreateUsersApiInput) {
  @Field(() => Int)
  id: number;
}
