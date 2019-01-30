import { Injectable } from '@angular/core';
import { IScore, ScoreState } from '../models';
import { ifError } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class BowlingService {

  scores: IScore[] = [];
  scoreIndex: number;
  private possiblePins: Array<true> = [true, true, true, true, true, true, true, true, true, true, true];

  constructor() {
    this.init();
  }

  private init(): void {
    this.scoreIndex = 0;
    for (let i = 0; i < 10; i++) {
      this.scores.push({
        number: i + 1,
        isLast: i === 9,
        firstBall: null,
        secondBall: undefined,
        thirdBall: undefined, // Only for the last score
        localValue: 0,
        score: 0,
        state: ScoreState.normal,
      } as IScore);
    }
    console.log(this.scoreIndex);
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
    // console.log(currentScore, this.scoreIndex);

    /*
    If the previous score resulted in a spare, add the first roll to that one's current score
    If the two previous scores were strikes, and the current score is a strike, add 10 two the first score
    */

    currentScore.localValue += pins;
    if (!currentScore.firstBall && currentScore.firstBall !== 0) { // Handle first ball
      console.log(true);
      currentScore.firstBall = pins;


      if (pins === 10) { // Handle strike
        this.nextScore();
        currentScore.state = ScoreState.strike;
        return;
      }
    } else if (!currentScore.secondBall) { // Handle second ball
      currentScore.secondBall = pins;
      if (currentScore.firstBall + pins === 10) { // Handle spare
        currentScore.state = ScoreState.spare;
        this.nextScore();
        return;
      }
      this.nextScore();
    }
    // console.log(currentScore);
  }

  private nextScore(): void {
    this.scoreIndex++;
    this.resetPins();
  }

  private resetPins(): void {
    this.possiblePins = [true, true, true, true, true, true, true, true, true, true, true];
  }

  getPossiblePins(): Array<true> {
    return [...this.possiblePins];
  }

  getScores(): IScore[] {
    return this.scores;
  }
}
