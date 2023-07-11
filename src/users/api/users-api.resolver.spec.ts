import { Test, TestingModule } from '@nestjs/testing';
import { UsersApiResolver } from './users-api.resolver';
import { UsersApiService } from './users-api.service';

describe('UsersApiResolver', () => {
  let resolver: UsersApiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersApiResolver, UsersApiService],
    }).compile();

    resolver = module.get<UsersApiResolver>(UsersApiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
