export type Choice = { id?:string; text: string; delta: number };

export const hospitalEncounter = {
  prompt: "You find an echo of a nurse, hunched over a chart. What do you say?",
  choices: [
    { text: "Offer a small, honest kindness.", delta: 1 },
    { text: "Make a joke and move on.", delta: 0 },
    { text: "Dismiss their tiredness (avoid).", delta: -1 }
  ] as Choice[]
};

export const unsentMessagesEncounter = {
  prompt: "There are unsent messages floating — one looks like a draft to someone important.",
  choices: [
    { text: "Encourage sending: gentle nudge.", delta: 1 },
    { text: "Read through and keep it private.", delta: 0 },
    { text: "Tell them it's better not to send.", delta: -1 }
  ] as Choice[]
};
