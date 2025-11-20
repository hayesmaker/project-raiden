import { Sprite, Text } from "pixi.js";

import Scene from "./Scene.js";
import { CONSTS } from "./consts.js";

class Titles extends Scene {
  constructor(props) {
    super(props);
    this.label = 'SceneTitles';
    // this.initText();
    this.initGfx();
    this.initText();
  }

  initGfx() {
    const x1 = 330;
    const x2 = 740;
    const y1 = 490;
    const y2 = 650;

    const spriteSickle = Sprite.from("raid-hammer");
    spriteSickle.anchor.set(0.5);
    this.addChild(spriteSickle);
    spriteSickle.label = 'logo-sickle';
    spriteSickle.x = 1440/2;
    spriteSickle.y = y1 - 100;

    // const texture = Assets.load("overlay-guide");
    // const sprite = new Sprite();
    const spriteRaid = Sprite.from("logo-raid");
    spriteRaid.anchor.set(0);
    this.addChild(spriteRaid);
    spriteRaid.label = 'logo-raid';
    spriteRaid.x = x1;
    spriteRaid.y = y1;

    const spriteOver = Sprite.from("logo-over");
    // sprite.texture = texture;
    spriteOver.anchor.set(0);
    spriteOver.label = 'logo-over';
    spriteOver.x = x2;
    spriteOver.y = y1;
    this.addChild(spriteOver);

    const spriteMoscow = Sprite.from("logo-moscow");
    // sprite.texture = texture;
    spriteMoscow.anchor.set(0.5);
    spriteMoscow.label = 'logo-moscow';
    spriteMoscow.x = 1440/2;
    spriteMoscow.y = y2;
    this.addChild(spriteMoscow);

  }

  isNotLogo(child) {
    return child.label === 'bg' || this.isText(child);
  }

  isText(child) {
    return child.label.includes('text');
  }

  initText() {

    const lines = [
      'Missile Launch Detected!',
      '!defend the raid to destroy incoming missiles!',
      '!attack with the raid to increase missile payload!',
      'Earn basic bytes for each missile destroyed',
      'Raider earns bonus bytes for each target destroyed'
    ]


    lines.forEach((line, index) => {
      const text = new Text(line, {
        fontFamily: CONSTS.FONT_FAMILY,
        fontSize: 24,
        fill: 0xcccccc,
        align: 'left',
        // stroke: 0xffffff,
        // strokeThickness: 6,
      });
      text.label = `text${index+1}`;
      text.anchor.set(0.5);
      this.addChild(text);
      text.x = 1440/2;
      text.y = 1080 / 2 + 40 + index * 30 + 20 * index;
      text.alpha = 0;
    });
  }

  initTransitionIn({animOptions} = {}) {
    console.log(`${this.label} transitionIn`);
    super.initTransitionIn({
      animOptions,
    });

    for (const child of this.children) {
      console.log('child:', child);
      if (this.isNotLogo(child)) continue;
      child.alpha = 0;
      this.tl.fromTo(child, {alpha: 0, y:"+=20"}, {y: "-=20", alpha: 1, duration: 0.5, ease: "power2.out"});
    }

    this.tl.addLabel("all-in");

    for (const child of this.children) {
      console.log('child:', child);
      if (this.isNotLogo(child)) continue;
      this.tl.to(child, {y: "-=250", delay: 2, duration: 0.75, ease: "power2.out"}, "all-in");
    }

    for (const text of this.children) {
      if (!this.isText(text)) continue;
      this.tl.to(text, {alpha: 1, delay: 0.5, duration: 0.75, ease: "power2.out"});
    }
  }

}

export default Titles;