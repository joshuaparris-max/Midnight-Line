import React, { useState } from 'react';
import { getAllPassengers, Passenger } from '../game/passengers';

export default function PassengerSelect({ onStart }: { onStart: (id: string)=>void }){
  const passengers = getAllPassengers();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <h2>Who is this night for?</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
        {passengers.map(p=> (
          <div key={p.id} className={`card ${selected===p.id? 'selected':''}`} onClick={()=>setSelected(p.id)} tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') setSelected(p.id); }}>
            <h3>{p.name}</h3>
            <p style={{color:'#bfcbd6'}}>{p.shortDescription}</p>
            <p style={{fontSize:13,color:'#98a6b3'}}><strong>Fear:</strong> {p.prompts.fear}</p>
          </div>
        ))}
      </div>
      <div style={{marginTop:16}}>
        <button className="primary" disabled={!selected} onClick={()=>selected && onStart(selected)}>Start Night Run</button>
      </div>
    </div>
  );
}
