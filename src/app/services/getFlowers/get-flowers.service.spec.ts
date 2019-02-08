import { TestBed, inject } from '@angular/core/testing';

import { GetFlowersService } from './get-flowers.service';

describe('GetFlowersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetFlowersService]
    });
  });

  it('should be created', inject([GetFlowersService], (service: GetFlowersService) => {
    expect(service).toBeTruthy();
  }));
});
