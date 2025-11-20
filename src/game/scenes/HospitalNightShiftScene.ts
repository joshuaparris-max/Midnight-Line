import { BaseScene } from "../Scene";
import { Game } from "../Game";
import { hospitalEncounter } from "../../data/dialogue";
import { UnsentMessagesScene } from "./UnsentMessagesScene";

export class HospitalNightShiftScene extends BaseScene {
  id = 'hospital-night';
  private container?: HTMLElement;
  private interacted = false;

  constructor(game: Game){ super(game); }

  enter(){
    // register next scene
    this.game.registerScene(new UnsentMessagesScene(this.game));
    this.render();
  }

  render(){
    this.cleanup();
    const root = document.createElement('div'); root.className = 'scene-bg';
    // styled background
    const bg = document.createElement('div'); bg.style.cssText = 'position:absolute;inset:0;background:linear-gradient(180deg,#08101a,#07111c)';
    root.appendChild(bg);

    const floor = document.createElement('div'); floor.className = 'strip'; floor.style.bottom = '80px';
    root.appendChild(floor);

    const echo = document.createElement('div'); echo.className = 'npc interactable'; echo.style.left='380px'; echo.id='echo';
    floor.appendChild(echo);

    const coffee = document.createElement('div'); coffee.className = 'npc interactable'; coffee.style.left='160px'; coffee.id='coffee'; coffee.style.background = '#6b4f3e';
    floor.appendChild(coffee);

    const panel = document.createElement('div'); panel.className='center-panel';
    const next = document.createElement('div'); next.className='button'; next.textContent='Go to Unsent Messages';
    next.onclick = ()=>{ this.game.changeScene('unsent-messages'); };
    panel.appendChild(next);
    root.appendChild(panel);

    echo.addEventListener('click', async ()=>{
      if(this.interacted) return;
      this.interacted = true;
      await this.game.ui.presentChoices(hospitalEncounter.prompt, hospitalEncounter.choices.map(c=>({text:c.text, delta:c.delta})));
    });

    coffee.addEventListener('click', async ()=>{
      await this.game.ui.showMessage('A cold coffee and a sticky cup. The echo looks at it and sighs.');
    });

    this.game.root.appendChild(root);
    this.container = root;
    this.game.ui.setSceneName('Hospital Night Shift');
    this.game.ui.refresh();
  }

  update(dt: number){}
  exit(){ this.cleanup(); }
  cleanup(){ if(this.container){ this.container.remove(); this.container=undefined; } }
}
