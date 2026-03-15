import { Container } from "pixi.js";
import { MainScreen } from "./screens/MainScreen";
import { BonusScreen } from "./screens/BonusScreen";
import { randomChoice, randomInt } from "./utils";

export const STATES = {
  IDLE: "idle",
  PLAYING: "playing",
  OPENING: "opening",
};

export class Game extends Container {
  constructor(app, config) {
    super();

    this.app = app;
    this.config = config;
    this.state = STATES.IDLE;
    this.totalWin = 0;

    this.openedChests = 0;

    this.mainScreen = new MainScreen(app, config, this);
    this.bonusScreen = new BonusScreen(app, config, this);

    this.addChild(this.mainScreen, this.bonusScreen);

    this.showMain();

    this.setState(STATES.IDLE);
  }

  showMain() {
    this.mainScreen.visible = true;
    this.bonusScreen.visible = false;
  }

  showBonus(amount) {
    this.mainScreen.visible = false;
    this.bonusScreen.visible = true;

    this.bonusScreen.play(amount, () => {
      this.showMain();
      this.setState(STATES.OPENING);
    });
  }

  setState(state) {
    this.state = state;

    switch (state) {
    case STATES.IDLE:
      this.openedChests = 0;
      this.totalWin = 0;
      this.mainScreen.updateTotalWin(this.totalWin);
      this.mainScreen.reset();
      this.mainScreen.enablePlay(true);
      this.mainScreen.enableChests(false);
      break;

    case STATES.PLAYING:
      this.mainScreen.enablePlay(false);
      this.mainScreen.enableChests(true);
      break;

    case STATES.OPENING:
      if (this.openedChests >= this.config.game.chestCount) {
        this.setState(STATES.IDLE);
      } else {
        this.mainScreen.enableChests(true);
      }

      break;
    }
  }

  startGame() {
    if (this.state !== STATES.IDLE) return;
    this.setState(STATES.PLAYING);
  }

  chestClicked(chest) {
    if (this.state !== STATES.PLAYING && this.state !== STATES.OPENING) return;

    this.setState(STATES.OPENING);
    this.mainScreen.enableChests(false);

    const result = randomChoice(["lose", "win", "bonus"]);

    chest.open(result, () => {
      this.openedChests++;

      if (result === "win") {
        const amount = randomInt(this.config.game.winAmountScope);

        this.totalWin += amount;
        this.mainScreen.updateTotalWin(this.totalWin);
      }

      if (result === "bonus") {
        const amount = randomInt(this.config.game.bonusAmountScope);

        this.totalWin += amount;
        this.mainScreen.updateTotalWin(this.totalWin);

        this.showBonus(amount);

        return;
      }

      if (this.openedChests >= this.config.game.chestCount) {
        this.mainScreen.animateTotalWin(() => {
          this.setState(STATES.IDLE);
        });
      } else {
        this.setState(STATES.OPENING);
      }
    });
  }
}