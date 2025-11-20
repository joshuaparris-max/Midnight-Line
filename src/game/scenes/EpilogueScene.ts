import { BaseScene } from "../Scene";
import { Game } from "../Game";
import { HeartState, labelFor } from "../state/HeartState";

export class EpilogueScene extends BaseScene {
  id = 'epilogue';
  private container?: HTMLElement;

  constructor(game: Game){ super(game); }

  enter(){ this.render(); }

  render(){
    this.cleanup();
    const root = document.createElement('div'); root.className='scene-bg';
    const dawn = document.createElement('div'); dawn.style.cssText = 'position:absolute;inset:0;background:linear-gradient(180deg,#0b1526,#f6ecd6 90%)'; root.appendChild(dawn);

    const panel = document.createElement('div'); panel.className='center-panel';
    const state = this.game.runState.getHeartState();
    let text = '';
    if(state >= HeartState.OPEN){
      text = `Epilogue — ${labelFor(state)}\nThe nurse drafts one more message, then breathes and hits SEND: "Hey, I'm not okay. Can we talk?"`;
    } else {
      text = `Epilogue — ${labelFor(state)}\nThe nurse opens the draft, types a sentence, then closes the app. The message waits, unsent, but her fingers pressed nearer to the keys.`;
    }
    const p = document.createElement('div'); p.textContent = text; panel.appendChild(p);
    const restart = document.createElement('div'); restart.className='button'; restart.textContent='Back to Title'; restart.onclick = ()=>{ this.game.changeScene('title'); };
    panel.appendChild(restart);
    root.appendChild(panel);

    this.game.root.appendChild(root);
    this.container = root;
    this.game.ui.setSceneName('Epilogue');
    this.game.ui.refresh();
  }

  exit(){ this.cleanup(); }
  cleanup(){ if(this.container){ this.container.remove(); this.container=undefined; } }
}
