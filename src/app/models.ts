export interface IFrame {
    number: number;
    firstBall?: IBall;
    secondBall?: IBall;
    thirdBall?: IBall; // Only for the last frame
    score?: number;
    calculated?: boolean;
    active?: boolean;
    isLast: boolean;
}

export interface IBall {
    pins: number;
    frame: IFrame;
    state: BallState;
}

export enum BallState {normal, spare , strike}
