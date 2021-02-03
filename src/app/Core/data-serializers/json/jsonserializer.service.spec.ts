import { TestBed } from '@angular/core/testing';

import { JsonserializerService } from './jsonserializer.service';

describe('JsonserializerService', () => {
  let service: JsonserializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonserializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
