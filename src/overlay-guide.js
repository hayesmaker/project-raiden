import {Assets, Graphics, Sprite, Container} from "pixi.js";
import { getScaleRatio4x3 } from "./utils/helpers.js";

const PRIMARY_COLOR = 0x513F9F;
const PRIMARY_ALPHA = 1;

const SECONDARY_COLOR = 0x4228A0;
const SECONDARY_ALPHA = 1;

const TERTIARY_COLOR = 0x67637C;
const TERTIARY_ALPA = 0.5;

const OverlayGuide = () => {
  const container = new Container();

  // const sprite = Sprite.from("overlay-guide");

  const graphics = new Graphics();
  graphics.rect(0, 0, 1920, 1080)
  graphics.fill({ color: 0x000000, alpha: 0.75})

  const g0 = new Graphics();
  g0.rect(1440, 0, 22, 1080);
  g0.fill({ color: SECONDARY_COLOR, alpha: SECONDARY_ALPHA});
  // g0.blendMode = 1;

  const g1 = new Graphics();
  g1.rect(1920-22, 0, 22, 1080)
  g1.fill({ color: SECONDARY_COLOR, alpha: SECONDARY_ALPHA});
  // g1.blendMode = 1;

  const g2 = new Graphics();
  g2.rect(1462, 0, 434, 52);
  g2.fill({color: PRIMARY_COLOR, alpha: PRIMARY_ALPHA});

  const g3 = new Graphics();
  g3.rect(1462, 396, 434, 320)
  g3.fill({color: PRIMARY_COLOR, alpha: PRIMARY_ALPHA});

  const g4 = new Graphics();
  g4.rect(1462, 1028, 434, 52)
  g4.fill({color: PRIMARY_COLOR, alpha: PRIMARY_ALPHA});

  const g5 = new Graphics();
  g5.rect(0, 1080-54, 1920, 54);
  g5.fill({ color: TERTIARY_COLOR, alpha: TERTIARY_ALPA})

  container.addChild(g0, g1, g2, g3, g4, g5);

  const aspectRatio4_by_3 = new Graphics();
  aspectRatio4_by_3.rect(0, 0, 640, 480);
  aspectRatio4_by_3.fill({ color: 0x00ff00, alpha: 0.2})
  // container.addChild(aspectRatio4_by_3);

  const scaleFactor = getScaleRatio4x3({height: 480});
  aspectRatio4_by_3.scale.x = scaleFactor;
  aspectRatio4_by_3.scale.y = scaleFactor;

  // const aspectRatio16_by_9 = new Graphics();
  // aspectRatio16_by_9.rect(0, 0, 1920, 1080);
  // aspectRatio16_by_9.fill({ color: 0x0000ff, alpha: 1})
  // sprite.addChild(aspectRatio16_by_9);
  // container.addChild(sprite);
  return container;
}

export default OverlayGuide;