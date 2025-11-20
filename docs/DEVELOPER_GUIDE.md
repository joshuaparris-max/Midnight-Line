# Developer Quick Reference - The Midnight Line

## How to Add Content

### Adding a New Passenger

1. **Edit** `src/game/passengers.ts`:
```typescript
export type PassengerId = 'burntout_nurse' | 'grieving_dad' | 'lonely_teen' | 'your_new_passenger';

const PASSENGERS: Record<PassengerId, Passenger> = {
  // ... existing passengers ...
  your_new_passenger: {
    id: 'your_new_passenger',
    name: 'Display Name',
    shortDescription: '1-2 line hook',
    prompts: {
      fear: 'What they\'re scared of',
      desire: 'What they deeply want',
      unsaid: 'What they\'d never say'
    }
  }
};
```

2. **Add dialogue tree** in `src/data/dialogue.ts`:
```typescript
export const trainHubDialogue: Record<PassengerId, DialogueTree> = {
  your_new_passenger: {
    id: 'train-hub-new',
    root: 'conductor-greet-new',
    nodes: new Map([
      [
        'conductor-greet-new',
        {
          id: 'conductor-greet-new',
          speaker: 'Conductor',
          text: 'What the crew sees in them...',
          nextNode: 'next-node-id'
        }
      ],
      // ... more nodes ...
    ])
  }
};
```

3. **Add station encounters** for each station:
```typescript
export const stationEncounters: Record<`${PassengerId}-${StationId}`, DialogueTree> = {
  'your_new_passenger-regret': { /* ... */ },
  'your_new_passenger-unsent_messages': { /* ... */ },
  'your_new_passenger-beginning_again': { /* ... */ }
};
```

4. **Add epilogues** in `src/game/epilogues.ts`:
```typescript
const EPILOGUES: Record<PassengerId, { low: EpilogueResult; mid: EpilogueResult; high: EpilogueResult }> = {
  your_new_passenger: {
    low: { title: '...', body: '...' },
    mid: { title: '...', body: '...' },
    high: { title: '...', body: '...' }
  }
};
```

---

### Adding a New Station

1. **Edit** `src/game/stations.ts`:
```typescript
export type StationId = 'regret' | 'unsent_messages' | 'beginning_again' | 'your_new_station';

export const STATIONS: Record<StationId, Station> = {
  your_new_station: {
    id: 'your_new_station',
    name: 'Station Name',
    tagline: '1-line atmospheric description',
    introText: '2-4 sentence scene-setting...',
    choices: [
      {
        id: 'choice-1',
        label: 'What player sees as choice text',
        impactDelta: 1, // or 0, or -1
        description: 'Narrative feedback after choice'
      },
      // ... 2 more choices ...
    ]
  }
};
```

2. **Add dialogue encounters** for each passenger:
```typescript
'your_passenger-your_new_station': {
  id: 'encounter-id',
  root: 'root-node-id',
  nodes: new Map([ /* ... */ ])
}
```

3. **Add CSS styling** in `src/styles.css`:
```css
.station-your_new_station {
  background: linear-gradient(135deg, #startColor 0%, #endColor 100%);
  border: 1px solid rgba(155, 211, 255, 0.1);
  box-shadow: 0 8px 32px rgba(R, G, B, 0.15);
}
```

---

### Integrating Audio

In `src/game/audio.ts`, replace `PlaceholderAudioManager` with real implementation:

```typescript
class RealAudioManager implements AudioManager {
  private howlerInstance: any; // or your audio library

  playMusic(track: AudioTrack, fade = false) {
    // Use Howler.js, Tone.js, or Web Audio API
    // this.howlerInstance.fade(startVol, endVol, duration);
    // this.howlerInstance.play(trackId);
  }

  playSFX(sfx: SFXType, volume = 1.0) {
    // Play sound effect
    // this.sfx[sfx].volume(volume).play();
  }
  
  // ... etc
}
```

Then use in components:
```typescript
import { audioManager } from '../game/audio';

// In components:
const handleChoice = (choice: StationChoice) => {
  audioManager.playSFX('choice_select');
  // ... rest of choice logic
};
```

---

### Using Dialogue Trees in Custom Scenes

```typescript
import { getDialogueTree, getDialogueNode, DialogueNode } from '../data/dialogue';

// Get the tree
const tree = getDialogueTree('burntout_nurse', 'train_hub');

// Get a node
const node = getDialogueNode(tree, tree.root);

// Display node text
console.log(node.text);
console.log(node.speaker);

// Present choices
node.choices?.forEach(choice => {
  // Create button for choice
});

// Move to next node
if (node.nextNode) {
  const nextNode = getDialogueNode(tree, node.nextNode);
}
```

