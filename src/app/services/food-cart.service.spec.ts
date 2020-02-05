import { TestBed } from '@angular/core/testing';

import { FoodCartService } from './food-cart.service';

describe('FoodCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodCartService = TestBed.get(FoodCartService);
    expect(service).toBeTruthy();
  });
});
