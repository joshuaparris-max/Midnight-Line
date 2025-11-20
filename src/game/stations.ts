export type StationId = 'regret' | 'unsent_messages' | 'beginning_again' | 'reflection' | 'farewell' | 'hope';

export interface StationChoice {
  id: string;
  label: string;
  impactDelta: number; // -1,0,+1
  description: string;
}

export interface Station {
  id: StationId;
  name: string;
  tagline: string;
  introText: string;
  choices: StationChoice[];
}

export const STATIONS: Record<StationId, Station> = {
  reflection: {
    id: 'reflection',
    name: 'Reflection',
    tagline: 'Windows show more than the night outside.',
    introText: 'The carriage is quiet, glass fogged with breath and memory. Each window holds a different version of the journey.',
    choices: [
      { id: 'look_closer', label: 'Look closer at the reflection.', impactDelta: +1, description: 'A new detail emerges, something gentle and true.' },
      { id: 'wipe_away', label: 'Wipe away the mist and move on.', impactDelta: 0, description: 'The view clears, but the feeling lingers.' },
      { id: 'turn_away', label: 'Turn away from the window.', impactDelta: -1, description: 'The night outside feels a little colder.' }
    ]
  },
  farewell: {
    id: 'farewell',
    name: 'Farewell',
    tagline: 'A platform for goodbyes and new hellos.',
    introText: 'Passengers shuffle, some leaving, some arriving. The air is thick with words unsaid and hands not shaken.',
    choices: [
      { id: 'wave', label: 'Wave goodbye with hope.', impactDelta: +1, description: 'A smile is returned, and the train feels lighter.' },
      { id: 'stay_silent', label: 'Stay silent and watch.', impactDelta: 0, description: 'The moment passes, but something is learned.' },
      { id: 'rush_off', label: 'Rush off before anyone notices.', impactDelta: -1, description: 'A door closes quickly, and the platform empties.' }
    ]
  },
  hope: {
    id: 'hope',
    name: 'Hope',
    tagline: 'First light hints at new journeys.',
    introText: 'The train slows, and the horizon glows faintly. There is a sense that something good might be waiting.',
    choices: [
      { id: 'embrace', label: 'Embrace the new day.', impactDelta: +1, description: 'A breath is taken, and the future feels possible.' },
      { id: 'hesitate', label: 'Hesitate at the threshold.', impactDelta: 0, description: 'The train waits, and so do you.' },
      { id: 'retreat', label: 'Retreat into the carriage.', impactDelta: -1, description: 'The light dims, and the journey continues.' }
    ]
  },
  regret: {
    id: 'regret',
    name: 'Regret',
    tagline: 'Platforms of what-ifs and cracked photo frames.',
    introText: 'The platform is a slow loop of memory—announcements repeat "Next stop: If Only...". Faces like faded photographs lean on the rails.',
    choices: [
      { id: 'acknowledge', label: 'Acknowledge the ache quietly.', impactDelta: +1, description: 'A small light hums, as if the train listened and nodded.' },
      { id: 'distract', label: 'Distract with a gentle story.', impactDelta: 0, description: 'A brief smile moves across the face, then settles.' },
      { id: 'brush_off', label: 'Tell them to forget it and move on.', impactDelta: -1, description: 'Their shoulders tighten; the platform feels colder.' }
    ]
  },
  unsent_messages: {
    id: 'unsent_messages',
    name: 'Unsent Messages',
    tagline: 'Lanterns of half-written words drift in the air.',
    introText: 'Bubbles of drafts float like lamps—phrases suspended mid-swing. Some glow faintly; others fizz and fade.',
    choices: [
      { id: 'delay', label: 'Delay the train so one more message can arrive.', impactDelta: +1, description: 'Time bends. One more line arrives, trembling but whole.' },
      { id: 'catalogue', label: 'Collect and keep them safe for later.', impactDelta: 0, description: 'You fold a draft into the pocket of the night; it may be useful later.' },
      { id: 'nudge_away', label: 'Whisper that some things are better left unsent.', impactDelta: -1, description: 'The air shutters; words float away like loose change.' }
    ]
  },
  beginning_again: {
    id: 'beginning_again',
    name: 'Beginning Again',
    tagline: 'Saplings through asphalt; first light on empty platforms.',
    introText: 'There is the quiet smell of dawn: wet concrete and new coffee. Small beginnings press up through cracks.',
    choices: [
      { id: 'encourage', label: 'Leave a small, practical suggestion.', impactDelta: +1, description: 'A note is tucked into a pocket—practical, tiny, and possible.' },
      { id: 'witness', label: 'Simply witness and affirm their attempt.', impactDelta: 0, description: 'They breathe; something unspoken eases.' },
      { id: 'dismiss', label: 'Point out how hard change is and move on.', impactDelta: -1, description: 'Their eyes drop; the sapling bends to wind.' }
    ]
  }
};

export function getStationById(id: StationId): Station { return STATIONS[id]; }
