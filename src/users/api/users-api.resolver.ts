import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersApiService } from './users-api.service';
import { UsersApi } from './entities/users-api.entity';
import { CreateUsersApiInput } from './dto/create-users-api.input';
import { UpdateUsersApiInput } from './dto/update-users-api.input';

@Resolver(() => UsersApi)
export class UsersApiResolver {
  constructor(private readonly usersApiService: UsersApiService) {}

  @Mutation(() => UsersApi)
  createUsersApi(
    @Args('createUsersApiInput') createUsersApiInput: CreateUsersApiInput,
  ) {
    return this.usersApiService.create(createUsersApiInput);
  }

  @Query(() => [UsersApi], { name: 'usersApi' })
  findAll() {
    return this.usersApiService.findAll();
  }

  @Query(() => UsersApi, { name: 'usersApi' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersApiService.findOne(id);
  }

  @Mutation(() => UsersApi)
  updateUsersApi(
    @Args('updateUsersApiInput') updateUsersApiInput: UpdateUsersApiInput,
  ) {
    return this.usersApiService.update(
      updateUsersApiInput.id,
      updateUsersApiInput,
    );
  }

  @Mutation(() => UsersApi)
  removeUsersApi(@Args('id', { type: () => Int }) id: number) {
    return this.usersApiService.remove(id);
  }
}
