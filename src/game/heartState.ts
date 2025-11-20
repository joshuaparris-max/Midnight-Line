export type HeartState = 'STUCK' | 'WAVERING' | 'SOFTENED' | 'OPEN' | 'TURNING_POINT';

export function heartStateFromScore(score: number): HeartState {
  // score is -3..3, map to 0..4
  const clamped = Math.max(-3, Math.min(3, score));
  const idx = clamped + 2; // -3 -> -1? wait convert: we want mapping: -3..3 -> 0..6? Simpler: map ranges
  if (clamped <= -2) return 'STUCK';
  if (clamped === -1) return 'WAVERING';
  if (clamped === 0) return 'SOFTENED';
  if (clamped === 1) return 'OPEN';
  return 'TURNING_POINT';
}

export function labelFor(state: HeartState){
  switch(state){
    case 'STUCK': return 'Stuck';
    case 'WAVERING': return 'Wavering';
    case 'SOFTENED': return 'Softened';
    case 'OPEN': return 'Open';
    case 'TURNING_POINT': return 'Turning Point';
  }
}
