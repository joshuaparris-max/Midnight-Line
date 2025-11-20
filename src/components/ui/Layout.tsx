import React from 'react';

export const Layout: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:24,background:'#06101a',color:'#e6eef8'}}>
      <div style={{width:'100%',maxWidth:700,background:'#081426',padding:24,borderRadius:12,boxShadow:'0 8px 30px rgba(0,0,0,0.6)'}}>
        {children}
      </div>
    </div>
  );
};
