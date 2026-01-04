import { Container, Graphics, Text } from "pixi.js";
import gsap from "gsap";
import {CONSTS} from "./consts.js";

class UIPanel extends Container {
    constructor() {
        super();
        this.label = 'UIPanel';
        this.initBg();
        this.initText();
    }

    initBg() {
        console.log(`${this.label} initBg`);
        const graphics = new Graphics();
        graphics.fill({ color: 0xffffff, alpha: 0.5})
        graphics.stroke({ width: 5, color: 0xffffff, alpha: 1})
        graphics.roundRect(0, 40, 180, 100, 15 );
        graphics.fill();
        graphics.stroke();
        this.addChild(graphics);
    }

    initText() {
        const textStyle = {
            fontFamily: CONSTS.FONT_FAMILY,
            fontSize: 24,
            fill: 0xcccccc,
            align: 'left',
        };

        console.log(`${this.label} initText`);
        const text = new Text('UI Panel', textStyle);
        text.anchor.set(0);
        text.x = 0;
        text.y = 0;
        this.addChild(text);
    }
}

export default UIPanel;