import { Injectable } from '@angular/core';
import { IFrame, BallState, IBall } from '../models';
import { ifError } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class BowlingService {

  frames: IFrame[] = [];
  balls: IBall[] = [];
  frameIndex: number;
  private possiblePins: Array<true> = [true, true, true, true, true, true, true, true, true, true, true];

  constructor() {
    this.init();
  }

  private init(): void {
    this.frameIndex = 0;
    const tempBall = {
      pins: undefined,
      frame: undefined,
      state: BallState.normal
    };
    for (let i = 0; i < 10; i++) {
      this.frames.push({
        number: i + 1,
        isLast: i === 9,
        firstBall: tempBall,
        secondBall: tempBall,
        thirdBall: tempBall, // Only for the last score
        score: undefined,
      });
    }
  }

  private updateScores(): void {
    for (let i = 0; i < this.balls.length; i++) {
      const ball = this.balls[i];

    }
  }

  roll(pins: number): void {
    if (pins > this.possiblePins.length) {
      console.log('You can\'t hit that many pins this time');
      return;
    }
    this.possiblePins.splice(0, pins);
    const currentFrame: IFrame = this.frames[this.frameIndex];
    const ball: IBall = { pins: pins, frame: currentFrame, state: BallState.normal };
    const prevBall = this.balls[this.balls.length - 1];

    /* Rules
    If the ball resulted in a strike, the score is 10 plus the score of the next two balls.
    If the ball resulted in a spare, the score is 10 plus the score of the next ball.
    */

    /*** Handle rolls ***/
    if (currentFrame.isLast) { // Last frame
      if (!currentFrame.firstBall) {

      } else if (!currentFrame.secondBall) {

      } else {

      }
    } else { // Normal frame
      if (!currentFrame.firstBall) { // First ball
        if (ball.pins === 10) { // Strike
          // currentFrame.firstBall.state = BallState.strike;
          ball.state = BallState.strike;
          currentFrame.firstBall = ball;
          this.nextFrame();
        }
      } else { // Second ball
        if (prevBall.pins + ball.pins === 10) { // Spare
          // currentFrame.secondBall.state = BallState.strike;
          ball.state = BallState.spare;
          currentFrame.secondBall = ball;
        }
        this.nextFrame();
      }
    }
    this.balls.push(ball);
    // console.log(currentFrame);
  }

  private nextFrame(): void {
    this.frameIndex++;
    this.resetPins();
  }

  private resetPins(): void {
    this.possiblePins = [true, true, true, true, true, true, true, true, true, true, true];
  }

  getPossiblePins(): Array<true> {
    return [...this.possiblePins];
  }

  getFrames(): IFrame[] {
    return this.frames;
  }

  getTest(): number[] {
    return [1, 2, 3, 4, 5, 6];
  }
}
