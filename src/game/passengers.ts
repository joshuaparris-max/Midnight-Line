export type PassengerId = 'burntout_nurse' | 'grieving_dad' | 'lonely_teen' | 'signaler' | 'wiper' | 'busker';

export interface Passenger {
  id: PassengerId;
  name: string;
  shortDescription: string;
  prompts: {
    fear: string;
    desire: string;
    unsaid: string;
  };
}

const PASSENGERS: Record<PassengerId, Passenger> = {
  signaler: {
    id: 'signaler',
    name: 'Signaler',
    shortDescription: 'Keeps the lines clear, watching for trouble in the dark.',
    prompts: {
      fear: 'Missing a warning that matters.',
      desire: 'To be trusted with the night.',
      unsaid: "I wish someone would ask how I know what I know."
    }
  },
  wiper: {
    id: 'wiper',
    name: 'Wiper',
    shortDescription: 'Cleans the windows, hoping to see something new.',
    prompts: {
      fear: 'That nothing ever really changes.',
      desire: 'To glimpse a new horizon.',
      unsaid: "I keep hoping for a sign, but I only see my own reflection."
    }
  },
  busker: {
    id: 'busker',
    name: 'Busker',
    shortDescription: 'Plays music for the night shift, hoping someone listens.',
    prompts: {
      fear: 'Playing to an empty carriage forever.',
      desire: 'To move someone, even once.',
      unsaid: "I play the same song every night, but no one knows why."
    }
  },
  burntout_nurse: {
    id: 'burntout_nurse',
    name: 'Burnt-out Nurse',
    shortDescription: 'Paediatric nurse running on fumes and stale coffee.',
    prompts: {
      fear: 'That one mistake will follow me forever.',
      desire: 'To feel like rest is allowed.',
      unsaid: "I keep meaning to ask for help but I don't know how."
    }
  },
  grieving_dad: {
    id: 'grieving_dad',
    name: 'Grieving Dad',
    shortDescription: 'Drives the city at night, headlights like questions.',
    prompts: {
      fear: 'That moving forward is betraying a memory.',
      desire: 'To find a reason to stop the car and stay put.',
      unsaid: "I don't know how to say their name without breaking."
    }
  },
  lonely_teen: {
    id: 'lonely_teen',
    name: 'Lonely Teen',
    shortDescription: 'Feels invisible at school and louder on a quiet phone.',
    prompts: {
      fear: 'That people would notice me only when something is wrong.',
      desire: 'To be seen for something more than a username.',
      unsaid: "I wish someone would text first, even once."
    }
  }
};

export function getAllPassengers(): Passenger[] { return Object.values(PASSENGERS); }
export function getPassenger(id: PassengerId): Passenger { return PASSENGERS[id]; }
