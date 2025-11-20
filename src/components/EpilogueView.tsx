import React from 'react';
import { GameState, getEpilogueFor } from '../game/gameState';

export default function EpilogueView({ state, onRestart }: { state: GameState; onRestart: ()=>void }){
  const res = getEpilogueFor(state);
  if(!res) return null;
  return (
    <div>
      <h2>{res.title}</h2>
      <p style={{marginTop:12}}>{res.body}</p>
      <div style={{marginTop:18}}>
        <button className="primary" onClick={onRestart}>Return to the Depot</button>
      </div>
    </div>
  );
}
