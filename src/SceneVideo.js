import { Sprite, Texture} from "pixi.js";
// import { VideoResource } from 'pixi.js/lib/resources/video/VideoResource.mjs';
import {Howl, Howler} from "howler";
import Scene from "./Scene.js";

class Video extends Scene {
  constructor(props) {
    super(props);
    this.label = 'SceneVideo';
    // this.initGfx();
    this.initVideoResource();
  }

  initVideoResource() {
    const videoRes = Sprite.from('video-1', {
      autoPlay: true,
      autoLoad: true,
    });

    // const texture = new Texture(videoRes);
    // const sprite = new Sprite(texture);
    this.addChild(videoRes);
  }

  initGfx() {
    const video = Sprite.from('video-1');
    // const spriteVideo = new Sprite(video);
    video.anchor.set(0);
    video.x = 0;
    video.y = 0;
    // spriteVideo.width = app.screen.width;
    // spriteVideo.height = app.screen.height;

    this.addChild(video);

    // const sound = new Howl({
    //   src: ['./assets/clip7.mp4'],
    //   autoplay: false,
    //   loop: false,
    //   volume: 0.5,
    //   onend: function() {
    //     console.log('Finished!');
    //   }
    // });
    //
    // // const texture = Texture.from(video);
    // const spriteVideo = Sprite.from('video-1');
    // spriteVideo.anchor.set(0);
    // spriteVideo.x = 0;
    // spriteVideo.y = 0;
    // // spriteVideo.width = app.screen.width;
    // // spriteVideo.height = app.screen.height;
    //
    // this.addChild(spriteVideo);
    // sound.play();


  }
}

export default Video;