import { Test, TestingModule } from '@nestjs/testing';
import { CotizadorController } from './cotizador.controller';

describe('CotizadorController', () => {
  let controller: CotizadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CotizadorController],
    }).compile();

    controller = module.get<CotizadorController>(CotizadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
