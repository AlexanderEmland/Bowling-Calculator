import { Component, OnInit } from '@angular/core';
import { IScore } from '../models';
import { BowlingService } from '../services/bowling.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  scores: IScore[];

  constructor(bowlingService: BowlingService) {
    this.scores = bowlingService.getScores();
    console.log(this.scores);
   }

  ngOnInit() {
    console.log('jew');
  }

}
