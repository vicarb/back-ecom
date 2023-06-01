import { Test, TestingModule } from '@nestjs/testing';
import { CotizadorService } from './cotizador.service';

describe('CotizadorService', () => {
  let service: CotizadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CotizadorService],
    }).compile();

    service = module.get<CotizadorService>(CotizadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
