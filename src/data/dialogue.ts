/**
 * Comprehensive dialogue system for The Midnight Line
 * Supports crew dialogue, NPC encounters, and station-specific scenes
 */

import { PassengerId } from '../game/passengers';
import { StationId } from '../game/stations';

export type DialogueNodeId = string;

export interface DialogueNode {
  id: DialogueNodeId;
  speaker?: string; // 'Conductor', 'Gatherer', 'Echo', etc.
  text: string;
  nextNode?: DialogueNodeId; // If not branching, moves to this node
  choices?: DialogueChoice[];
  contextHint?: string; // e.g., emotional beat, atmospheric detail
}

export interface DialogueChoice {
  id: string;
  text: string;
  nextNode: DialogueNodeId;
  impactDelta?: number; // -1, 0, or +1 if this choice affects impact
}

export interface DialogueTree {
  id: string;
  root: DialogueNodeId;
  nodes: Map<DialogueNodeId, DialogueNode>;
}

// ============ TRAIN HUB DIALOGUES ============
// Conductor and Gatherer dialogue before departing

export const trainHubDialogue: Record<PassengerId, DialogueTree> = {
  burntout_nurse: {
    id: 'train-hub-nurse',
    root: 'conductor-greet-nurse',
    nodes: new Map([
      [
        'conductor-greet-nurse',
        {
          id: 'conductor-greet-nurse',
          speaker: 'Conductor',
          text: 'Another night shift, I hear. The heart carries so much weight tonight.',
          contextHint: 'The Conductor studies a phantom timetable.',
          nextNode: 'gatherer-responds-nurse'
        }
      ],
      [
        'gatherer-responds-nurse',
        {
          id: 'gatherer-responds-nurse',
          speaker: 'Gatherer',
          text: 'Watching someone pour from an empty cup. We\'ll help find the well again.',
          contextHint: 'The Gatherer clutches a collection of unsent messages.',
          nextNode: 'conductor-final-nurse'
        }
      ],
      [
        'conductor-final-nurse',
        {
          id: 'conductor-final-nurse',
          speaker: 'Conductor',
          text: 'Then let\'s begin. The platforms are ready.',
          contextHint: 'The train hums to life.'
        }
      ]
    ])
  },
  grieving_dad: {
    id: 'train-hub-dad',
    root: 'conductor-greet-dad',
    nodes: new Map([
      [
        'conductor-greet-dad',
        {
          id: 'conductor-greet-dad',
          speaker: 'Conductor',
          text: 'A name that haunts. We\'ll walk those platforms with him.',
          contextHint: 'The Conductor\'s voice is soft, knowing.',
          nextNode: 'gatherer-responds-dad'
        }
      ],
      [
        'gatherer-responds-dad',
        {
          id: 'gatherer-responds-dad',
          speaker: 'Gatherer',
          text: 'I\'ve collected the unspoken words. They need speaking.',
          contextHint: 'The Gatherer holds phantom voicemails.',
          nextNode: 'conductor-final-dad'
        }
      ],
      [
        'conductor-final-dad',
        {
          id: 'conductor-final-dad',
          speaker: 'Conductor',
          text: 'Let us help him stop the car, at least for now.',
          contextHint: 'The train doors open, waiting.'
        }
      ]
    ])
  },
  lonely_teen: {
    id: 'train-hub-teen',
    root: 'conductor-greet-teen',
    nodes: new Map([
      [
        'conductor-greet-teen',
        {
          id: 'conductor-greet-teen',
          speaker: 'Conductor',
          text: 'Invisible at home, invisible online. Tonight we make them visible.',
          contextHint: 'The Conductor\'s expression is fierce and kind.',
          nextNode: 'gatherer-responds-teen'
        }
      ],
      [
        'gatherer-responds-teen',
        {
          id: 'gatherer-responds-teen',
          speaker: 'Gatherer',
          text: 'Messages never sent, words never spoken. We\'ll find their voice.',
          contextHint: 'The Gatherer holds draft texts and unsaid conversations.',
          nextNode: 'conductor-final-teen'
        }
      ],
      [
        'conductor-final-teen',
        {
          id: 'conductor-final-teen',
          speaker: 'Conductor',
          text: 'Then let\'s show them they matter. The night will listen.',
          contextHint: 'The train settles into readiness.'
        }
      ]
    ])
  }
};

