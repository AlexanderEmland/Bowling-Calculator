import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { PinsComponent } from './pins/pins.component';

@NgModule({
  declarations: [
    AppComponent,
    ScorecardComponent,
    ScoreboardComponent,
    PinsComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
