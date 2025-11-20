import React, { useState, useEffect, useRef } from 'react';
import { GameState } from '../game/gameState';
import { getStationById, StationChoice } from '../game/stations';
import HeartStateIndicator from './HeartStateIndicator';
import { audioManager } from '../game/audio';

export default function StationView({ state, onChoose }: { state: GameState; onChoose: (choice: StationChoice)=>void }){
  const stationId = state.stationOrder[state.currentStationIndex];
  const station = getStationById(stationId as any);
  const [selectedChoice, setSelectedChoice] = useState<StationChoice | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const choiceRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(()=>{
    setSelectedChoice(null);
    setShowDescription(false);
    // Auto-focus first choice button
    const firstRef = choiceRefs.current.get(station.choices[0]?.id || '');
    if (firstRef) {
      setTimeout(() => firstRef.focus(), 100);
    }
  }, [stationId, station.choices]);

  const choose = (c: StationChoice)=>{
    audioManager.playSFX('choice_select');
    setSelectedChoice(c);
    setShowDescription(true);
  };

  const continueAfter = ()=>{
    if(selectedChoice){
      audioManager.playSFX('station_arrival');
      onChoose(selectedChoice);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, choice: StationChoice) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(choice);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const choices = station.choices;
      const currentIndex = choices.findIndex(c => c.id === choice.id);
      const nextIndex = (currentIndex + 1) % choices.length;
      const nextRef = choiceRefs.current.get(choices[nextIndex].id);
      if (nextRef) nextRef.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const choices = station.choices;
      const currentIndex = choices.findIndex(c => c.id === choice.id);
      const prevIndex = (currentIndex - 1 + choices.length) % choices.length;
      const prevRef = choiceRefs.current.get(choices[prevIndex].id);
      if (prevRef) prevRef.focus();
    }
  };

  return (
    <div className={`station-panel station-${stationId}`} role="region" aria-label={`${station.name} scene`}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
        <div>
          <h2>{station.name}</h2>
          <p style={{color:'#bfcbd6',margin:0,fontSize:14}}><em>{station.tagline}</em></p>
        </div>
        <div style={{flexShrink:0}}>
          <HeartStateIndicator score={state.impactScore} />
        </div>
      </div>

      <p style={{marginBottom:16,lineHeight:1.6}} className="panel-content">{station.introText}</p>

      <fieldset style={{border:'none',padding:0,margin:0}}>
        <legend style={{fontSize:12,color:'#bfe8ff',marginBottom:12,fontWeight:600}}>What does the crew do?</legend>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {station.choices.map(c=> (
            <button
              key={c.id}
              ref={(el) => {
                if (el) choiceRefs.current.set(c.id, el);
              }}
              aria-pressed={selectedChoice?.id===c.id}
              className={`choice ${selectedChoice?.id===c.id? 'selected':''}`}
              onClick={()=>choose(c)}
              onKeyDown={(e) => handleKeyDown(e, c)}
              aria-label={c.label}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      {showDescription && selectedChoice && (
        <div style={{marginTop:18,background:'rgba(155,211,255,0.03)',padding:14,borderRadius:8,border:'1px solid rgba(155,211,255,0.1)'}} role="status" aria-live="polite">
          <p style={{margin:'0 0 12px 0',color:'#eaf6ff',lineHeight:1.6}}>{selectedChoice.description}</p>
          <div>
            <button
              className="primary"
              onClick={continueAfter}
              aria-label="Continue to next station"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
