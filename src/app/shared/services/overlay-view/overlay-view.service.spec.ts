import { TestBed } from '@angular/core/testing';

import { OverlayViewService } from './overlay-view.service';

describe('OverlayViewService', () => {
  let service: OverlayViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
