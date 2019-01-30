import { Injectable } from '@angular/core';
import { IScore, ScoreState } from '../models';
import { ifError } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class BowlingService {

  scores: IScore[];
  scoreIndex: number;
  private possiblePins: Array<true> = [true, true, true, true, true, true, true, true, true, true, true];

  constructor() { }

  private init(): void {
    for (let i = 0; i < 10; i++) {
      this.scores.push({
        number: i + 1,
        isLast: i === 9
      });
    }
  }

  private updateScores(): void {

  }

  roll(pins: number): void {
    if (pins > this.possiblePins.length) {
      console.log('You can\'t hit that many pins this time');
      return;
    }
    this.possiblePins.splice(0, pins);
    const currentScore: IScore = this.scores[this.scoreIndex];

    /*
    If the previous score resulted in a spare, add the first roll to that one's current score
    If the two previous scores were strikes, and the current score is a strike, add 10 two the first score
    */

    if (!currentScore.firstBall) { // Handle first normal score
      currentScore.firstBall = pins;
      currentScore.localValue += pins;


      if (pins === 10) { // Handle strike
        this.scoreIndex++;
        currentScore.state = ScoreState.strike;
        return;
      }
    } else {
      if (pins === 10) { // Handle spare
        this.scoreIndex++;
        currentScore.state = ScoreState.spare;
        return;
      }
    }
  }

  getPossiblePins(): Array<true> {
    return [...this.possiblePins];
  }
  getScores(): IScore[] {
    return this.scores;
  }
}
