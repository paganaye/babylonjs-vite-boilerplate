import { Color3, Engine, MeshBuilder, PointLight, TransformNode, Vector3 } from "@babylonjs/core";
import { DEGREE } from "./consts";
import { createMaterial, createUndergroundMaterial } from "./materials";
import { Plant } from "./plant";
import { SingleRoot } from "./singleRoot";


const groundWidth = 100;
const groundDepth = 1;

export const createMainStage = () => {
    createGround();
    createSky();
    new Plant();
    let ypos = -1;
    const a = [Vector3.Zero(), new Vector3(0, -1, 0)];
    const root = new SingleRoot([Vector3.Zero(), new Vector3(0, -1, 0)]);

    setInterval(() => {
        ypos -= 0.1;
        a.push(new Vector3((Math.random() - 0.5) * 0.3, ypos, 0))
        root.update(a)
    }, 200)
    createUnderground();
}

function createGround() {
    const root = new TransformNode("ground");

    const topGround = MeshBuilder.CreatePlane("topGround", { width: groundWidth, height: groundDepth });
    const bottomGround = MeshBuilder.CreatePlane("bottomGround", { width: groundWidth, height: groundDepth });
    topGround.material = createMaterial(new Color3(0, 1, 0), "groundTop");
    bottomGround.material = createMaterial(new Color3(1, 1, 0), "groundBottom")
    bottomGround.parent = root;
    topGround.parent = root;

    root.addRotation(DEGREE * 90, 0, 0);
}

function createUnderground() {
    const root = new TransformNode("underground");
    const dirt = MeshBuilder.CreatePlane("dirt", { width: groundWidth, height: groundWidth });
    dirt.material = createUndergroundMaterial();
    dirt.position.y = -groundWidth / 2;
    dirt.position.z = -0;
    const light = new PointLight("point", new Vector3(0, 0, -0.5), Engine.LastCreatedScene!);
    light.radius = 1;
    light.range = 5;
    light.intensity = 1;
    light.parent = root;
    dirt.parent = root;
}


function createSky() {
    const createLight = (color: Color3, position: Vector3, name = "defaultLight") => {
        const light2 = new PointLight(name, position, Engine.LastCreatedScene!);
        light2.diffuse = color;
        light2.specular = color;
        light2.radius = 50;
        light2.range = 50;
        light2.intensity = 1;
        return light2
    }

    const root = new TransformNode("sky");
    const sky = MeshBuilder.CreatePlane("sky", { width: groundWidth, height: groundWidth });
    const m = createMaterial(new Color3(1, 1, 1), "skyMaterial");
    m.specularColor = Color3.Black();
    sky.material = m;
    sky.position.y = groundWidth / 2;
    sky.position.z = 6;
    sky.parent = root;
    const set_Bright = {
        left: "#84FFF4",
        right: "#5785A6"
    }
    const set_RedBlue = {
        left: "#ff0000",
        right: "#28335F"
    }
    const set_Orange = {
        left: "#F28A2F",
        right: "#45699C"
    }
    createLight(Color3.FromHexString(set_Orange.right), new Vector3(5, 4, 2), "dark").parent = root;
    createLight(Color3.FromHexString(set_Orange.left), new Vector3(-5, 0, 2), "red").parent = root;
}



