import { Component, OnInit } from '@angular/core';
import { IFrame } from '../models';
import { BowlingService } from '../services/bowling.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})

export class ScoreboardComponent implements OnInit {

  constructor(private bowling: BowlingService) {
    
   }

  ngOnInit() {
    
  }

}