// ============ STATION-SPECIFIC ENCOUNTERS ============

export const stationEncounters: Record<`${PassengerId}-${StationId}`, DialogueTree> = {
  // BURNT-OUT NURSE encounters
  'burntout_nurse-regret': {
    id: 'nurse-regret-encounter',
    root: 'echo-nurse-regret',
    nodes: new Map([
      [
        'echo-nurse-regret',
        {
          id: 'echo-nurse-regret',
          speaker: 'Echo (Nurse)',
          text: 'I should have said no. Should have gone home. Should have... slept.',
          contextHint: 'A phantom version of the nurse slumps on a platform bench, face illuminated by phone light.',
          choices: [
            {
              id: 'regret-compassion',
              text: 'You carried people. That\'s not a mistake.',
              nextNode: 'echo-nurse-regret-compassion',
              impactDelta: 1
            },
            {
              id: 'regret-neutral',
              text: 'Everyone makes choices they wonder about.',
              nextNode: 'echo-nurse-regret-neutral',
              impactDelta: 0
            },
            {
              id: 'regret-harsh',
              text: 'Should-haves don\'t change anything.',
              nextNode: 'echo-nurse-regret-harsh',
              impactDelta: -1
            }
          ]
        }
      ],
      [
        'echo-nurse-regret-compassion',
        {
          id: 'echo-nurse-regret-compassion',
          speaker: 'Echo (Nurse)',
          text: 'Maybe... maybe that counts for something.',
          contextHint: 'A faint glow surrounds the figure. The weight lifts slightly.'
        }
      ],
      [
        'echo-nurse-regret-neutral',
        {
          id: 'echo-nurse-regret-neutral',
          speaker: 'Echo (Nurse)',
          text: 'Yeah. I guess they do.',
          contextHint: 'The echo settles, neither lighter nor heavier.'
        }
      ],
      [
        'echo-nurse-regret-harsh',
        {
          id: 'echo-nurse-regret-harsh',
          speaker: 'Echo (Nurse)',
          text: 'So I\'m just... stuck with this.',
          contextHint: 'The echo curls tighter. The platform grows colder.'
        }
      ]
    ])
  },
  'burntout_nurse-unsent_messages': {
    id: 'nurse-unsent-encounter',
    root: 'unsent-messages-nurse',
    nodes: new Map([
      [
        'unsent-messages-nurse',
        {
          id: 'unsent-messages-nurse',
          speaker: 'Narrator',
          text: 'A draft text floats: "I\'m not okay. I need help." Never sent. Still being written.',
          contextHint: 'The message glows like a lantern, wavering in the air.',
          choices: [
            {
              id: 'unsent-send',
              text: 'Help it find its way. Send it.',
              nextNode: 'unsent-nurse-sent',
              impactDelta: 1
            },
            {
              id: 'unsent-keep',
              text: 'Keep it safe for later.',
              nextNode: 'unsent-nurse-keep',
              impactDelta: 0
            },
            {
              id: 'unsent-fade',
              text: 'Let it fade. Some things are private.',
              nextNode: 'unsent-nurse-fade',
              impactDelta: -1
            }
          ]
        }
      ],
      [
        'unsent-nurse-sent',
        {
          id: 'unsent-nurse-sent',
          speaker: 'Narrator',
          text: 'The message flickers, trembles, and becomes real. Someone will read these words.',
          contextHint: 'The lantern brightens and drifts toward the morning sky.'
        }
      ],
      [
        'unsent-nurse-keep',
        {
          id: 'unsent-nurse-keep',
          speaker: 'Narrator',
          text: 'The message is folded into the crew\'s pocket. Not lost, but not yet risked.',
          contextHint: 'The lantern settles into a pocket, still glowing faintly.'
        }
      ],
      [
        'unsent-nurse-fade',
        {
          id: 'unsent-nurse-fade',
          speaker: 'Narrator',
          text: 'The message drifts away like a forgotten dream. Private, but unspoken.',
          contextHint: 'The lantern dims and rises into darkness.'
        }
      ]
    ])
  },
  'burntout_nurse-beginning_again': {
    id: 'nurse-beginning-encounter',
    root: 'beginning-nurse',
    nodes: new Map([
      [
        'beginning-nurse',
        {
          id: 'beginning-nurse',
          speaker: 'Narrator',
          text: 'The platform is quiet. There is the smell of wet concrete and possibility. A small plant grows through a crack.',
          contextHint: 'Dawn light touches the platform. Everything is still.',
          choices: [
            {
              id: 'beginning-action',
              text: 'Leave a note: "You deserve rest. Take it."',
              nextNode: 'beginning-nurse-action',
              impactDelta: 1
            },
            {
              id: 'beginning-witness',
              text: 'Simply sit with this moment.',
              nextNode: 'beginning-nurse-witness',
              impactDelta: 0
            },
            {
              id: 'beginning-doubt',
              text: 'Nothing real changes in one night.',
              nextNode: 'beginning-nurse-doubt',
              impactDelta: -1
            }
          ]
        }
      ],
      [
        'beginning-nurse-action',
        {
          id: 'beginning-nurse-action',
          speaker: 'Narrator',
          text: 'The note is tucked where she will find it. A seed planted.',
          contextHint: 'The dawn grows brighter. Time returns to its normal pace.'
        }
      ],
      [
        'beginning-nurse-witness',
        {
          id: 'beginning-nurse-witness',
          speaker: 'Narrator',
          text: 'The crew sits in the quiet with her. Sometimes that is enough.',
          contextHint: 'The moment holds. Then releases.'
        }
      ],
      [
        'beginning-nurse-doubt',
        {
          id: 'beginning-nurse-doubt',
          speaker: 'Narrator',
          text: 'The sapling bends in an invisible wind. But it is still there.',
          contextHint: 'Dawn arrives, indifferent and cold.'
        }
      ]
    ])
  },

  // GRIEVING DAD encounters
  'grieving_dad-regret': {
    id: 'dad-regret-encounter',
    root: 'echo-dad-regret',
    nodes: new Map([
      [
        'echo-dad-regret',
        {
          id: 'echo-dad-regret',
          speaker: 'Echo (Dad)',
          text: 'If I\'d left earlier. If I\'d paid attention. If I\'d said...',
          contextHint: 'A phantom version of the dad sits in a parked car, hands on the steering wheel.',
          choices: [
            {
              id: 'dad-regret-honor',
              text: 'What you gave them while they lived—that mattered.',
              nextNode: 'dad-regret-honor',
              impactDelta: 1
            },
            {
              id: 'dad-regret-present',
              text: 'You\'re still here. That\'s what counts now.',
              nextNode: 'dad-regret-present',
              impactDelta: 0
            },
            {
              id: 'dad-regret-nothing',
              text: 'Some things can\'t be fixed.',
              nextNode: 'dad-regret-nothing',
              impactDelta: -1
            }
          ]
        }
      ],
      ['dad-regret-honor', { id: 'dad-regret-honor', speaker: 'Echo (Dad)', text: 'I... I think it did.', contextHint: 'A photo on the dashboard glows slightly.' }],
      ['dad-regret-present', { id: 'dad-regret-present', speaker: 'Echo (Dad)', text: 'Maybe. Maybe I can do something with that.', contextHint: 'The hands on the wheel loosen slightly.' }],
      ['dad-regret-nothing', { id: 'dad-regret-nothing', speaker: 'Echo (Dad)', text: 'So I drive. And drive.', contextHint: 'The car engine hums endlessly.' }]
    ])
  },
  'grieving_dad-unsent_messages': {
    id: 'dad-unsent-encounter',
    root: 'unsent-dad',
    nodes: new Map([
      [
        'unsent-dad',
        {
          id: 'unsent-dad',
          speaker: 'Narrator',
          text: 'A voicemail unsent, typed a thousand times: "I miss you. I don\'t know how to stop missing you."',
          contextHint: 'A voice message floats in the dark, never quite played.',
          choices: [
            {
              id: 'unsent-dad-send',
              text: 'Let him speak it to the night sky.',
              nextNode: 'unsent-dad-send',
              impactDelta: 1
            },
            {
              id: 'unsent-dad-archive',
              text: 'Keep it. It\'s his to hold.',
              nextNode: 'unsent-dad-archive',
              impactDelta: 0
            },
            {
              id: 'unsent-dad-silence',
              text: 'Some grief is meant to be private.',
              nextNode: 'unsent-dad-silence',
              impactDelta: -1
            }
          ]
        }
      ],
      [
        'unsent-dad-send',
        {
          id: 'unsent-dad-send',
          speaker: 'Narrator',
          text: 'His voice rises into the night. It doesn\'t change the facts, but it breaks the silence.',
          contextHint: 'The message becomes real. The night listens.'
        }
      ],
      [
        'unsent-dad-archive',
        {
          id: 'unsent-dad-archive',
          speaker: 'Narrator',
          text: 'The message is kept safe. Not forgotten, but not yet risked.',
          contextHint: 'The voice message settles into a pocket, held gently.'
        }
      ],
      [
        'unsent-dad-silence',
        {
          id: 'unsent-dad-silence',
          speaker: 'Narrator',
          text: 'The grief stays inside. Where it has lived all along.',
          contextHint: 'The message fades into static.'
        }
      ]
    ])
  },
  'grieving_dad-beginning_again': {
    id: 'dad-beginning-encounter',
    root: 'beginning-dad',
    nodes: new Map([
      [
        'beginning-dad',
        {
          id: 'beginning-dad',
          speaker: 'Narrator',
          text: 'The platform is empty. A bench. A thermos of cold tea. And the sky beginning to lighten.',
          contextHint: 'The car is parked. The engine is off. Unusual.',
          choices: [
            {
              id: 'beginning-dad-stay',
              text: 'Suggest a name spoken aloud, just once.',
              nextNode: 'beginning-dad-stay',
              impactDelta: 1
            },
            {
              id: 'beginning-dad-wait',
              text: 'Let him sit in the quiet.',
              nextNode: 'beginning-dad-wait',
              impactDelta: 0
            },
            {
              id: 'beginning-dad-drive',
              text: 'The road is waiting. As always.',
              nextNode: 'beginning-dad-drive',
              impactDelta: -1
            }
          ]
        }
      ],
      [
        'beginning-dad-stay',
        {
          id: 'beginning-dad-stay',
          speaker: 'Narrator',
          text: 'He says the name. It breaks and holds at once. A beginning.',
          contextHint: 'The dawn grows lighter. The bench is still there.'
        }
      ],
      [
        'beginning-dad-wait',
        {
          id: 'beginning-dad-wait',
          speaker: 'Narrator',
          text: 'He sits. The world does not end. Neither does he.',
          contextHint: 'The first light of morning touches his face.'
        }
      ],
      [
        'beginning-dad-drive',
        {
          id: 'beginning-dad-drive',
          speaker: 'Narrator',
          text: 'The car starts again. The road continues. As does the night in his chest.',
          contextHint: 'The headlights cut through the dawn, searching.'
        }
      ]
    ])
  },

  // LONELY TEEN encounters
  'lonely_teen-regret': {
    id: 'teen-regret-encounter',
    root: 'echo-teen-regret',
    nodes: new Map([
      [
        'echo-teen-regret',
        {
          id: 'echo-teen-regret',
          speaker: 'Echo (Teen)',
          text: 'They only notice me when I\'m broken. Or loud. Or wrong.',
          contextHint: 'A phantom version of the teen sits in a dark room, phone glowing on their face.',
          choices: [
            {
              id: 'teen-regret-seen',
              text: 'You are worthy of noticing just as you are.',
              nextNode: 'teen-regret-seen',
              impactDelta: 1
            },
            {
              id: 'teen-regret-time',
              text: 'Sometimes it takes time to find your people.',
              nextNode: 'teen-regret-time',
              impactDelta: 0
            },
            {
              id: 'teen-regret-invisible',
              text: 'Maybe invisible is safer.',
              nextNode: 'teen-regret-invisible',
              impactDelta: -1
            }
          ]
        }
      ],
      [
        'teen-regret-seen',
        {
          id: 'teen-regret-seen',
          speaker: 'Echo (Teen)',
          text: 'I... I want to believe that.',
          contextHint: 'The phone screen flickers. The room feels less empty.'
        }
      ],
      [
        'teen-regret-time',
        {
          id: 'teen-regret-time',
          speaker: 'Echo (Teen)',
          text: 'Maybe they\'re out there somewhere.',
          contextHint: 'The echo looks up from the phone, briefly.'
        }
      ],
      [
        'teen-regret-invisible',
        {
          id: 'teen-regret-invisible',
          speaker: 'Echo (Teen)',
          text: 'Yeah. It is.',
          contextHint: 'The light from the phone becomes the only light.'
        }
      ]
    ])
  },
  'lonely_teen-unsent_messages': {
    id: 'teen-unsent-encounter',
    root: 'unsent-teen',
    nodes: new Map([
      [
        'unsent-teen',
        {
          id: 'unsent-teen',
          speaker: 'Narrator',
          text: 'A message typed fifty times, deleted each time: "Hey. Want to hang?"',
          contextHint: 'The draft text hovers on a dark screen, cursor blinking.',
          choices: [
            {
              id: 'unsent-teen-send',
              text: 'Help them send it. Someone is waiting to say yes.',
              nextNode: 'unsent-teen-send',
              impactDelta: 1
            },
            {
              id: 'unsent-teen-save',
              text: 'Save the draft. They\'ll be ready when it\'s time.',
              nextNode: 'unsent-teen-save',
              impactDelta: 0
            },
            {
              id: 'unsent-teen-delete',
              text: 'Delete it. Rejection is worse than loneliness.',
              nextNode: 'unsent-teen-delete',
              impactDelta: -1
            }
          ]
        }
      ],
      [
        'unsent-teen-send',
        {
          id: 'unsent-teen-send',
          speaker: 'Narrator',
          text: 'The message is sent. The night holds its breath. A reply glows back: "Yeah, actually..."',
          contextHint: 'The phone screen fills with possibility.'
        }
      ],
      [
        'unsent-teen-save',
        {
          id: 'unsent-teen-save',
          speaker: 'Narrator',
          text: 'The draft is kept safe. When they\'re ready, the words will be there.',
          contextHint: 'The message is filed, not forgotten.'
        }
      ],
      [
        'unsent-teen-delete',
        {
          id: 'unsent-teen-delete',
          speaker: 'Narrator',
          text: 'The message is gone. The phone glows with lonelier light.',
          contextHint: 'The screen goes dark.'
        }
      ]
    ])
  },
  'lonely_teen-beginning_again': {
    id: 'teen-beginning-encounter',
    root: 'beginning-teen',
    nodes: new Map([
      [
        'beginning-teen',
        {
          id: 'beginning-teen',
          speaker: 'Narrator',
          text: 'The school hallway is empty. Sunlight through the windows. A club meeting board on the wall.',
          contextHint: 'The morning is quiet. A moment of possibility.',
          choices: [
            {
              id: 'beginning-teen-join',
              text: 'Leave a note about the art club. They belong there.',
              nextNode: 'beginning-teen-join',
              impactDelta: 1
            },
            {
              id: 'beginning-teen-smile',
              text: 'Let them know someone saw them.',
              nextNode: 'beginning-teen-smile',
              impactDelta: 0
            },
            {
              id: 'beginning-teen-wait',
              text: 'They\'ll find their way eventually.',
              nextNode: 'beginning-teen-wait',
              impactDelta: -1
            }
          ]
        }
      ],
      [
        'beginning-teen-join',
        {
          id: 'beginning-teen-join',
          speaker: 'Narrator',
          text: 'The note is tucked into a locker. A seed of belonging planted.',
          contextHint: 'The hallway feels less empty. A person walks through it with their head up.'
        }
      ],
      [
        'beginning-teen-smile',
        {
          id: 'beginning-teen-smile',
          speaker: 'Narrator',
          text: 'They feel it—a moment of being noticed. Really noticed.',
          contextHint: 'The morning becomes a little warmer.'
        }
      ],
      [
        'beginning-teen-wait',
        {
          id: 'beginning-teen-wait',
          speaker: 'Narrator',
          text: 'The hallway empties again. They walk it alone, as always.',
          contextHint: 'The bell rings. Time continues.'
        }
      ]
    ])
  }
};

