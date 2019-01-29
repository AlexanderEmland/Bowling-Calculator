export interface IScore {
    number: number;
    firstBall?: number;
    secondBall?: number;
    thirdBall?: number; // Only for the last score
    localValue?: number;
    score?: number;
    state?: ScoreState;
    isLast: boolean;
}

export enum ScoreState {normal, spare , strike}
