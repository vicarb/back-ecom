import { Test, TestingModule } from '@nestjs/testing';
import { CoberturasController } from './coberturas.controller';

describe('CoberturasController', () => {
  let controller: CoberturasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoberturasController],
    }).compile();

    controller = module.get<CoberturasController>(CoberturasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
