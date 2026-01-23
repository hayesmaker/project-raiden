import Scene from "./Scene.js";
import { gsap } from "gsap";
import { Sprite, Graphics, Text } from "pixi.js";

import {getScaleRatio4x3, hexNumToString, hexString2Num} from "./utils/helpers.js";
import { CONSTS } from "./consts.js";
import UIPanel from "./UIPanel.js";
import Timer from "./utils/timer.js";

const SDI_POS = {
  x: 850,
  y: 420
};

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
    this.state = {
      svgElement: null,
      missilePaths: [],
      missilePathPoints: [],
      missilesByRaider: [],
      missilesDestroyed: [],
      currentRaidIndex: 0,
      currentRaider: 'RedOctober',
      timers: [],
      raiderPanels: [],
      colours: [0x00ff00, 0xffff00, 0x0000ff],
    }
    this.topLineText = null;
    this.initData();
    this.initGfx();
    this.initText();
    this.svgEls = document.querySelectorAll('svg');
  }

  initData() {
    // define 10 launcher positions
    const launcherPositions = [
      [
        { x: 1010, y: 690 },
        { x: 990, y: 710 },
        { x: 980, y: 740 },
        { x: 1080, y: 700 },
        { x: 1060, y: 720 },
        { x: 1030, y: 755 },
        { x: 1080, y: 755 },
      ],
      [
        { x: 1110, y: 720 },
        { x: 1140, y: 740 },
        { x: 1130, y: 770 },
        { x: 1120, y: 800 },
        { x: 1170, y: 820 },
        { x: 1200, y: 805 },
        { x: 1210, y: 855 },
      ],
      [
        { x: 1190, y: 700 },
        { x: 1220, y: 740 },
        { x: 1200, y: 730 },
        { x: 1270, y: 800 },
        { x: 1240, y: 720 },
        { x: 1250, y: 705 },
        { x: 1260, y: 755 },
      ]
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
    ];
    this.launcherPositions = launcherPositions;
    this.targetPositions = targetPositions;
  }

  initGfx() {
    const spriteMap = Sprite.from("raid-map");
    spriteMap.anchor.set(0);
    this.addChild(spriteMap);

    const scaleFactor = getScaleRatio4x3({ width: spriteMap.width });
    spriteMap.scale.x = scaleFactor;
    spriteMap.scale.y = scaleFactor;
    spriteMap.y = 1080 - spriteMap.height;

    for (const pos of this.launcherPositions[0]) {
      const launcher = new Graphics();
      launcher.rect(0, 0, 20, 10);
      launcher.fill(0x00ff00);
      launcher.x = pos.x;
      launcher.y = pos.y;
      this.addChild(launcher);
    }

    for (const pos of this.launcherPositions[1]) {
      const launcher = new Graphics();
      launcher.rect(0, 0, 20, 10);
      launcher.fill(0xffff00);
      launcher.x = pos.x;
      launcher.y = pos.y;
      this.addChild(launcher);
    }

    for (const pos of this.launcherPositions[2]) {
      const launcher = new Graphics();
      launcher.rect(0, 0, 20, 10);
      launcher.fill(0x0000ff);
      launcher.x = pos.x;
      launcher.y = pos.y;
      this.addChild(launcher);
    }

    for (const pos of this.targetPositions) {
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
    this.state.svgElement = svgElement;
    svgElement.setAttribute("width", "1440");
    svgElement.setAttribute("height", "1080");
    svgElement.setAttribute("viewBox", "0 0 1440 1080");
    svgElement.style.pointerEvents = "none"; // Make sure it doesn't block pointer events
    svgElement.style.overflow = "hidden";

    const overlay = document.querySelector('#overlay');
    overlay.appendChild(svgElement);
    // this.incomingRaid();
  }

  incomingRaid(name = "RedOctober") {
    console.log('incomingRaid');
    this.state.currentRaider = name;
    const raidIndex = this.state.currentRaidIndex;
    const colour = this.state.colours[raidIndex];

    const textStyle = {
      fontFamily: CONSTS.FONT_FAMILY,
      fontSize: 24,
      fill: 0xcccccc,
      align: 'left',
    };


    const raiderName = new Text(this.state.currentRaider, {
      ...textStyle,
      fill: this.state.colours[this.state.currentRaidIndex],
    });
    raiderName.anchor.set(0);
    this.addChild(raiderName);
    raiderName.x = this.topLineText.x + this.topLineText.width + 20;
    raiderName.y = 20;
    this.topLineText = raiderName;


    this.drawMissileLines(
      raidIndex,
      10,
      400,
      hexNumToString(colour),
    );

    this.state.missilesByRaider.push({
      raider: this.state.currentRaider,
      raidIndex,
      originalNumMissiles: 10,
      missilesDestroyed: 0,
    });

    const uiPanel1 = new UIPanel("ETI", hexNumToString(colour));
    this.addChild(uiPanel1);
    uiPanel1.updateValue('02:00');
    // this.state.timerPanels.push(uiPanel1);
    uiPanel1.x = 20 + raidIndex * 200;
    uiPanel1.y = 160;

    this.timer = new Timer();
    this.state.timers.push(this.timer);
    // this.timer.setCountdownTime(1, 30); // 1 minute 30 seconds
    this.timer.startCountdown(uiPanel1, 2, 0,() => {
      console.log('Countdown complete');
    });

    this.state.currentRaidIndex = raidIndex + 1;
  }

  drawMissileLines(launchSiteIndex = 0, numMissiles = 10, missileHeight = 400, colour = '#00ff00') {
    for (let i = 0; i < numMissiles; i++) {
      const sourceIndex = Math.floor(Math.random() * this.launcherPositions[launchSiteIndex].length);
      const targetIndex = Math.floor(Math.random() * this.targetPositions.length);
      // Given cubic Bézier points
      const p0 = { ...this.launcherPositions[launchSiteIndex][sourceIndex] };
      const p1 = { x: p0.x, y: p0.y - missileHeight };
      const p2 = { x: this.targetPositions[targetIndex].x, y: this.targetPositions[targetIndex].y - missileHeight };
      const p3 = { ...this.targetPositions[targetIndex] };

      const missilePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      // d="M 100 200 C 100 100 300 100 300 200"
      missilePath.setAttribute("d", `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y}`);
      missilePath.setAttribute("stroke", colour);
      missilePath.setAttribute("stroke-width", "5");
      missilePath.setAttribute("stroke-opacity", "0.5");
      missilePath.setAttribute("fill", "none");
      missilePath.setAttribute("class", `missile-path-${launchSiteIndex}`);

      this.state.svgElement.appendChild(missilePath);

      // calculate random point along Bézier curve
      // choose random t between 0.25 and 0.75 to avoid clustering at ends
      const t = Math.random() * 0.5 + 0.25;

      // evaluate point along curve
      const bx =
        Math.pow(1 - t, 3) * p0.x +
        3 * Math.pow(1 - t, 2) * t * p1.x +
        3 * (1 - t) * Math.pow(t, 2) * p2.x +
        Math.pow(t, 3) * p3.x;

      const by =
        Math.pow(1 - t, 3) * p0.y +
        3 * Math.pow(1 - t, 2) * t * p1.y +
        3 * (1 - t) * Math.pow(t, 2) * p2.y +
        Math.pow(t, 3) * p3.y;

      const randomPoint = { x: bx, y: by, launchSiteIndex };
      this.state.missilePathPoints.push(randomPoint);
      this.state.missilePaths.push(missilePath);
    }
  }

  initText() {
    const textStyle = {
      fontFamily: CONSTS.FONT_FAMILY,
      fontSize: 24,
      fill: 0xcccccc,
      align: 'left',
    };

    const text = new Text(`Raid Initiated by:`, textStyle);
    text.label = `raid-initiated`;
    text.anchor.set(0);
    this.addChild(text);
    text.x = 20;
    text.y = 20;
    this.topLineText = text;

    const text2 = new Text(`Missiles Incoming!`, textStyle);
    text2.label = `text2-missiles-incoming`;
    text2.anchor.set(0);
    this.addChild(text2);
    text2.x = 20;
    text2.y = 80;
  }

  /**
   * @deprecated
   */
  finalAnimComplete() {
    console.log('SceneGame finalAnimComplete');
    this.tl.seek(100);
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
    });
  }

  timeLineExtend() {
    this.tl.from(`.missile-path-${this.state.currentRaidIndex - 1}`, {
      duration: 1,
      drawSVG: 0,
      stagger: 0.1
    });
  }

  destroyMissile() {
    console.log('destroyMissile');
    // pick a random missile path point that hasn't been destroyed yet
    const unDestroyedPoints = this.state.missilePathPoints.filter((point, index) => {
      return !this.state.missilesDestroyed.includes(index);
    });

    if (unDestroyedPoints.length === 0) {
      console.log('All missiles already destroyed');
      return;
    }

    const randomIndex = Math.floor(Math.random() * unDestroyedPoints.length);
    const pointToDestroy = unDestroyedPoints[randomIndex];
    const raiderIndex = pointToDestroy.launchSiteIndex;
    const pointIndex = this.state.missilePathPoints.indexOf(pointToDestroy);
    this.state.missilesDestroyed.push(pointIndex);

    // create explosion graphic at that point
    const explosion = new Graphics();
    explosion.circle(0, 0, Math.random() * 10 + 20);
    explosion.fill({color: 0xffffff, alpha: 0.75});
    explosion.x = pointToDestroy.x;
    explosion.y = pointToDestroy.y;
    this.addChild(explosion);

    let defenceLaser;
    // create a timeline to animate explosion
    const tl = gsap.timeline({paused: true});
    tl.call(() => {
      console.log('Starting explosion animation at point index:', pointIndex);
      defenceLaser = new Graphics();
      defenceLaser.moveTo(SDI_POS.x, SDI_POS.y);
      defenceLaser.setStrokeStyle({
        width: 1,
        color: 0xffffff,
        alpha: 0.8,
      });
      defenceLaser.lineTo(pointToDestroy.x, pointToDestroy.y);
      defenceLaser.stroke();
      this.addChild(defenceLaser);
    })
    tl.to(explosion, {
      duration: 0.2,
      scale: 1.5,
      alpha: 1,
    });
    tl.call(() => {
      console.log('Explosion animation complete');
      this.removeChild(explosion);
      this.state.svgElement.removeChild(this.state.missilePaths[pointIndex]);
      this.removeChild(defenceLaser);
      const raidInfo = this.state.missilesByRaider[raiderIndex];
      raidInfo.missilesDestroyed += 1;  
      if (raidInfo.missilesDestroyed >= raidInfo.originalNumMissiles) {
        console.log(`All missiles from ${raidInfo.raider} destroyed!`);
        this.state.timers[raiderIndex].stop();
      }

    });

    tl.play();
  }
}

export default SceneGame;