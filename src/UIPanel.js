import { Container, Graphics, Text } from "pixi.js";
import gsap from "gsap";
import {CONSTS} from "./consts.js";

class UIPanel extends Container {
    constructor(value = "test", colour='#00ff00', width = 180) {
        super();
        this.label = 'UIPanel';
        this.bounds = {
            x: 0,
            y: 40,
            width,
            height: 90,
        };
        this.padding = 10;
        this.value = value;
        this.colour = colour;
        this.initBg();
        this.initText();
    }

    initBg() {
        console.log(`${this.label} initBg`);
        const graphics = new Graphics();
        graphics.stroke({ width: 4, color: this.colour, alpha: 1})
        graphics.roundRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, 5 );
        graphics.stroke();
        this.addChild(graphics);
    }

    initText() {
        const textStyle = {
            fontFamily: CONSTS.FONT_FAMILY,
            fontSize: 24,
            fill: 0xcccccc,
            align: 'right',
        };

        console.log(`${this.label} initText`);
        const text = new Text(this.value, textStyle);
        text.anchor.set(0);
        text.x = 0;
        text.y = 0;
        this.addChild(text);

        const valueText = new Text('02:00', {
            ...textStyle,
            fontSize: 36,
            fill: this.colour,
        });
        valueText.anchor.set(1, 0.5);
        valueText.x = this.bounds.x + this.bounds.width - this.padding;
        valueText.y = this.bounds.y + this.bounds.height /2;
        this.addChild(valueText);
        this.valueText = valueText;
    }

    set text (val) {
        this.valueText.text = val;
    }

    updateValue (val) {
        this.valueText.text = val;
        // console.log('this.valueText.text', this.valueText.width);
        // this.valueText.x = this.bounds.x + this.bounds.width - this.valueText.width;
    }
}

export default UIPanel;