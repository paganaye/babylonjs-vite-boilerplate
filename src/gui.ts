import { Engine } from '@babylonjs/core';
import { AdvancedDynamicTexture, Control, Rectangle, TextBlock } from '@babylonjs/gui';

const SCREEN_PADDING = 40;
const BAR_WIDTH = 140;
const ENERGY = '#85d8ff';

const createRect = (background: string, inner?: boolean) => {
    const distance = `${SCREEN_PADDING}px`;
    const rect = new Rectangle();
    rect.transformCenterX = 0;
    rect.transformCenterY = 0;
    rect.width = inner ? `${BAR_WIDTH}px` : `${BAR_WIDTH + SCREEN_PADDING}px`;
    rect.height = '30px';
    rect.color = background;
    rect.background = background;
    rect.cornerRadius = 10;
    if (!inner) {
        rect.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        rect.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        rect.paddingRight = distance;
        rect.top = distance;
    }

    return rect;
}


const createText = (name: string, initialText: string) => {
    const textBlock = new TextBlock(name);
    textBlock.text = initialText;
    textBlock.color = ENERGY;
    textBlock.width = '330px';
    textBlock.height = '30px';
    textBlock.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    textBlock.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    textBlock.top = '75px';
    return textBlock;
}

export class MainGUI {
    private background: Rectangle;
    private forground: Rectangle;
    private progressText: TextBlock;

    constructor() {
        this.background = createRect('white');
        this.forground = createRect(ENERGY, true);
        this.progressText = createText("progressText", "+1");
        this.background.addControl(this.forground);

        const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, Engine.LastCreatedScene);
        advancedTexture.addControl(this.background);
        advancedTexture.addControl(this.progressText);
    }
    set progressRatio(text: number) {
        this.progressText.text = `+${text}`;
    }

    set progress(progres: number) {
        this.forground.left = `${(progres * BAR_WIDTH) - BAR_WIDTH}px`;
    }

}