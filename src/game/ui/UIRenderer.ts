import { Game } from "../Game";
import { labelFor } from "../state/HeartState";

export class UIRenderer {
  private game: Game;
  private hudEl: HTMLElement;
  private hintEl: HTMLElement;
  private overlayEl: HTMLElement | null = null;
  private sceneName = "";

  constructor(game: Game){
    this.game = game;
    this.hudEl = document.createElement("div");
    this.hudEl.className = "hud";
    this.hudEl.innerHTML = `<div class="scene-name"></div><div class="heart"></div>`;
    this.hintEl = document.createElement("div");
    this.hintEl.className = "hint";
    this.hintEl.textContent = "Move: ← →  Interact: Enter / Space  Choose: 1/2";
    this.game.root.appendChild(this.hudEl);
    this.game.root.appendChild(this.hintEl);
    this.update();
  }

  setSceneName(name: string){ this.sceneName = name; this.update(); }

  private update(){
    const sceneNameEl = this.hudEl.querySelector(".scene-name")!;
    const heartEl = this.hudEl.querySelector(".heart")!;
    sceneNameEl.textContent = `Scene: ${this.sceneName}`;
    heartEl.textContent = `Heart: ${labelFor(this.game.runState.getHeartState())} (${this.game.runState.score})`;
  }

  refresh(){ this.update(); }

  showOverlay(content: HTMLElement){
    if(this.overlayEl) this.hideOverlay();
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.appendChild(content);
    this.overlayEl = overlay;
    this.game.root.appendChild(overlay);
  }

  hideOverlay(){
    if(!this.overlayEl) return;
    this.overlayEl.remove();
    this.overlayEl = null;
  }

  async presentChoices(prompt: string, choices: {text:string, delta:number}[]): Promise<number>{
    return new Promise((resolve)=>{
      const box = document.createElement("div");
      box.className = "dialogue";
      const p = document.createElement("div");
      p.textContent = prompt;
      box.appendChild(p);
      const choicesDiv = document.createElement("div");
      choicesDiv.className = "choices";
      choices.forEach((c, idx)=>{
        const b = document.createElement("div");
        b.className = "choice";
        b.textContent = `${idx+1}. ${c.text}`;
        b.addEventListener('click', ()=>{ cleanup(idx); });
        choicesDiv.appendChild(b);
      });
      box.appendChild(choicesDiv);

      const onKey = (e: KeyboardEvent) =>{
        if(e.key >= '1' && e.key <= String(choices.length)){
          const idx = Number(e.key) - 1; cleanup(idx);
        }
      };

      const cleanup = (idx:number)=>{
        window.removeEventListener('keydown', onKey);
        this.hideOverlay();
        // apply delta
        const delta = choices[idx]?.delta || 0;
        this.game.runState.changeHeart(delta);
        this.refresh();
        resolve(idx);
      };

      window.addEventListener('keydown', onKey);
      this.showOverlay(box);
    });
  }

  async showMessage(text: string, buttonText = "Continue"): Promise<void>{
    return new Promise((resolve)=>{
      const box = document.createElement('div'); box.className = 'dialogue';
      const p = document.createElement('div'); p.textContent = text; box.appendChild(p);
      const btn = document.createElement('div'); btn.className = 'button'; btn.textContent = buttonText;
      btn.addEventListener('click', ()=>{ this.hideOverlay(); resolve(); });
      box.appendChild(btn);
      this.showOverlay(box);
    });
  }
}
