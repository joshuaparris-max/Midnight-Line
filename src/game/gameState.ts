import { Passenger, PassengerId, getPassenger } from './passengers';
import { StationChoice, StationId } from './stations';
import { getEpilogue } from './epilogues';

export type GamePhase = 'title' | 'passengerSelect' | 'trainHub' | 'station' | 'epilogue';

export interface GameState {
  phase: GamePhase;
  selectedPassenger: Passenger | null;
  currentStationIndex: number;
  stationOrder: StationId[];
  impactScore: number; // -3..3
  log: string[];
}

export function resetToTitle(): GameState {
  return { phase: 'title', selectedPassenger: null, currentStationIndex: 0, stationOrder: [], impactScore: 0, log: [] };
}

export function startNewRun(passengerId: PassengerId): GameState {
  // order can be expanded for longer runs
  const stationOrder: StationId[] = ['regret', 'unsent_messages', 'beginning_again', 'reflection', 'farewell', 'hope'];
  // find passenger
  const passenger = getPassenger(passengerId);
  // Start at the Train Hub before the first station
  return { phase: 'trainHub', selectedPassenger: passenger, currentStationIndex: 0, stationOrder, impactScore: 0, log: [] };
}

export function applyStationChoice(state: GameState, choice: StationChoice): GameState {
  const stationId = state.stationOrder[state.currentStationIndex];
  const newScore = Math.max(-3, Math.min(3, state.impactScore + choice.impactDelta));
  const newLog = [...state.log, `${stationId}:${choice.id}:${choice.description}`];
  const nextIndex = state.currentStationIndex + 1;
  // If there are more stations, return to the train hub between stations
  if (nextIndex >= state.stationOrder.length) {
    const nextState: GameState = { ...state, impactScore: newScore, log: newLog, currentStationIndex: nextIndex, phase: 'epilogue' };
    return nextState;
  } else {
    const nextState: GameState = { ...state, impactScore: newScore, log: newLog, currentStationIndex: nextIndex, phase: 'trainHub' };
    return nextState;
  }
}

export function getEpilogueFor(state: GameState) {
  if (!state.selectedPassenger) return null;
  return getEpilogue(state.selectedPassenger.id, state.impactScore);
}
