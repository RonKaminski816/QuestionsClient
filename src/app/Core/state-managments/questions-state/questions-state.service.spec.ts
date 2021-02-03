import { TestBed } from '@angular/core/testing';

import { QuestionsStateService } from './questions-state.service';

describe('QuestionsStateService', () => {
  let service: QuestionsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
