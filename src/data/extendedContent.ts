/**
 * Extended content library for The Midnight Line
 * Additional passengers, stations, and crew roles for future expansion
 */

import { Passenger } from '../game/passengers';
import { Station, StationChoice } from '../game/stations';

// ============ EXTENDED PASSENGERS ============
// These can be unlocked through meta-progression

export const extendedPassengers: Record<string, Passenger> = {
  artist_mom: {
    id: 'artist_mom' as any,
    name: 'The Artist Mother',
    shortDescription: 'Scrolling her phone in the dark. Used to make things. Now makes spreadsheets.',
    prompts: {
      fear: 'That my children will inherit my resignation.',
      desire: 'To remember what it felt like to create something just for joy.',
      unsaid: 'I think I gave up on myself before I gave up on them.'
    }
  },
  man_at_threshold: {
    id: 'man_at_threshold' as any,
    name: 'The Man at the Threshold',
    shortDescription: 'Keys in hand. Car running. Door half open. One foot out.',
    prompts: {
      fear: 'That leaving will make me a monster.',
      desire: 'To find a way to be honest without destroying everyone.',
      unsaid: 'I love them, but I don\'t know how to stay.'
    }
  },
  lost_friend: {
    id: 'lost_friend' as any,
    name: 'The Lost Friend',
    shortDescription: 'Hasn\'t texted back in three years. Stopped answering calls.',
    prompts: {
      fear: 'That they\'ve forgotten me, or worse—remember too much.',
      desire: 'To find a way back to the friendship that used to be easy.',
      unsaid: 'I was ashamed, so I just... disappeared.'
    }
  }
};

// ============ EXTENDED STATIONS ============
// Emotional stations that could be added to the game

export const extendedStations: Record<string, Station> = {
  hospital_night_shift: {
    id: 'hospital_night_shift' as any,
    name: 'Hospital Night Shift',
    tagline: 'Fluorescent hum. The never-empty waiting room.',
    introText:
      'The station wears the shape of a hospital hallway. Monitors beep in time. A parent sits in a plastic chair, coffee cooling. A nurse passes with shoulders that carry too much.',
    choices: [
      {
        id: 'hospital-compassion',
        label: 'Whisper that their exhaustion matters. That they\'re not failing.',
        impactDelta: 1,
        description: 'A faint easing in their jaw. A shift toward hope.'
      },
      {
        id: 'hospital-presence',
        label: 'Just sit in the waiting room with them.',
        impactDelta: 0,
        description: 'The quiet becomes less lonely. That is something.'
      },
      {
        id: 'hospital-harsh',
        label: 'Say that hope is a luxury they don\'t have time for.',
        impactDelta: -1,
        description: 'Their eyes close. The vigil continues, heavier.'
      }
    ]
  },
  things_never_said_to_dad: {
    id: 'things_never_said_to_dad' as any,
    name: 'Things I Never Said to My Dad',
    tagline: 'A living room frozen in TVs and silence.',
    introText:
      'The station is a lounge room. Muted football on the screen. A father-figure sits in the good armchair. The whole room waits for someone to speak first.',
    choices: [
      {
        id: 'dad-speak',
        label: 'Help them borrow the words they never got to use.',
        impactDelta: 1,
        description: 'The words come out trembling. They are finally said.'
      },
      {
        id: 'dad-listen',
        label: 'Let the silence be enough. Sometimes presence heals.',
        impactDelta: 0,
        description: 'The father-figure looks over. Something passes between them.'
      },
      {
        id: 'dad-nothing',
        label: 'Some things are meant to stay unsaid.',
        impactDelta: -1,
        description: 'The chair remains empty. The silence continues.'
      }
    ]
  },
  first_love: {
    id: 'first_love' as any,
    name: 'First Love',
    tagline: 'Back seats and clumsy kisses. A version of yourself you\'ll never see again.',
    introText:
      'The station is the site of an old memory: a car parked by water, a teenage version of this person\'s heart, someone\'s hand held for the first time. They are watching themselves, unable to reach in.',
    choices: [
      {
        id: 'first_love-honor',
        label: 'Remind them that first love—even lost—shaped who they became.',
        impactDelta: 1,
        description: 'The memory softens. It becomes precious instead of aching.'
      },
      {
        id: 'first_love-hold',
        label: 'Hold space for the grief and the sweetness together.',
        impactDelta: 0,
        description: 'The watching settles. The moment becomes bearable.'
      },
      {
        id: 'first_love-harsh',
        label: 'Tell them some loves are meant to stay in the past.',
        impactDelta: -1,
        description: 'The memory hardens. It becomes something to escape.'
      }
    ]
  },
  church_car_park: {
    id: 'church_car_park' as any,
    name: 'The Church Car Park',
    tagline: 'Gravel and prayers and the person you used to believe you\'d be.',
    introText:
      'The station is an empty car park beside a church that\'s still glowing from inside. Someone stands between the locked doors and the car, unable to choose which way to go.',
    choices: [
      {
        id: 'church-enter',
        label: 'Gently suggest they might find something inside.',
        impactDelta: 1,
        description: 'The doors feel less heavy. A hand reaches for the handle.'
      },
      {
        id: 'church-wait',
        label: 'Stand with them. You don\'t have to push either way.',
        impactDelta: 0,
        description: 'The choice becomes theirs, in their own time.'
      },
      {
        id: 'church-away',
        label: 'Walk them to the car. Some doubts can\'t be healed.',
        impactDelta: -1,
        description: 'The engine starts. The church recedes in the mirror.'
      }
    ]
  },
  numb_scrolling: {
    id: 'numb_scrolling' as any,
    name: 'Numb Scrolling',
    tagline: 'Endless feeds. The blue light of not-feeling.',
    introText:
      'The station is a bed at 3am. A glowing screen. The feed is infinite, and it all looks the same. Another person is numb because numbness is easier than hurt.',
    choices: [
      {
        id: 'scroll-awaken',
        label: 'Suggest one real moment could be worth more than a thousand posts.',
        impactDelta: 1,
        description: 'A flicker of feeling returns. Then quickly numbs again. But it was there.'
      },
      {
        id: 'scroll-understand',
        label: 'Understand why they need the numbness right now.',
        impactDelta: 0,
        description: 'The scrolling continues, but less desperately. You\'ve witnessed it.'
      },
      {
        id: 'scroll-nothing',
        label: 'Sometimes scrolling is all someone can do.',
        impactDelta: -1,
        description: 'The feed glows on. Infinite and empty.'
      }
    ]
  }
};

