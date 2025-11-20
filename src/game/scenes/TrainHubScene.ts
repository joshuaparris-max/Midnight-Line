import { BaseScene } from "../Scene";
import { Game } from "../Game";
import { HospitalNightShiftScene } from "./HospitalNightShiftScene";

export class TrainHubScene extends BaseScene {
  id = "train-hub";
  private container?: HTMLElement;
  private conductorX = 60; // px from left
  private speed = 160; // px/s
  private left = false; private right = false;
  constructor(game: Game){ super(game); }

  enter(){
    // register next scenes
    this.game.registerScene(new HospitalNightShiftScene(this.game));
    // ensure UnsentMessages registered lazily by hospital scene
    this.render();
  }

  render(){
    this.cleanup();
    const root = document.createElement('div');
    root.className = 'scene-bg';

    const strip = document.createElement('div'); strip.className = 'strip';
    root.appendChild(strip);

    const conductor = document.createElement('div'); conductor.className = 'conductor';
    conductor.style.left = `${this.conductorX}px`; conductor.id = 'conductor';
    strip.appendChild(conductor);

    // Gatherer NPC
    const gatherer = document.createElement('div'); gatherer.className = 'npc';
    gatherer.style.left = '320px'; gatherer.id = 'gatherer';
    strip.appendChild(gatherer);

    // Depart button
    const panel = document.createElement('div'); panel.className = 'center-panel';
    const depart = document.createElement('div'); depart.className='button'; depart.textContent='Depart for Hospital Night Shift';
    depart.onclick = ()=>{ this.game.changeScene('hospital-night'); };
    panel.appendChild(depart);
    root.appendChild(panel);

    // short gatherer interaction
    gatherer.addEventListener('click', async ()=>{
      await this.game.ui.showMessage('Gatherer: Quiet tonight. The creaks have stories.');
    });

    this.game.root.appendChild(root);
    this.container = root;
    this.game.ui.setSceneName('Train Hub');
    this.game.ui.refresh();
  }

  update(dt: number){
    if(this.left) this.conductorX -= this.speed * dt;
    if(this.right) this.conductorX += this.speed * dt;
    this.conductorX = Math.max(10, Math.min(740, this.conductorX));
    const el = document.getElementById('conductor'); if(el) el.style.left = `${this.conductorX}px`;
  }

  handleKeyDown(e: KeyboardEvent){
    if(e.key === 'ArrowLeft' || e.key === 'a') this.left = true;
    if(e.key === 'ArrowRight' || e.key === 'd') this.right = true;
    if(e.key === 'Enter' || e.key === ' '){
      // check proximity to gatherer
      const dist = Math.abs(this.conductorX - 320);
      if(dist < 60) this.game.ui.showMessage('Gatherer: You doing okay?');
    }
  }

  handleKeyUp(e: KeyboardEvent){ if(e.key === 'ArrowLeft' || e.key === 'a') this.left=false; if(e.key === 'ArrowRight' || e.key === 'd') this.right=false; }

  exit(){ this.cleanup(); }

  cleanup(){ if(this.container) { this.container.remove(); this.container = undefined; } }
}
