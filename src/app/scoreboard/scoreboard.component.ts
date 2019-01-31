import { Component, OnInit } from '@angular/core';
import { IFrame } from '../models';
import { BowlingService } from '../services/bowling.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  frames: IFrame[] = this.bowling.getFrames();

  constructor(private bowling: BowlingService) {
    console.log('Board: ' + JSON.stringify(this.frames));
   }

  ngOnInit() {
  }

}
