import { Container, Text, Graphics } from "pixi.js";

export class PlayButton extends Container {
  constructor(app, config, onClick) {
    super();

    this.config = config;

    const width = app.screen.width * config.playButton.widthRatio;
    const height = app.screen.height * config.playButton.heightRatio;

    this.bg = new Graphics();
    this.bg.rect(-width / 2, -height / 2, width, height, 10);
    this.bg.fill(config.playButton.color);

    this.label = new Text("PLAY", {
      fill: "white",
      fontSize: height * 0.5
    });

    this.label.anchor.set(0.5);

    this.addChild(this.bg, this.label);

    this.eventMode = "static";
    this.cursor = "pointer";

    this.on("pointerdown", () => {
      if (!this.enabled) return;
      onClick();
    });
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    this.alpha = enabled ? 1 : 0.5;
  }
}