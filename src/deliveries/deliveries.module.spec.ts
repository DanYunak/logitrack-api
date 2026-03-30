import { Test, TestingModule } from '@nestjs/testing';
import { DeliveriesModule } from './deliveries.module';

describe('DeliveriesModule', () => {
  it('should compile the module successfully', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DeliveriesModule],
    }).compile();

    expect(module).toBeDefined();
  });
});