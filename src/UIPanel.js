import { Container, Graphics, Text } from "pixi.js";
import gsap from "gsap";
import {CONSTS} from "./consts.js";

class UIPanel extends Container {
    constructor() {
        super();
        this.label = 'UIPanel';
        this.bounds = {
            x: 0,
            y: 40,
            width: 180,
            height: 90,
        };
        this.initBg();
        this.initText();
    }

    initBg() {
        console.log(`${this.label} initBg`);
        const graphics = new Graphics();
        graphics.stroke({ width: 4, color: 0xffffff, alpha: 1})
        graphics.roundRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, 5 );
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
        const text = new Text('E.T.I.', textStyle);
        text.anchor.set(0);
        text.x = 0;
        text.y = 0;
        this.addChild(text);

        const valueText = new Text('2:00', {
            ...textStyle,
            fontSize: 36,
        });
        valueText.anchor.set(0.5);
        valueText.x = this.bounds.x + this.bounds.width / 2;
        valueText.y = this.bounds.y + this.bounds.height / 2;
        this.addChild(valueText);
        this.valueText = valueText;
    }

    updateValue (val) {
        this.valueText.text = val;
    }
}

export default UIPanel;