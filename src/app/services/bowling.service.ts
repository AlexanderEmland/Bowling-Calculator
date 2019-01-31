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
    // if (currentFrame.isLast) { // Last frame
    //   if (!currentFrame.firstBall.pins) {

    //   } else if (!currentFrame.secondBall) {

    //   } else {

    //   }
    // } else { // Normal frame
    //console.log(ball, prevBall)
      if (!currentFrame.firstBall.pins) { // First ball
        console.log("Throwing first ball in frame " + (this.frameIndex+1));
        
        if (ball.pins === 10) { // Strike
          console.log('%c You got a strike! ', 'background: red; color: yellow');

          ball.state = BallState.strike;
          //console.log(currentFrame.firstBall)
          this.nextFrame();
        }
        currentFrame.firstBall = ball;
      } else { // Second ball
        console.log("Throwing second ball in frame " + (this.frameIndex+1));

        if (prevBall.pins + ball.pins === 10) { // Spare
          console.log('%c You got a spare! ', 'background: red; color: yellow');
          
          ball.state = BallState.spare;
          currentFrame.secondBall = ball;
        }
        this.nextFrame();
      }
    
  
    this.balls.push(ball);
  }

  private nextFrame(): void {
    console.log("Going to next frame");
    
    this.frameIndex++;
    this.resetPins();
  }

  private resetPins(): void {
    console.log("Resetting pins");
    
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
