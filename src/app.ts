import { Color3, Engine, FreeCamera, HemisphericLight, MeshBuilder, PointLight, Scene, Vector3 } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders";
import "@babylonjs/loaders/glTF";
import { animateFloat } from "./animations";
import { MainGUI } from "./gui";
import { createMaterial, createUndergroundMaterial } from "./materials";
import { createLeaft } from "./meshImporter";


const createLight = (color: Color3, position: Vector3) => {
    const light2 = new PointLight("point", position, Engine.LastCreatedScene!);
    light2.diffuse = color;
    light2.specular = color;
    light2.radius = 50;
    light2.range = 50;
    light2.intensity = 1;
    return light2
}


class App {
    constructor() {


        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);
        const leaf = createLeaft();
        const camera = new FreeCamera('camera1', new Vector3(0, 0.1, -10), scene);
        const degree = Math.PI / 180;
        const groundWidth = 100;
        const groundDepth = 1;
        const topGround = MeshBuilder.CreatePlane("topGround", { width: groundWidth, height: groundDepth });
        topGround.material = createMaterial(new Color3(0, 1, 0))
        const bottomGround = MeshBuilder.CreatePlane("bottomGround", { width: groundWidth, height: groundDepth });
        bottomGround.material = createMaterial(new Color3(1, 1, 0))
        const dirt = MeshBuilder.CreatePlane("dirt", { width: groundWidth, height: groundWidth });
        const sky = MeshBuilder.CreatePlane("sky", { width: groundWidth, height: groundWidth });
        dirt.material = createUndergroundMaterial();
        createLight(new Color3(59 / 256, 92 / 256, 113 / 256), new Vector3(5, 4, 2));
        createLight(new Color3(1, 0, 0), new Vector3(-5, 0, 2));
        const m = createMaterial(new Color3(1, 1, 1));
        m.specularColor = Color3.Black();
        sky.material = m;
        dirt.position.y = -groundWidth / 2;
        sky.position.y = groundWidth / 2;
        dirt.position.z = 0;
        sky.position.z = 6;
        topGround.addRotation(degree * 90, 0, 0);
        bottomGround.addRotation(degree * 270, 0, 0);
        camera.attachControl(canvas, true);


        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(0, 1, 1), scene);
        light1.intensity = 0.2;
        const light = new PointLight("point", new Vector3(0, 0, -4), scene);
        const light2 = new PointLight("point", new Vector3(0, 1, -0.2), scene);

        light.radius = 30;
        light.intensity = 0.5;
        // var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
        scene.registerBeforeRender(() => {
            // leaf.addRotation(0, 0.05, 0);
        })
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
        const mainGui = new MainGUI();
        animateFloat(mainGui, "progress", 4, [0, 1]).then(() => console.log("DONE!"));

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();