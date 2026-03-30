import { Test, TestingModule } from '@nestjs/testing';
import { DeliveriesService } from './deliveries.service';
import { BadRequestException } from '@nestjs/common';

describe('DeliveriesService', () => {
  let service: DeliveriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveriesService],
    }).compile();

    service = module.get<DeliveriesService>(DeliveriesService);
  });

  describe('calculateDeliveryCost', () => {
    
    it('should calculate correct cost for distance without extra weight', () => {
      const result = service.calculateDeliveryCost(2, 3);
      expect(result).toBe(70);
    });

    it('should add extra cost if weight is strictly greater than 5kg', () => {
      const result = service.calculateDeliveryCost(2, 6);
      expect(result).toBe(75);
    });

    it('should not add extra weight cost if weight is exactly 5kg', () => {
      const result = service.calculateDeliveryCost(2, 5);
      expect(result).toBe(70);
    });

    it('should return only base cost and weight surcharge if distance is 0', () => {
      const result = service.calculateDeliveryCost(0, 7);
      expect(result).toBe(60);
    });

    it('should calculate correct cost for long distance and heavy weight', () => {
      const result = service.calculateDeliveryCost(10, 15);
      expect(result).toBe(200);
    });

    it('should throw BadRequestException if distance is negative', () => {
      expect(() => service.calculateDeliveryCost(-1, 5)).toThrow(BadRequestException);
    });

    it('should throw BadRequestException if weight is negative', () => {
      expect(() => service.calculateDeliveryCost(5, -2)).toThrow(BadRequestException);
    });

  });
});