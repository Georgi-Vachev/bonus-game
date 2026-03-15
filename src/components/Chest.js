import { Sprite, Texture } from "pixi.js";
import gsap from "gsap";

export class Chest extends Sprite {
  constructor(app, config, onClick) {
    const texture = Texture.from("chest_closed");
    super(texture);

    this.app = app;
    this.config = config;
    this.onClick = onClick;

    this.anchor.set(0.5);

    this.opened = false;
    this.enabled = false;

    this.eventMode = "static";
    this.cursor = "pointer";

    this.applySize();

    this.on("pointerdown", () => {
      if (!this.enabled || this.opened) return;
      this.onClick();
    });
  }

  applySize() {
    const desiredW = this.config.chest.width;
    const desiredH = this.config.chest.height;

    const texW = this.texture.width;
    const texH = this.texture.height;

    this.scale.set(
      desiredW / texW,
      desiredH / texH
    );
  }

  setEnabled(enabled) {
    this.interactive = enabled;
    this.enabled = enabled;
    this.alpha = enabled ? 1 : 0.5;
  }

  setTexture(alias) {
    this.texture = Texture.from(alias);
    this.applySize();
  }

  reset() {
    this.setTexture("chest_closed");
    this.opened = false;
  }

  async open(result, onComplete) {
    const textureAlias = this.config.chest.resultToImage[result];

    this.setTexture(textureAlias);
    this.opened = true;

    const anim = this.config.chest.animations[result];

    const tween = gsap.to(this.scale, {
      x: this.scale.x * anim.scale,
      y: this.scale.y * anim.scale,
      duration: anim.duration,
      repeat: anim.repeat,
      yoyo: true
    });

    await tween;

    this.applySize();

    onComplete();
  }
}