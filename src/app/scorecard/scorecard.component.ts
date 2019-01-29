import { Component, OnInit, Input } from '@angular/core';
import { IScore } from '../models';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-score-card',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit {
  @Input() number: number;
  @Input() firstScore: number;
  @Input() secondScore: number;
  @Input() we: number;

  score: IScore = {
    number: 7,
    firstBall: 2,
    secondBall: 2,
    isLast: false
  };

  constructor() { }

  ngOnInit() {
  }

}
