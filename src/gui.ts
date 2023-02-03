import { Engine } from '@babylonjs/core';
import { AdvancedDynamicTexture, Control, Rectangle } from '@babylonjs/gui';

const createRect = (background: string) => {
    const distance = '40px';
    const rect = new Rectangle();
    rect.transformCenterX = 0;
    rect.transformCenterY = 0;
    rect.width = '180px';
    rect.height = '30px';
    rect.color = background;
    rect.background = background;

    rect.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    rect.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    rect.paddingRight = distance;
    rect.top = distance;

    return rect;
}
export class MainGUI {
    private background: Rectangle;
    private forground: Rectangle;

    constructor() {
        this.background = createRect('white');
        this.forground = createRect('blue');
        var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true, Engine.LastCreatedScene);
        advancedTexture.addControl(this.background);
        advancedTexture.addControl(this.forground);
    }

    set progress(progres: number) {
        this.forground.scaleX = progres;
    }

}