export enum HeartState {
  STUCK = 0,
  WAVERING = 1,
  SOFTENED = 2,
  OPEN = 3,
  TURNING_POINT = 4
}

export function labelFor(state: HeartState){
  switch(state){
    case HeartState.STUCK: return "Stuck";
    case HeartState.WAVERING: return "Wavering";
    case HeartState.SOFTENED: return "Softened";
    case HeartState.OPEN: return "Open";
    case HeartState.TURNING_POINT: return "Turning Point";
    default: return "Unknown";
  }
}
