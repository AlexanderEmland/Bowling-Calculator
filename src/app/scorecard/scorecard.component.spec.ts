import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardComponent } from './scorecard.component';
import { MessageBundle } from '@angular/compiler';
import { MessageService } from '../services/message.service';
import { BallState } from '../models';

describe('ScoreCardComponent', () => {
  let component: ScorecardComponent;
  let fixture: ComponentFixture<ScorecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScorecardComponent],
      providers: [MessageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardComponent);
    component = fixture.componentInstance;
    const tempBall = {
      pins: 1,
      frame: undefined,
      state: BallState.normal
    };
    component.frame = {
      number: 1,
      isLast: false,
      firstBall: tempBall,
      secondBall: tempBall,
      thirdBall: tempBall, // Only for the last score
      score: 20,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
