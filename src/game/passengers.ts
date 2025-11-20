export type PassengerId = 'burntout_nurse' | 'grieving_dad' | 'lonely_teen';

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
