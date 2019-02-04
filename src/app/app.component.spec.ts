import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { PinsComponent } from './pins/pins.component';
import { MessageService } from './services/message.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ScorecardComponent,
        ScoreboardComponent,
        PinsComponent,
      ],
      providers: [
        MessageService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