---

### Meta-Progression Integration

```typescript
import { 
  createMetaProgress, 
  recordRunCompletion, 
  saveMetaProgress, 
  loadMetaProgress,
  getUnlockedCrew 
} from '../game/metaProgress';

// Load existing progress
let meta = loadMetaProgress();

// After a run completes
meta = recordRunCompletion(meta, {
  passengerId: 'burntout_nurse',
  passengerName: 'Burnt-out Nurse',
  stationOrder: ['regret', 'unsent_messages', 'beginning_again'],
  finalImpactScore: 2,
  playtimeSeconds: 1200,
  crewUsed: ['Conductor', 'Gatherer']
});

// Save progress
saveMetaProgress(meta);

// Get crew members available
const unlockedCrew = getUnlockedCrew(meta); // ['Conductor', 'Gatherer', ...]
```

---

### Styling Guidelines

**Color Palette:**
- Background: `#051018` (dark blue-black)
- Text Primary: `#eaf6ff` (pale blue)
- Text Secondary: `#d6eaf8` (lighter blue)
- Accent: `#9bd3ff` (bright blue)
- Muted: `#8aa6b8` (gray-blue)

**Typography:**
- Headers: 22-32px, `#9bd3ff`, 600-700 weight
- Body: 14px, `#d6eaf8`, 400 weight
- Small: 12-13px, `#7fa6c1`

**Spacing:**
- Card padding: 16px
- Section gap: 14-18px
- Button padding: 14px 20px

**Interactions:**
- Hover: +5-10% brightness, slight scale or translate
- Focus: 2px solid outline, 2px offset
- Active: Maintained state with inset shadow or darker bg

**Responsive Breakpoint:**
- Mobile: max-width 640px (adjust padding, reduce sizes)

---

### Testing Checklist

- [ ] Keyboard navigation works (Tab, Arrows, Enter, Space)
- [ ] Screen reader announces all interactive elements
- [ ] Focus indicators visible on all buttons
- [ ] Station backgrounds are distinct
- [ ] Heart state colors match emotional arc
- [ ] Dialogue flows naturally, no typos
- [ ] All choices have impact deltas (-1, 0, or +1)
- [ ] Epilogue variants (low/mid/high) exist for each passenger
- [ ] No TypeScript errors (`npm run build`)
- [ ] Mobile-responsive (test at 375px width)
- [ ] Audio hooks fire on expected events

---

### Common Tasks

**Change Impact Threshold for Heart States:**
Edit `src/game/heartState.ts`:
```typescript
export function heartStateFromScore(score: number): HeartState {
  if (clamped <= -2) return 'STUCK';      // <= -2
  if (clamped === -1) return 'WAVERING';  // -1
  if (clamped === 0) return 'SOFTENED';   // 0
  if (clamped === 1) return 'OPEN';       // 1
  return 'TURNING_POINT';                  // 2+
}
```

**Adjust Station Order:**
Edit `src/game/gameState.ts`:
```typescript
export function startNewRun(passengerId: PassengerId): GameState {
  const stationOrder: StationId[] = [
    'beginning_again',  // Start here instead
    'regret',
    'unsent_messages'
  ];
  // ...
}
```

**Add More Stations Per Run:**
1. Update `gameState.ts` stationOrder
2. Add station data to `stations.ts`
3. Add encounters to `dialogue.ts` for each passenger
4. Update epilogue logic if needed

---

### Performance Tips

- **Dialogue trees**: Pre-compile to Map for O(1) lookup
- **Audio**: Lazy-load tracks, stream from CDN
- **Assets**: Use WebP with fallbacks
- **Rendering**: React batches updates, use `memo` for large lists
- **LocalStorage**: Serialize/deserialize with care, cap size at 5MB

---

### Debugging

**Check current game state:**
```typescript
// In browser console:
const app = document.querySelector('div'); // Access your app
// Log game state as needed
```

**Audio debug:**
```typescript
// In src/game/audio.ts, audio calls will log to console
console.log(`[Audio] Playing SFX: ${sfx}`);
```

**Dialogue tree debug:**
```typescript
import { getDialogueTree } from '../data/dialogue';
const tree = getDialogueTree('burntout_nurse', 'train_hub');
console.log(tree.nodes); // See all nodes in the tree
```

---

**Last Updated**: November 2025
**Version**: 0.2.0 (Pre-alpha, high-priority features complete)
