import { Sprite, Texture} from "pixi.js";
// import { VideoResource } from 'pixi.js/lib/resources/video/VideoResource.mjs';
import {Howl, Howler} from "howler";
import Scene from "./Scene.js";

class Video extends Scene {
  constructor(props) {
    super(props);
    this.label = 'SceneVideo';
    // this.initGfx();
    this.sound = null;
    this.videoRes = null;
    this.initVideoResource();
  }

  initVideoResource() {
    this.videoRes = Sprite.from('video-1', {
      autoPlay: true,
      autoLoad: true,
    });
    this.videoRes.width = 192;
    this.videoRes.height = 108;
    this.addChild(this.videoRes);
    this.sound = new Howl({
      src: ['./assets/clip7.mp4'],
      autoplay: true,
      loop: false,
      volume: 0.5,
      onend: function() {
        console.log('Finished!');
      }
    });
  }
}

export default Video;