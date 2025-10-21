import Scene from "./Scene.js";
import { gsap } from "gsap";
import { CONSTS } from "./consts.js";
import { Sprite, Graphics } from "pixi.js";
import { getScaleRatio4x3 } from "./utils/helpers.js";

class SceneGame extends Scene {

  get svgEls() {
    return this._svgEls;
  }

  set svgEls(els) {
    this._svgEls = els;
  }

  constructor(props) {
    super(props);
    this.label = 'SceneGame';
    this.initGfx();
    this.svgEls = document.querySelectorAll('svg');
  }

  initGfx() {
    const spriteMap = Sprite.from("raid-map");
    spriteMap.anchor.set(0);
    console.log('this.startX', this.startX);
    console.log('this.startY', this.startY);
    this.addChild(spriteMap);

    const scaleFactor = getScaleRatio4x3({ width: spriteMap.width });
    spriteMap.scale.x = scaleFactor;
    spriteMap.scale.y = scaleFactor;
    spriteMap.y = 1080 - spriteMap.height;

    // define 10 launcher positions
    const launcherPositions = [
      { x: 1010, y: 690 },
      { x: 990, y: 710 },
      { x: 980, y: 740 },
      { x: 1080, y: 700 },
      { x: 1060, y: 720 },
      { x: 1030, y: 755 },
      { x: 1080, y: 755 },
    ];

    const targetPositions = [
      { x: 20, y: 745 },
      { x: 15, y: 810 },
      { x: 25, y: 865 },
      { x: 65, y: 750 },
      { x: 50, y: 840 },
      { x: 60, y: 885 },
      { x: 110, y: 745 },
      { x: 90, y: 845 },
      { x: 130, y: 795 },
      { x: 160, y: 745 },
      { x: 150, y: 850 },
      { x: 205, y: 780 },
      { x: 250, y: 780 },
      { x: 285, y: 765 },
      { x: 305, y: 730 },
      { x: 310, y: 775 },
      { x: 230, y: 800 },
      { x: 270, y: 800 },
      { x: 210, y: 820 },
      { x: 240, y: 830 },
      { x: 200, y: 845 },
      { x: 175, y: 870 },
      { x: 215, y: 875 },
      { x: 235, y: 915 },
    ]

    for (const pos of launcherPositions) {
      const launcher = new Graphics();
      launcher.rect(0, 0, 20, 10);
      launcher.fill(0x00ff00);
      launcher.x = pos.x;
      launcher.y = pos.y
      this.addChild(launcher);
    }

    for (const pos of targetPositions) {
      const target = new Graphics();
      target.circle(0, 0, 10);
      target.fill(0xff0000);
      target.x = pos.x;
      target.y = pos.y
      this.addChild(target);
    }

    // draw svgs
    // create html svg and add to DOM
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("width", "1440");
    svgElement.setAttribute("height", "1080");
    svgElement.setAttribute("viewBox", "0 0 1440 1080");
    svgElement.style.pointerEvents = "none"; // Make sure it doesn't block pointer events
    svgElement.style.overflow = "hidden";

    // const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // // d="M 100 200 C 100 100 300 100 300 200"
    // pathElement.setAttribute("d", "M 100 200 C 100 100 300 100 300 200");
    // pathElement.setAttribute("stroke", "red");
    // pathElement.setAttribute("stroke-width", "5");
    // pathElement.setAttribute("fill", "none");
    // pathElement.setAttribute("class", "missile-path");

    const overlay = document.querySelector('#overlay');
    // svgElement.appendChild(pathElement);
    overlay.appendChild(svgElement);

    const numMissiles = 100;
    const missileHeight = 400;
    for (let i = 0; i < numMissiles; i++) {
      const sourceIndex = Math.floor(Math.random() * launcherPositions.length);
      const targetIndex = Math.floor(Math.random() * targetPositions.length);
      const initialX = launcherPositions[sourceIndex].x;
      const initialY = launcherPositions[sourceIndex].y;
      const targetX = targetPositions[targetIndex].x;
      const targetY = targetPositions[targetIndex].y;

      const missilePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      // d="M 100 200 C 100 100 300 100 300 200"
      missilePath.setAttribute("d", `M ${initialX} ${initialY} C ${initialX} ${initialY - missileHeight} ${targetX} ${targetY - missileHeight} ${targetX} ${targetY}`);
      missilePath.setAttribute("stroke", "#00ff00");
      missilePath.setAttribute("stroke-width", "5");
      missilePath.setAttribute("stroke-opacity", "0.1");
      missilePath.setAttribute("fill", "none");
      missilePath.setAttribute("class", "missile-path");
      svgElement.appendChild(missilePath);
    }

  }

  initText() {
    // No text for this scene yet
  }

  finalAnimComplete() {
    console.log('SceneGame finalAnimComplete');
    this.tl.seek(100)
  }

  initTransitionIn({animOptions} = {}) {
    super.initTransitionIn({
      animOptions,
    });

    this.tl.call(() => {
      // const svg = document.querySelectorAll('svg');
      for (const svgEl of this.svgEls) {
        svgEl.style.visibility = 'visible';
      }
    })

    this.tl.from('.missile-path', {
      duration: 1,
      drawSVG: 0,
      stagger: 0.1
    })

  }
}

export default SceneGame;