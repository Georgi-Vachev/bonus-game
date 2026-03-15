import './style.css'
import { Application } from "pixi.js";

const app = new Application();

await app.init({
  width: 800,
  height: 600,
  background: "#423d3d"
});

globalThis.__PIXI_APP__ = app;
document.body.appendChild(app.canvas);