// ============ CREW ROLE DESCRIPTIONS ============
// Full crew role definitions with abilities and dialogue

export interface CrewRoleTemplate {
  name: string;
  title: string;
  description: string;
  specialty: string;
  dialogueHint: string;
  ability: string;
}

export const crewRoles: Record<string, CrewRoleTemplate> = {
  Conductor: {
    name: 'Conductor',
    title: 'The One Who Keeps Time',
    description: 'Master of pacing and transitions. Knows when to wait and when to push forward.',
    specialty: 'Timing interventions perfectly. Can delay the train to let one more moment unfold.',
    dialogueHint: 'Speaks with authority and quiet certainty. Uses metaphors of journeys and arrivals.',
    ability: 'Temporal nudge: Slightly extend moments of clarity or compassion.'
  },
  Gatherer: {
    name: 'Gatherer',
    title: 'The One Who Collects',
    description: 'Collects unsent words, lost dreams, forgotten moments. Preserves what might otherwise vanish.',
    specialty: 'Finding the precious things hidden in regret and shame.',
    dialogueHint: 'Speaks softly, carefully. Lists things like a curator.',
    ability: 'Word-keeping: Preserve unsent messages safely until the passenger is ready.'
  },
  Signaler: {
    name: 'Signaler',
    title: 'The One Who Redirects',
    description: 'Unlocked when Conductor reaches level 1. Flips the hidden points of fate. Changes trajectories.',
    specialty: 'Helping people choose different paths than the ones they\'ve been locked into.',
    dialogueHint: 'Speaks in riddles and metaphors about switches, lights, and directions.',
    ability: 'Path-shift: Offer alternative outcomes in moments of choice.'
  },
  Wiper: {
    name: 'Wiper',
    title: 'The One Who Clears Vision',
    description: 'Unlocked when Gatherer reaches level 2. Cleans the fog so people can see clearly, even briefly.',
    specialty: 'Cutting through denial, dissociation, and self-deception.',
    dialogueHint: 'Speaks plainly but kindly. No flowery language, just truth.',
    ability: 'Clarity-wash: Briefly reveal a hard truth the passenger is avoiding.'
  },
  Busker: {
    name: 'Busker',
    title: 'The One Who Sings',
    description: 'Unlocked when Conductor reaches level 3. A storyteller and musician. Shifts the emotional weather.',
    specialty: 'Using art, music, and story to reshape how the passenger feels.',
    dialogueHint: 'Speaks in songs, stories, and poems. Sees metaphors everywhere.',
    ability: 'Anthem-weave: Reframe the passenger\'s story as a song of resilience.'
  }
};
