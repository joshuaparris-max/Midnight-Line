import { HeartState } from "./HeartState";

export class RunState {
  // heartScore ranges 0..4
  private heartScore: number = 1; // start at WAVERING

  get score(){ return this.heartScore }

  changeHeart(delta: number){
    this.heartScore = Math.max(0, Math.min(4, this.heartScore + delta));
  }

  getHeartState(): HeartState{
    return this.heartScore as HeartState;
  }
}
