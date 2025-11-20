import React from 'react';
import { heartStateFromScore, labelFor } from '../game/heartState';

export default function HeartStateIndicator({ score }: { score: number }){
  const state = heartStateFromScore(score);
  const label = labelFor(state);

  // Determine color based on state
  const stateColors: Record<string, string> = {
    'STUCK': '#7a4a5a',
    'WAVERING': '#6a5a7f',
    'SOFTENED': '#5a7a8f',
    'OPEN': '#5a8a7f',
    'TURNING_POINT': '#6a9f5f'
  };

  const activeColor = stateColors[state] || '#5a8a7f';

  return (
    <div
      className={`heart-indicator heart-${state.toLowerCase()}`}
      title={`Heart state: ${label}`}
      role="status"
      aria-label={`Heart state: ${label}`}
    >
      <div className="heart-label">{label}</div>
      <div className="heart-bar">
        <div
          className={`seg ${state === 'STUCK' ? 'active':''}`}
          style={state === 'STUCK' ? { backgroundColor: activeColor } : {}}
          aria-hidden
        ></div>
        <div
          className={`seg ${state === 'WAVERING' ? 'active':''}`}
          style={state === 'WAVERING' ? { backgroundColor: activeColor } : {}}
          aria-hidden
        ></div>
        <div
          className={`seg ${state === 'SOFTENED' ? 'active':''}`}
          style={state === 'SOFTENED' ? { backgroundColor: activeColor } : {}}
          aria-hidden
        ></div>
        <div
          className={`seg ${state === 'OPEN' ? 'active':''}`}
          style={state === 'OPEN' ? { backgroundColor: activeColor } : {}}
          aria-hidden
        ></div>
        <div
          className={`seg ${state === 'TURNING_POINT' ? 'active':''}`}
          style={state === 'TURNING_POINT' ? { backgroundColor: activeColor } : {}}
          aria-hidden
        ></div>
      </div>
    </div>
  );
}
