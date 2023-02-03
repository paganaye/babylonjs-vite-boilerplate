import { Animation, CubicEase, EasingFunction, Engine } from "@babylonjs/core";

let runner = 1;
const ease = new CubicEase()
ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT)
export const animateTo = (target: any, key: string, duration: number, values: any[]) => new Promise((resolve) => {
    const frameRate = 10;
    console.log({ values, key })
    const animation = new Animation("xSlide" + runner, key, frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
    animation.setEasingFunction(ease)
    const keyDuration = duration / values.length;

    animation.setKeys(values.map((value, index) => ({
        frame: index * keyDuration * frameRate,
        value
    })));

    Engine.LastCreatedScene?.beginDirectAnimation(target, [animation], 0, duration * frameRate, false, undefined, () => {
        resolve(true);
    });

})