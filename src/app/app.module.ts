import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { PinsComponent } from './pins/pins.component';
import { MessageService } from './services/message.service';

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
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
