import React from 'react';
import { heartStateFromScore, labelFor } from '../game/heartState';

export default function HeartStateIndicator({ score }: { score: number }){
  const state = heartStateFromScore(score);
  return (
    <div aria-hidden className={`heart-indicator heart-${state.toLowerCase()}`} title={`Heart: ${labelFor(state)}`}>
      <div className="heart-label">{labelFor(state)}</div>
      <div className="heart-bar">
        <div className={`seg ${state === 'STUCK' ? 'active':''}`}></div>
        <div className={`seg ${state === 'WAVERING' ? 'active':''}`}></div>
        <div className={`seg ${state === 'SOFTENED' ? 'active':''}`}></div>
        <div className={`seg ${state === 'OPEN' ? 'active':''}`}></div>
        <div className={`seg ${state === 'TURNING_POINT' ? 'active':''}`}></div>
      </div>
    </div>
  );
}
