import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUsersApiInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
