import {
    Engine,
    FreeCamera,
    HemisphericLight,
    Matrix, Scene,
    TransformNode,
    Vector3
} from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders";
import "@babylonjs/loaders/glTF";
import { animateTo } from "./animations";
import { MainGUI } from "./gui";
import { MainGame } from "./MainGame";
import { createMainStage } from "./mainStage";
import { Roots } from "./roots";

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

        const camera = new FreeCamera("camera1", Vector3.Zero(), scene);
        var CoT = new TransformNode("cameraNode");

        camera.parent = CoT;
        CoT.position.set(0, 0.1, -4);
        var mainLight: HemisphericLight = new HemisphericLight(
            "light1",
            new Vector3(0, 1, 1),
            scene
        );
        mainLight.intensity = 0.2;
        const game = new MainGame();
        const mainGui = new MainGUI();
        mainGui.progress = game.energyRatio;
        // animateFloat(mainGui, "progress", 4, [0, 1]).then(() => console.log("DONE!"));
        const dirt = createMainStage();
        scene.registerBeforeRender(() => {
            // leaf.addRotation(0, 0.05, 0);
        });
        scene.onPointerDown = function castRay() {
            var ray = scene.createPickingRay(
                scene.pointerX,
                scene.pointerY,
                Matrix.Identity(),
                camera,
                false
            );

            var hit = scene.pickWithRay(ray);

            if (hit?.pickedMesh?.id === "plantBase") {
                const p = hit?.pickedMesh?.position;
                animateTo(CoT, "position.x", 1, [CoT.position.x, p.x]);
                animateTo(CoT, "position.y", 1, [CoT.position.y, p.y]);
            }
        };

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.key === "i") {
                // if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'i') {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        const roots = new Roots(scene);

        canvas.addEventListener("pointerdown", (event) => {
            const pickRoots = scene.pick(event.clientX, event.clientY, (mesh) =>
                roots.isMeshInRoots(mesh)
            );
            if (pickRoots.hit) {
                const pickDirt = scene.pick(
                    event.clientX,
                    event.clientY,
                    (mesh) => mesh === dirt
                );

                if (pickDirt.hit) {
                    const target = pickDirt.pickedPoint;
                    target!.z = 0;
                    roots.createSphere();
                }
            }
        });

        canvas.addEventListener("pointermove", (event) => {
            if (roots.getIsDragging()) {
                let pickResult = scene.pick(event.clientX, event.clientY, (mesh) => {
                    return mesh === dirt;
                });
                let target = pickResult.pickedPoint;
                target!.z = 0;
                roots.moveSphere(target!);
            }
        });

        canvas.addEventListener("pointerup", () => {
            roots.deleteSphere();
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            game.updateEnergy();
            mainGui.progress = game.energyRatio;
            scene.render();
        });
    }
}
new App();
