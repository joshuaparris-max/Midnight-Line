import React, { useState, useEffect } from 'react';
import { GameState } from '../game/gameState';
import { getStationById, StationChoice } from '../game/stations';
import HeartStateIndicator from './HeartStateIndicator';

export default function StationView({ state, onChoose }: { state: GameState; onChoose: (choice: StationChoice)=>void }){
  const stationId = state.stationOrder[state.currentStationIndex];
  const station = getStationById(stationId as any);
  const [selectedChoice, setSelectedChoice] = useState<StationChoice | null>(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(()=>{
    setSelectedChoice(null); setShowDescription(false);
  }, [stationId]);

  const choose = (c: StationChoice)=>{
    setSelectedChoice(c); setShowDescription(true);
  };

  const continueAfter = ()=>{
    if(selectedChoice){ onChoose(selectedChoice); }
  };

  return (
    <div className={`station-panel station-${stationId}`}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h2>{station.name}</h2>
          <p style={{color:'#bfcbd6'}}><em>{station.tagline}</em></p>
        </div>
        <HeartStateIndicator score={state.impactScore} />
      </div>

      <p style={{marginTop:12}} className="panel-content">{station.introText}</p>

      <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:16}}>
        {station.choices.map(c=> (
          <button key={c.id} aria-pressed={selectedChoice?.id===c.id} className={`choice ${selectedChoice?.id===c.id? 'selected':''}`} onClick={()=>choose(c)}>{c.label}</button>
        ))}
      </div>

      {showDescription && selectedChoice && (
        <div style={{marginTop:14,background:'rgba(255,255,255,0.02)',padding:12,borderRadius:8}}>
          <p style={{margin:0}}>{selectedChoice.description}</p>
          <div style={{marginTop:10}}>
            <button className="primary" onClick={continueAfter}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}
