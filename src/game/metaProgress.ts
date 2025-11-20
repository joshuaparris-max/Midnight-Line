/**
 * Meta-progression and save state system for The Midnight Line
 * Tracks crew upgrades, multiple nights, and run history
 */

export type CrewRole = 'Conductor' | 'Gatherer' | 'Signaler' | 'Wiper' | 'Busker';

export interface CrewMember {
  role: CrewRole;
  unlocked: boolean;
  level: number; // 0-3, affects dialogue variations and subtle abilities
  xp: number;
}

export interface RunRecord {
  id: string;
  passengerId: string;
  passengerName: string;
  stationOrder: string[];
  finalImpactScore: number;
  timestamp: number;
  playtimeSeconds: number;
  crew: CrewRole[];
}

export interface MetaProgress {
  nightsCompleted: number;
  totalRunTime: number; // seconds
  crew: Record<CrewRole, CrewMember>;
  runHistory: RunRecord[];
  unlockedStations: Set<string>;
  unlockedPassengers: Set<string>;
}

/**
 * Initialize fresh meta-progression state
 */
export function createMetaProgress(): MetaProgress {
  return {
    nightsCompleted: 0,
    totalRunTime: 0,
    crew: {
      'Conductor': { role: 'Conductor', unlocked: true, level: 0, xp: 0 },
      'Gatherer': { role: 'Gatherer', unlocked: true, level: 0, xp: 0 },
      'Signaler': { role: 'Signaler', unlocked: false, level: 0, xp: 0 },
      'Wiper': { role: 'Wiper', unlocked: false, level: 0, xp: 0 },
      'Busker': { role: 'Busker', unlocked: false, level: 0, xp: 0 }
    },
    runHistory: [],
    unlockedStations: new Set(['regret', 'unsent_messages', 'beginning_again']),
    unlockedPassengers: new Set(['burntout_nurse', 'grieving_dad', 'lonely_teen'])
  };
}

/**
 * Save run to history and update meta progress
 */
export function recordRunCompletion(
  meta: MetaProgress,
  run: {
    passengerId: string;
    passengerName: string;
    stationOrder: string[];
    finalImpactScore: number;
    playtimeSeconds: number;
    crewUsed: CrewRole[];
  }
): MetaProgress {
  const newMeta = { ...meta };
  
  newMeta.nightsCompleted += 1;
  newMeta.totalRunTime += run.playtimeSeconds;

  // Record this run
  const runRecord: RunRecord = {
    id: `run-${newMeta.nightsCompleted}`,
    passengerId: run.passengerId,
    passengerName: run.passengerName,
    stationOrder: run.stationOrder,
    finalImpactScore: run.finalImpactScore,
    timestamp: Date.now(),
    playtimeSeconds: run.playtimeSeconds,
    crew: run.crewUsed
  };
  newMeta.runHistory = [...newMeta.runHistory, runRecord];

  // Award XP to crew members used
  const xpPerRun = 10;
  for (const role of run.crewUsed) {
    if (newMeta.crew[role]) {
      newMeta.crew[role].xp += xpPerRun;
      
      // Level up at 30 XP
      while (newMeta.crew[role].xp >= 30 && newMeta.crew[role].level < 3) {
        newMeta.crew[role].xp -= 30;
        newMeta.crew[role].level += 1;
        
        // Unlock new crew roles at certain level milestones
        if (newMeta.crew[role].level >= 1 && role === 'Conductor') {
          newMeta.crew['Signaler'].unlocked = true;
        }
        if (newMeta.crew[role].level >= 2 && role === 'Gatherer') {
          newMeta.crew['Wiper'].unlocked = true;
        }
        if (newMeta.crew[role].level >= 3 && role === 'Conductor') {
          newMeta.crew['Busker'].unlocked = true;
        }
      }
    }
  }

  // Unlock new stations based on nights completed
  if (newMeta.nightsCompleted >= 3) {
    newMeta.unlockedStations.add('hospital_night_shift');
  }
  if (newMeta.nightsCompleted >= 5) {
    newMeta.unlockedStations.add('things_never_said_to_dad');
  }
  if (newMeta.nightsCompleted >= 7) {
    newMeta.unlockedStations.add('first_love');
  }

  return newMeta;
}

/**
 * Unlock a new passenger type (rare, special event)
 */
export function unlockPassenger(meta: MetaProgress, passengerId: string): MetaProgress {
  if (!meta.unlockedPassengers.has(passengerId)) {
    meta.unlockedPassengers.add(passengerId);
  }
  return meta;
}

/**
 * Get crew members unlocked so far
 */
export function getUnlockedCrew(meta: MetaProgress): CrewRole[] {
  return (Object.values(meta.crew) as CrewMember[])
    .filter(m => m.unlocked)
    .map(m => m.role);
}

/**
 * LocalStorage persistence layer
 */
const STORAGE_KEY = 'midnight-line-meta';

export function saveMetaProgress(meta: MetaProgress): void {
  try {
    // Convert Sets to arrays for JSON serialization
    const data = {
      ...meta,
      unlockedStations: Array.from(meta.unlockedStations),
      unlockedPassengers: Array.from(meta.unlockedPassengers)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save meta progress:', e);
  }
}

export function loadMetaProgress(): MetaProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return {
        ...data,
        unlockedStations: new Set(data.unlockedStations),
        unlockedPassengers: new Set(data.unlockedPassengers)
      };
    }
  } catch (e) {
    console.error('Failed to load meta progress:', e);
  }
  return createMetaProgress();
}

export function clearMetaProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear meta progress:', e);
  }
}
