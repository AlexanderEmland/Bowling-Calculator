import { Component, OnInit } from '@angular/core';
import { BowlingService } from '../services/bowling.service';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss']
})
export class PinsComponent implements OnInit {

  possiblePins: Array<true>;

  constructor(private bowling: BowlingService) {
    this.possiblePins = bowling.getPossiblePins();
  }

  ngOnInit() {
  }

}
