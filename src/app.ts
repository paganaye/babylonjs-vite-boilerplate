import { Engine, FreeCamera, HemisphericLight, Matrix, Scene, Vector3 } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders";
import "@babylonjs/loaders/glTF";
import { animateFloat } from "./animations";
import { MainGUI } from "./gui";
import { createMainStage } from "./mainStage";




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

        const camera = new FreeCamera('camera1', new Vector3(0, 0.1, -4), scene);
        var mainLight: HemisphericLight = new HemisphericLight("light1", new Vector3(0, 1, 1), scene);
        mainLight.intensity = 0.2;
        const mainGui = new MainGUI();
        mainGui.progress = 0.5;
        animateFloat(mainGui, "progress", 4, [0, 1]).then(() => console.log("DONE!"));
        createMainStage();
        scene.registerBeforeRender(() => {
            // leaf.addRotation(0, 0.05, 0);
        })
        scene.onPointerDown = function castRay() {

            var ray = scene.createPickingRay(scene.pointerX, scene.pointerY, Matrix.Identity(), camera, false);

            var hit = scene.pickWithRay(ray);

            console.log("debug", { hit: hit?.pickedMesh.id });

            // if (hit.pickedMesh && hit.pickedMesh.metadata == "cannon"){
            //     // createGUIButton();
            // }
        }
        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.key === 'i') {
                // if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'i') {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();