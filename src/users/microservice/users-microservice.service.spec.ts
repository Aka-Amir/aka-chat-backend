import { Test, TestingModule } from '@nestjs/testing';
import { UsersMicroserviceService } from './users-microservice.service';

describe('UsersMicroserviceService', () => {
  let service: UsersMicroserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersMicroserviceService],
    }).compile();

    service = module.get<UsersMicroserviceService>(UsersMicroserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
