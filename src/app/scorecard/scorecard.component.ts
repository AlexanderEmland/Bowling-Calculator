import { Component, OnInit, Input } from '@angular/core';
import { IFrame, BallState } from '../models';
import { TestBed } from '@angular/core/testing';


@Component({
  selector: 'app-score-card',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit {
  @Input() frame: IFrame;
  ballState = BallState;

  constructor() {
  }

  ngOnInit() {

  }

}
