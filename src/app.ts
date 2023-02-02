import { Color3, Engine, FreeCamera, HemisphericLight, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";

const createMaterial = (scene, color) => {
    const material = new StandardMaterial(scene);
    material.alpha = 1;
    material.diffuseColor = color
    return material
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

        // var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        // camera.position.set(0, 0, 0);
        const degree = Math.PI / 180;
        const camera = new FreeCamera('camera1', new Vector3(0, 0, -10), scene);
        const groundWidth = 100;
        const groundDepth = 1;
        const topGround = MeshBuilder.CreatePlane("topGround", { width: groundWidth, height: groundDepth });
        topGround.material = createMaterial(scene, new Color3(0, 1, 0))
        const bottomGround = MeshBuilder.CreatePlane("bottomGround", { width: groundWidth, height: groundDepth });
        bottomGround.material = createMaterial(scene, new Color3(1, 1, 0))
        const dirt = MeshBuilder.CreatePlane("dirt", { width: groundWidth, height: groundWidth });
        const sky = MeshBuilder.CreatePlane("sky", { width: groundWidth, height: groundWidth });
        dirt.material = createMaterial(scene, new Color3(0, 0, 0));
        sky.material = createMaterial(scene, new Color3(0, 0, 1));
        dirt.position.y = -groundWidth / 2;
        sky.position.y = groundWidth / 2;
        dirt.position.z = 1;
        sky.position.z = 1;

        topGround.addRotation(degree * 90, 0, 0);
        bottomGround.addRotation(degree * 270, 0, 0);
        // camera.attachControl(canvas, true);


        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
        // scene.registerBeforeRender(() => {
        //     bottomGround.addRotation(0.05, 0, 0);
        //     topGround.addRotation(0.05, 0, 0);
        // })
        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'i') {
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