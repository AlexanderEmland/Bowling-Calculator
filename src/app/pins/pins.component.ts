import { Component, OnInit } from '@angular/core';
import { BowlingService } from '../services/bowling.service';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss']
})
export class PinsComponent implements OnInit {

  constructor(private bowling: BowlingService) {
  }

  ngOnInit() {
  }

}
