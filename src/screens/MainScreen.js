import { Container, Text } from "pixi.js";
import { Chest } from "../components/Chest";
import { PlayButton } from "../components/PlayButton";
import gsap from "gsap";

export class MainScreen extends Container {
  constructor(app, config, game) {
    super();

    this.app = app;
    this.config = config;
    this.game = game;

    this._createTotalText();
    this._createPlayButton();

    this.createChests();
  }

  createChests() {
    const { chestRows, chestCols, chestsAreaHeightRatio, chestOffSetY } = this.config.layout;

    const width = this.app.screen.width;
    const height = this.app.screen.height * chestsAreaHeightRatio;

    const cellWidth = width / chestCols;
    const cellHeight = height / chestRows;

    this.chests = [];

    for (let i = 0; i < this.config.game.chestCount; i++) {
      const chest = new Chest(this.app, this.config, () => {
        this.game.chestClicked(chest);
      });

      const row = Math.floor(i / chestCols);
      const col = i % chestCols;

      chest.position.set(
        cellWidth * col + cellWidth / 2,
        cellHeight * row + cellHeight / 2 + chestOffSetY
      );

      this.chests.push(chest);
      this.addChild(chest);
    }
  }

  enablePlay(enabled) {
    this.playButton.setEnabled(enabled);
  }

  enableChests(enabled) {
    this.chests.filter(c => !c.opened).forEach(c => c.setEnabled(enabled));
  }

  updateTotalWin(amount) {
    this.totalText.text = `Total Win: ${amount}`;
  }

  animateTotalWin(onComplete) {
    const { totalWinStartTween, totalWinEndTween } = this.config.main;

    gsap.to(this.totalText.scale, {
      ...totalWinStartTween,
      onComplete: () => {
        gsap.to(this.totalText.scale, {
          ...totalWinEndTween
        });

        if (onComplete) onComplete();
      }
    });
  }

  reset() {
    this.chests.forEach(c => c.reset());
    this.totalText.scale.set(1);
  }

  _createTotalText() {
    const { totalWinText } = this.config.main;
    const width = this.app.screen.width;
    const height = this.app.screen.height;

    this.totalText = new Text("Total Win: 0", {
      fontSize: totalWinText.fontSize,
      fill: totalWinText.fill,
      align: totalWinText.align
    });

    this.totalText.anchor.set(0.5);
    this.totalText.position.set(width / 2, height / 2);

    this.addChild(this.totalText);
  }

  _createPlayButton() {
    this.playButton = new PlayButton(this.app, this.config, () => {
      this.game.startGame();
    });

    this.playButton.position.set(this.app.screen.width / 2, this.app.screen.height * 0.9);

    this.addChild(this.playButton);
  }
}