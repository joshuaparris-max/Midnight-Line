import { Scene } from "./Scene";
import { UIRenderer } from "./ui/UIRenderer";
import { RunState } from "./state/RunState";

export class Game {
  root: HTMLElement;
  private scenes = new Map<string, Scene>();
  private currentScene: Scene | null = null;
  public ui: UIRenderer;
  public runState: RunState;

  private lastTs = 0;

  constructor(root: HTMLElement){
    this.root = root;
    this.ui = new UIRenderer(this);
    this.runState = new RunState();

    window.addEventListener("keydown", (e)=>{
      if(this.currentScene && (this.currentScene as any).handleKeyDown) (this.currentScene as any).handleKeyDown(e);
    });
    window.addEventListener("keyup", (e)=>{
      if(this.currentScene && (this.currentScene as any).handleKeyUp) (this.currentScene as any).handleKeyUp(e);
    });
  }

  registerScene(scene: Scene){
    this.scenes.set(scene.id, scene);
  }

  changeScene(id: string){
    const next = this.scenes.get(id);
    if(!next) throw new Error(`Scene ${id} not found`);
    if(this.currentScene) this.currentScene.exit();
    this.currentScene = next;
    this.currentScene.enter();
    this.ui.setSceneName(this.currentScene.id);
    this.currentScene.render();
  }

  start(){
    this.lastTs = performance.now();
    // Start with title if exists
    if(this.scenes.has("title")) this.changeScene("title");
    requestAnimationFrame(this.loop.bind(this));
  }

  private loop(ts: number){
    const dt = (ts - this.lastTs) / 1000;
    this.lastTs = ts;
    if(this.currentScene) this.currentScene.update(dt);
    requestAnimationFrame(this.loop.bind(this));
  }
}
