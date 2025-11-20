import { Game } from "./game/Game";
import { TitleScene } from "./game/scenes/TitleScene";

const root = document.getElementById("game")!;

const game = new Game(root);

// Register scenes
game.registerScene(new TitleScene(game));
// other scenes will be lazy-registered by Title/TrainHub via Game.registerScene when constructed

game.start();
