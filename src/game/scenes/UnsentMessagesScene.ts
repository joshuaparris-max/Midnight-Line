import { BaseScene } from "../Scene";
import { Game } from "../Game";
import { unsentMessagesEncounter } from "../../data/dialogue";
import { EpilogueScene } from "./EpilogueScene";

export class UnsentMessagesScene extends BaseScene {
  id = 'unsent-messages';
  private container?: HTMLElement;
  private handled = 0;

  constructor(game: Game){ super(game); }

  enter(){
    this.game.registerScene(new EpilogueScene(this.game));
    this.render();
  }

  render(){
    this.cleanup();
    const root = document.createElement('div'); root.className='scene-bg';
    const bg = document.createElement('div'); bg.style.cssText = 'position:absolute;inset:0;background:linear-gradient(180deg,#061118,#081726)';
    root.appendChild(bg);

    // floating messages
    const m1 = document.createElement('div'); m1.className='floating-msg'; m1.style.left='120px'; m1.style.top='120px'; m1.textContent='Draft: "I tried to..."';
    const m2 = document.createElement('div'); m2.className='floating-msg'; m2.style.left='520px'; m2.style.top='220px'; m2.textContent='Draft: "We should talk"';
    root.appendChild(m1); root.appendChild(m2);

    m1.addEventListener('click', async ()=>{ if(this.handled>1) return; this.handled++; await this.game.ui.presentChoices(unsentMessagesEncounter.prompt, unsentMessagesEncounter.choices.map(c=>({text:c.text, delta:c.delta}))); this.checkDone(); });
    m2.addEventListener('click', async ()=>{ if(this.handled>1) return; this.handled++; await this.game.ui.presentChoices(unsentMessagesEncounter.prompt, unsentMessagesEncounter.choices.map(c=>({text:c.text, delta:c.delta}))); this.checkDone(); });

    const echo = document.createElement('div'); echo.className='npc'; echo.style.left='360px'; echo.style.bottom='120px'; echo.textContent='echo'; root.appendChild(echo);
    echo.addEventListener('click', async ()=>{ await this.game.ui.showMessage('Echo: unsent words orbit like moths.'); });

    this.game.root.appendChild(root);
    this.container = root;
    this.game.ui.setSceneName('Unsent Messages');
    this.game.ui.refresh();
  }

  private checkDone(){
    if(this.handled >= 2){
      // small delay then to epilogue
      setTimeout(()=> this.game.changeScene('epilogue'), 600);
    }
  }

  update(dt:number){}
  exit(){ this.cleanup(); }
  cleanup(){ if(this.container){ this.container.remove(); this.container=undefined; } }
}
