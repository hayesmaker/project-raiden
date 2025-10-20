import {Container, Graphics} from "pixi.js";
import gsap from "gsap";
import {getScaleRatio4x3} from "./utils/helpers.js";

class Scene extends Container {

  set startX(value) {
    this._startX = value;
  }

  set startY(value) {
    this._startY = value;
  }

  get startX() {
    return this._startX || 0;
  }

  get startY() {
    return this._startY || 0;
  }

  constructor({
    startX = 0,
    startY = 0,
  } = {}) {
    super();
    this.startX = startX;
    this.startY = startY;
    this.label = 'Scene';
    this.initBg();
    this.tl = gsap.timeline({paused: true});
    // return this;
    // this.transitionIn();

  }

  initBg() {
    console.log(`${this.label} init`);
    const graphics = new Graphics();
    graphics.label = 'bg';
    graphics.rect(0, 0, 640, 480)
    graphics.fill({ color: 0x000000, alpha: 1})
    this.addChild(graphics);

    const scaleFactor = getScaleRatio4x3({height: 480});
    graphics.scale.x = scaleFactor;
    graphics.scale.y = scaleFactor;

    this.y = this.startY;
    this.x = this.startX;
  }

  initTransitionIn({ animOptions = {y: 0} } = {}) {
    this.tl.to(this, {
      delay: 1,
      duration: 1,
      ease: "power2.out",
      ...animOptions,
    });
  }

  executeTimeline() {
    this.tl.play();
  }

}

export default Scene;