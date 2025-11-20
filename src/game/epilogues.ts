import { PassengerId } from './passengers';

export interface EpilogueResult { title: string; body: string }

const EPILOGUES: Record<PassengerId, { low: EpilogueResult; mid: EpilogueResult; high: EpilogueResult }> = {
  burntout_nurse: {
    low: {
      title: 'A Quiet Shift',
      body: 'The morning finds them lingering by the nurses\' station, fingers tracing a mug. They do not fix everything today, but they notice a hand offered by a colleague—an almost apology, an almost ally.'
    },
    mid: {
      title: 'A Small Ask',
      body: 'A text is typed and saved as a draft, then sent: "I need a day off. Can we talk?" It is not dramatic, but someone answers. The shift that follows is a little softer.'
    },
    high: {
      title: 'First Time Letting Support In',
      body: 'They stand in the staff room and say, quietly, "I can\'t keep doing this alone." A manager listens. An appointment is pencilled into a desktop calendar — a beginning, modest and real.'
    }
  },
  grieving_dad: {
    low: {
      title: 'Roads Still Long',
      body: 'He keeps driving for a few more nights. Once, he parks by the water and stares at reflected lights. Nothing changes overnight, but the drive feels slightly less empty.'
    },
    mid: {
      title: 'A Call That Was Made',
      body: 'He calls an old friend and says the name out loud. The conversation is awkward and clumsy, but it is held — and the next morning the map on his phone has one fewer route circled.'
    },
    high: {
      title: 'Stopping the Car',
      body: 'On a morning drive, he keeps his foot off the gas and parks. He buys a cup of tea instead of more petrol. He sits on a bench and lets a sunrise happen while it happens.'
    }
  },
  lonely_teen: {
    low: {
      title: 'The Quiet Room',
      body: 'At school, they sit in a different chair in the cafeteria. No thunderous change follows, but a classmate offers a spare pen and a small smile.'
    },
    mid: {
      title: 'A Message Sent',
      body: 'They send a short message to someone they barely know: "Hey, want to hang?" The reply is awkward but real. It becomes a place to try again.'
    },
    high: {
      title: 'A Visible Step',
      body: 'They join a small club and show up the next week. There is nothing cinematic — just attendance and a face that starts to look more familiar.'
    }
  }
};

export function getEpilogue(passengerId: PassengerId, impactScore: number): EpilogueResult {
  const band = impactScore >= 2 ? 'high' : impactScore >= 0 ? 'mid' : 'low';
  const p = EPILOGUES[passengerId];
  return p[band as 'low' | 'mid' | 'high'];
}
