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
    this.videoRes.width = 1920/2;
    this.videoRes.height = 1080/2;
    // this.addChild(this.videoRes);
    // this.videoRes
    this.sound = new Howl({
      src: ['./assets/clip7.mp4'],
      autoplay: false,
      loop: false,
      volume: 0.5,
      onend: function() {
        console.log('Finished!');
      }
    });
  }

  playVideo() {
    // this.videoRes.play();
    this.sound.play();
    this.addChild(this.videoRes);
  }
}

export default Video;