// ============ NPC ARCHETYPES FOR STATIONS ============

export type NPCType =
  | 'echo'
  | 'phantom_coworker'
  | 'waiting_room_figure'
  | 'unsent_message'
  | 'memory_fragment'
  | 'internal_voice'
  | 'stranger';

export interface NPCTemplate {
  type: NPCType;
  name: string;
  description: string;
  interactionHint: string;
}

export const npcTypes: Record<NPCType, NPCTemplate> = {
  echo: {
    type: 'echo',
    name: 'Echo',
    description: 'A fragment of the passenger\'s consciousness, reflected back.',
    interactionHint: 'Speak to their deepest fear or desire.'
  },
  phantom_coworker: {
    type: 'phantom_coworker',
    name: 'Phantom Colleague',
    description: 'A coworker from their daytime life, appearing in the surreal station.',
    interactionHint: 'They know things, but speak in riddles.'
  },
  waiting_room_figure: {
    type: 'waiting_room_figure',
    name: 'Figure on a Bench',
    description: 'A stranger who is somehow deeply familiar.',
    interactionHint: 'They may be a past version of the passenger.'
  },
  unsent_message: {
    type: 'unsent_message',
    name: 'Message',
    description: 'A floating, semi-corporeal message or email.',
    interactionHint: 'Interact to read, send, or release it.'
  },
  memory_fragment: {
    type: 'memory_fragment',
    name: 'Memory',
    description: 'A scene or moment that keeps replaying.',
    interactionHint: 'You can rewrite it or let it play out.'
  },
  internal_voice: {
    type: 'internal_voice',
    name: 'The Voice',
    description: 'The passenger\'s inner critic or false belief.',
    interactionHint: 'Challenge it or acknowledge it.'
  },
  stranger: {
    type: 'stranger',
    name: 'Stranger',
    description: 'Someone encountered on the platform, seemingly unrelated.',
    interactionHint: 'Their story may mirror the passenger\'s in subtle ways.'
  }
};

// ============ UTILITY FUNCTIONS ============

export function getDialogueTree(passengerId: PassengerId, context: 'train_hub' | `station-${StationId}`): DialogueTree | null {
  if (context === 'train_hub') {
    return trainHubDialogue[passengerId] || null;
  }
  const stationId = context.replace('station-', '') as StationId;
  const key = `${passengerId}-${stationId}` as const;
  return stationEncounters[key] || null;
}

export function getDialogueNode(tree: DialogueTree, nodeId: DialogueNodeId): DialogueNode | null {
  return tree.nodes.get(nodeId) || null;
}
