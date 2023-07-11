import { Test, TestingModule } from '@nestjs/testing';
import { UsersMicroserviceController } from './users-microservice.controller';
import { UsersMicroserviceService } from './users-microservice.service';

describe('UsersMicroserviceController', () => {
  let controller: UsersMicroserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersMicroserviceController],
      providers: [UsersMicroserviceService],
    }).compile();

    controller = module.get<UsersMicroserviceController>(
      UsersMicroserviceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
