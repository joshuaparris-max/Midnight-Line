import React, { useState } from 'react';
import { GamePhase, GameState, startNewRun, applyStationChoice, resetToTitle } from './game/gameState';
import TitleScreen from './components/TitleScreen';
import PassengerSelect from './components/PassengerSelect';
import StationView from './components/StationView';
import EpilogueView from './components/EpilogueView';
import TrainHubView from './components/TrainHubView';
import HeartStateIndicator from './components/HeartStateIndicator';
import { getStationById } from './game/stations';
import { Layout } from './components/ui/Layout';

const App: React.FC = () => {
  const [state, setState] = useState<GameState>({ phase: 'title', selectedPassenger: null, currentStationIndex: 0, stationOrder: [], impactScore: 0, log: [] });

  const goToPassengerSelect = () => setState(prev => ({ ...prev, phase: 'passengerSelect' }));

  const onStartRun = (passengerId: string) => {
    const s = startNewRun(passengerId as any);
    setState(s);
  };

  const onChoose = (choice: any) => {
    const next = applyStationChoice(state, choice);
    setState(next);
  };

  const onDepartFromHub = () => {
    // move into the current station scene
    setState(prev => ({ ...prev, phase: 'station' }));
  };

  const onReturnToTitle = () => setState(resetToTitle());

  return (
    <Layout>
      {state.phase === 'title' && <TitleScreen onBegin={goToPassengerSelect} />}
      {state.phase === 'passengerSelect' && <PassengerSelect onStart={onStartRun} />}
      {state.phase === 'trainHub' && state.selectedPassenger && (
        <TrainHubView passenger={state.selectedPassenger} nextStation={state.stationOrder[state.currentStationIndex] ? getStationById(state.stationOrder[state.currentStationIndex]) : null} impactScore={state.impactScore} onDepart={onDepartFromHub} runLog={state.log} />
      )}
      {state.phase === 'station' && state.selectedPassenger && (
        <StationView state={state} onChoose={(c)=>onChoose(c)} />
      )}
      {state.phase === 'epilogue' && state.selectedPassenger && (
        <EpilogueView state={state} onRestart={onReturnToTitle} />
      )}
    </Layout>
  );
};

export default App;
