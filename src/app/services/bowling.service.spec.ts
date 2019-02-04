import { TestBed, inject } from '@angular/core/testing';

import { BowlingService } from './bowling.service';
import { MessageService } from './message.service';
import { BallState } from '../models';

describe('BowlingService', () => {
  let service: BowlingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
    service = TestBed.get(BowlingService);

  }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should roll strike', () => {
    service.roll(10);
    expect(service.balls[0].state).toBe(BallState.strike);
  });

  it('should be 38', () => {
    const rolls = [10, 5, 5, 4, 0];
    for (let i = 0; i < rolls.length; i++) {
      service.roll(rolls[i]);
    }
    expect(service.getCurrentScore()).toBe(38);
  });
});
