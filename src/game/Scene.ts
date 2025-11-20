import { Game } from "./Game";

export interface Scene {
  id: string;
  enter(): void;
  exit(): void;
  update(dt: number): void;
  render(): void;
  handleKeyDown?(e: KeyboardEvent): void;
  handleKeyUp?(e: KeyboardEvent): void;
}

export abstract class BaseScene implements Scene {
  id = "base";
  protected game: Game;
  constructor(game: Game){ this.game = game }
  enter(): void {}
  exit(): void {}
  update(dt: number): void {}
  render(): void {}
}
