import './style.css'
import { Application } from "pixi.js";
import { Game } from "./Game";
import Config from "./Config.js";
import * as PIXI from "pixi.js";

const app = new Application();

await PIXI.Assets.load(Config.assets);

await app.init(Config.canvas);

globalThis.__PIXI_APP__ = app;

document.body.appendChild(app.canvas);

const game = new Game(app, Config);

app.stage.addChild(game);