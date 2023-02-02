import { Animation, Engine } from "@babylonjs/core";

export const animateFloat = (target: any, key: string, duration: number, values: number[]) => new Promise((resolve) => {
    const frameRate = 10;

    const animation = new Animation("xSlide", key, frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);

    const keyDuration = duration / values.length;

    animation.setKeys(values.map((value, index) => ({
        frame: index * keyDuration * frameRate,
        value
    })));

    Engine.LastCreatedScene?.beginDirectAnimation(target, [animation], 0, duration * frameRate, false, undefined, () => {
        resolve(true);
    });

})