import React, { useState, useRef, useEffect } from 'react';
import { getAllPassengers, Passenger } from '../game/passengers';

export default function PassengerSelect({ onStart }: { onStart: (id: string)=>void }){
  const passengers = getAllPassengers();
  const [selected, setSelected] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, passengerId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelected(passengerId);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const currentIndex = passengers.findIndex(p => p.id === passengerId);
      const nextIndex = (currentIndex + 1) % passengers.length;
      const nextRef = cardRefs.current.get(passengers[nextIndex].id);
      if (nextRef) {
        nextRef.focus();
        setSelected(passengers[nextIndex].id);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const currentIndex = passengers.findIndex(p => p.id === passengerId);
      const prevIndex = (currentIndex - 1 + passengers.length) % passengers.length;
      const prevRef = cardRefs.current.get(passengers[prevIndex].id);
      if (prevRef) {
        prevRef.focus();
        setSelected(passengers[prevIndex].id);
      }
    }
  };

  // Auto-focus first card on mount
  useEffect(() => {
    if (passengers.length > 0) {
      const firstRef = cardRefs.current.get(passengers[0].id);
      if (firstRef) {
        firstRef.focus();
      }
    }
  }, [passengers]);

  return (
    <div role="region" aria-label="Passenger selection">
      <h2>Who is this night for?</h2>
      <p style={{color:'#cfe9f9',marginBottom:16}}>
        Choose a person whose heart needs tending. You will never meet them directly—only help reshape their night.
      </p>
      
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:14,marginBottom:20}}>
        {passengers.map(p=> (
          <div
            key={p.id}
            ref={(el) => {
              if (el) cardRefs.current.set(p.id, el);
            }}
            className={`card ${selected===p.id? 'selected':''}`}
            onClick={()=>setSelected(p.id)}
            onKeyDown={(e)=>handleKeyDown(e, p.id)}
            tabIndex={0}
            role="option"
            aria-selected={selected === p.id}
            aria-label={`${p.name}: ${p.shortDescription}`}
          >
            <h3>{p.name}</h3>
            <p style={{color:'#bfcbd6',margin:'6px 0'}}>{p.shortDescription}</p>
            <div style={{fontSize:12,color:'#98a6b3',marginTop:10}}>
              <p style={{margin:'4px 0'}}><strong>Fear:</strong> {p.prompts.fear}</p>
              <p style={{margin:'4px 0'}}><strong>Desire:</strong> {p.prompts.desire}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:16}}>
        <button
          className="primary"
          disabled={!selected}
          onClick={()=>selected && onStart(selected)}
          aria-label={selected ? `Start night run for ${passengers.find(p => p.id === selected)?.name}` : 'Select a passenger first'}
          style={{width:'100%',padding:'14px 16px'}}
        >
          Start Night Run
        </button>
        {!selected && (
          <p style={{fontSize:12,color:'#7fa6c1',marginTop:8,textAlign:'center'}}>
            Choose a passenger to begin.
          </p>
        )}
      </div>
    </div>
  );
}
