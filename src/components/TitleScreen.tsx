import React from 'react';

export default function TitleScreen({ onBegin }: { onBegin: ()=>void }){
  return (
    <div style={{textAlign:'center'}}>
      <h1 style={{marginBottom:8}}>The Midnight Suburban Line</h1>
      <p style={{color:'#bfcbd6',marginBottom:20}}>A short nocturnal run that quietly carries one life toward morning.</p>
      <button className="primary" onClick={onBegin}>Begin Night Run</button>
    </div>
  );
}
