import { BaseScene } from "../Scene";
import { Game } from "../Game";
import { TrainHubScene } from "./TrainHubScene";

export class TitleScene extends BaseScene {
  id = "title";
  private container?: HTMLElement;
  constructor(game: Game){ super(game); }

  enter(): void {
    // ensure TrainHubScene is registered lazily
    this.game.registerScene(new TrainHubScene(this.game));
  }

  render(): void {
    this.cleanup();
    const c = document.createElement('div');
    c.className = 'center-panel';
    c.innerHTML = `<h1>The Midnight Line</h1><p>A short vertical slice — one night.</p>`;
    const start = document.createElement('div'); start.className='button'; start.textContent='Start New Run';
    start.onclick = ()=>{ this.game.changeScene('train-hub'); };
    c.appendChild(start);
    this.game.root.appendChild(c);
    this.container = c;
    this.game.ui.setSceneName('Title');
    this.game.ui.refresh();
  }

  exit(): void{ this.cleanup(); }

  cleanup(){ if(this.container) { this.container.remove(); this.container = undefined; } }
}
