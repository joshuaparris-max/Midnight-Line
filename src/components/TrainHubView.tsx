import React from 'react';
import { Passenger } from '../game/passengers';
import { Station } from '../game/stations';
import HeartStateIndicator from './HeartStateIndicator';

export default function TrainHubView({ passenger, nextStation, impactScore, onDepart, runLog } : { passenger: Passenger | null; nextStation: Station | null; impactScore: number; onDepart: ()=>void; runLog?: string[] }){
  return (
    <div className="train-hub">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h2>Train Hub</h2>
          <p style={{color:'#cfe9f9'}}><em>Carriage quiet. Crew ready.</em></p>
        </div>
        <HeartStateIndicator score={impactScore} />
      </div>

      <div className="carriage" style={{marginTop:18,display:'flex',gap:12,alignItems:'center'}}>
        <div className="car-slot">
          <div className="avatar">You</div>
          <div style={{fontSize:13,color:'#d6eaf8'}}>Conductor</div>
        </div>
        <div className="car-slot">
          <div className="avatar muted">G</div>
          <div style={{fontSize:13,color:'#d6eaf8'}}>Gatherer</div>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:600}}>{nextStation? nextStation.name : '—'}</div>
          <div style={{color:'#bfcbd6'}}>{nextStation? nextStation.tagline : ''}</div>
        </div>
        <div>
          <button className="primary" onClick={onDepart} aria-label="Depart to next station">Depart for {nextStation? nextStation.name : 'station'}</button>
        </div>
      </div>

      {passenger && (
        <div style={{marginTop:18,background:'rgba(255,255,255,0.02)',padding:12,borderRadius:8}}>
          <div style={{fontSize:13,color:'#cfe9f9'}}><strong>Passenger prompt</strong></div>
          <div style={{marginTop:6,color:'#d6eaf8'}}>{passenger.prompts.fear}</div>
        </div>
      )}

      {runLog && runLog.length>0 && (
        <div style={{marginTop:12,fontSize:12,color:'#98a6b3'}}>{runLog[runLog.length-1]}</div>
      )}
    </div>
  );
}
