import { Application, Assets, Text } from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import OverlayGuide from "./overlay-guide.js";
import Scene from "./Scene.js";
import SceneTitles from "./SceneTitles.js";
import {CONSTS} from "./consts.js";
import SceneVideo from "./SceneVideo.js";
import SceneGame from "./SceneGame.js";

gsap.registerPlugin(PixiPlugin);
gsap.registerPlugin(DrawSVGPlugin);

(async () => {
  // Create a new application
  const app = new Application();
  // Initialize the application
  await app.init(CONSTS.APP_OPTIONS);

  // Append the application canvas to the document body
  document.getElementById("pixi-container").appendChild(app.canvas);

  Assets.addBundle('fonts', [
    { alias: 'Amiga Forever Pro2', src: '/assets/amiga4ever_pro2-webfont.woff2' },
  ]);

  Assets.addBundle('images', [
    { alias: 'overlay-guide', src: '/assets/overlay-guide.png' },
    { alias: 'raid-map', src: '/assets/raid-map.png' },
    { alias: 'logo-raid', src: '/assets/raid-logo-raid.png' },
    { alias: 'logo-over', src: '/assets/raid-logo-over.png' },
    { alias: 'logo-moscow', src: '/assets/raid-logo-moscow.png' },
    { alias: 'base-black', src: '/assets/base-black.png' },
    { alias: 'base-white', src: '/assets/base-white.png' },
    { alias: 'raid-hammer', src: '/assets/raid-hammer-and-sickle.png' },
  ]);

  Assets.addBundle('videos', [
    { alias: 'video-1', src: '/assets/clip7.mp4' },
  ]);

  await Assets.loadBundle(['fonts', 'images', 'videos']);

  await document.fonts.ready
  for (const font of document.fonts) console.log(font.family);

  const scene = new SceneTitles({
    startY: -1080,
  });
  app.stage.addChild(scene);

  const scene2 = new SceneGame({
    startX: -1920,
  });
  app.stage.addChild(scene2);

  const overlayGuide = OverlayGuide();
  app.stage.addChild(overlayGuide);

  // const scene3 = new SceneVideo(0);
  // app.stage.addChild(scene3);

  // scene2.initTransitionIn({ animOptions: { x: 0 }})
  // scene2.executeTimeline();
  // scene2.finalAnimComplete();

  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    const keyName = event.key;

    if (keyName ==="d") {
      console.log("Debug Info:");
      scene2.destroyMissile()
    }

    if (keyName === "Control") {
      // do not alert when only Control key is pressed.
      return;
    }

    if (event.ctrlKey) {
      // Even though event.key is not 'Control' (e.g., 'a' is pressed),
      // event.ctrlKey may be true if Ctrl key is pressed at the same time.
      console.log(`Combination of ctrlKey + ${keyName}`);

      switch(keyName) {
        case 'ctrl1':
        case '1':
          scene.initTransitionIn();
          scene.executeTimeline();
          break;
        case 'ctrl2':
        case '2':
          scene2.initTransitionIn({ animOptions: { x: 0 }})
          scene2.executeTimeline();
          // scene2.initMissileDefence();
          // scene2.initTransitionIn();
          // scene2.executeTimeline();
          break;

        case 'ctrl3':
        case '3':
          console.log('wat');
          scene2.incomingRaid();
          scene2.initTransitionIn({ animOptions: { x: 0 }})
          scene2.executeTimeline();

          break;
        default:
          break;

      }

    } else {
      // alert(`Key pressed ${keyName}`);
    }
  });

  document.addEventListener("keyup", (event) => {
    event.preventDefault();
    const keyName = event.key;

    console.log(`Key released ${keyName}`);

    // As the user releases the Ctrl key, the key is no longer active,
    // so event.ctrlKey is false.
    if (keyName === "Control") {
      // alert("Control key was released");

    }
  });



  // Listen for animate update
  app.ticker.add((time) => {
    // Just for fun, let's rotate mr rabbit a little.
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
    // bunny.rotation += 0.1 * time.deltaTime;
    // graphics.rotation += 0.1 * time.deltaTime;
    // app.render();


  });
})();
