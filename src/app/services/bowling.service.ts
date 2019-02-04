import { Injectable } from '@angular/core';
import { IFrame, BallState, IBall } from '../models';
import { ifError } from 'assert';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class BowlingService {

  frames: IFrame[] = [];
  balls: IBall[] = [];
  frameIndex: number;
  private possiblePins: Array<true> = [true, true, true, true, true, true, true, true, true, true, true];

  constructor(private messageService: MessageService) {
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
    this.frames[0].active = true;
  }

  private updateScores(): void {
    for (let i = 0; i < this.balls.length; i++) {
      const ball = this.balls[i];
      const nextBall = this.balls[i + 1];
      const secondNextBall = this.balls[i + 2];
      const currentFrame = ball.frame;
      const prevFrame = this.frames[this.frames.indexOf(currentFrame) - 1];

      currentFrame.score = 0;

      if (ball.state === BallState.strike && nextBall && secondNextBall) {
        currentFrame.score += ball.pins + nextBall.pins + secondNextBall.pins;
        currentFrame.calculated = true;
      } else if (ball.state === BallState.spare && nextBall) {
        currentFrame.score += ball.pins + nextBall.pins + currentFrame.firstBall.pins;
        currentFrame.calculated = true;
      } else {
        currentFrame.score += currentFrame.firstBall.pins + currentFrame.secondBall.pins;
        if (currentFrame.thirdBall.pins) {
          currentFrame.score += currentFrame.thirdBall.pins;
        }

        if ((currentFrame.isLast && currentFrame.secondBall.pins && currentFrame.firstBall.state !== BallState.strike)
          || (currentFrame.secondBall.pins && currentFrame.secondBall.state !== BallState.spare)) {
          currentFrame.calculated = true;
        }
      }

      if (prevFrame && prevFrame.score && currentFrame.score) {
        currentFrame.score += prevFrame.score;
      }
    }
  }

  getCurrentScore() {
    for (let i = this.frames.length - 1; i > 0; i--) {
      const element = this.frames[i];
      if (element.score) {
        return element.score;
      }
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
    If your first ball in the 10th (last) frame results in a strike or spare, you get a bonus ball.
    */

    /*** Handle rolls ***/
    if (currentFrame.isLast) { // LAST FRAME
      if (!currentFrame.firstBall.pins && currentFrame.firstBall.pins !== 0) {// First ball
        console.log('Throwing first ball in last frame');

        if (ball.pins === 10) { // Strike
          this.messageService.sendSpecial('You got a strike!');
          ball.state = BallState.strike;
          this.resetPins();
        }
        currentFrame.firstBall = ball;

      } else if (!currentFrame.secondBall.pins) { // Second ball
        console.log('Throwing second ball in last frame');

        if (prevBall.pins + ball.pins === 10 && prevBall.state !== BallState.strike) { // Spare
          this.messageService.sendSpecial('You got a spare!');
          ball.state = BallState.spare;
          this.resetPins();
        } else if (ball.pins === 10) { // Strike
          this.messageService.sendSpecial('You got a strike!');
          ball.state = BallState.strike;
          this.resetPins();
        }
        currentFrame.secondBall = ball;

      } else if (!currentFrame.thirdBall.pins
        && (currentFrame.firstBall.state === BallState.strike
          || currentFrame.secondBall.state === BallState.strike
          || currentFrame.secondBall.state === BallState.spare)) { // Third ball
        console.log('Throwing third ball in last frame');

        if (prevBall.pins + ball.pins === 10 && prevBall.state !== BallState.strike) { // Spare
          this.messageService.sendSpecial('You got a spare!');
          ball.state = BallState.spare;
          this.resetPins();
        } else if (ball.pins === 10) { // Strike
          this.messageService.sendSpecial('You got a strike!');
          ball.state = BallState.strike;
          this.resetPins();
        }
        currentFrame.thirdBall = ball;
        this.finishGame();
      }
    } else { // NORMAL FRAME
      if (!currentFrame.firstBall.pins && currentFrame.firstBall.pins !== 0) { // First ball
        console.log('Throwing first ball in frame ' + (this.frameIndex + 1));

        if (ball.pins === 10) { // Strike
          this.messageService.sendSpecial('You got a strike!');
          ball.state = BallState.strike;
          this.nextFrame();
        }

        currentFrame.firstBall = ball;
      } else { // Second ball
        console.log('Throwing second ball in frame ' + (this.frameIndex + 1));

        if (prevBall.pins + ball.pins === 10) { // Spare
          this.messageService.sendSpecial('You got a spare!');
          ball.state = BallState.spare;
        }
        this.nextFrame();
        currentFrame.secondBall = ball;
      }
    }
    this.balls.push(ball);
    this.updateScores();
    console.log(this.balls.length);
  }

  private nextFrame(): void {
    console.log('Going to next frame');
    this.frames[this.frameIndex].active = false;
    this.frameIndex++;
    this.frames[this.frameIndex].active = true;
    this.resetPins();
  }

  private resetPins(): void {
    console.log('Resetting pins');

    this.possiblePins = [true, true, true, true, true, true, true, true, true, true, true];
  }

  private finishGame(): void {
    console.log('Game finished');
    this.possiblePins = [];
  }

  getPossiblePins(): Array<true> {
    return [...this.possiblePins];
  }

  getFrames(): IFrame[] {
    return this.frames;
  }
}
