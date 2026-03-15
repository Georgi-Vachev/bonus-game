import { Container, Text } from "pixi.js";
import gsap from "gsap";

export class BonusScreen extends Container {

  constructor(app, config) {
    super();

    this.app = app;
    this.config = config;

    const width = app.screen.width;
    const height = app.screen.height;

    this.label = new Text("",
      this.config.bonus.label
    );

    this.label.anchor.set(0.5);
    this.label.position.set(width / 2, height / 2);

    this.addChild(this.label);

    this.visible = false;
  }

  play(amount, onComplete) {
    this.label.text = `BONUS WIN AMOUNT $${amount}`;
    this.label.scale.set(0);

    gsap.to(this.label.scale, {
      ...this.config.bonus.tween,
      onComplete
    });
  }
}