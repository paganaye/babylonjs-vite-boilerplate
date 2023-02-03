// import { CreateGround } from "@babylonjs/core"

import { Color3, Engine, MeshBuilder, PointLight, TransformNode, Vector3 } from "@babylonjs/core";
import { DEGREE } from "./consts";
import { createMaterial, createUndergroundMaterial } from "./materials";
import { Plant } from "./meshImporter";


const groundWidth = 100;
const groundDepth = 1;

export const createMainStage = () => {
    createGround();
    createSky();
    createPlant();
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
    dirt.position.z = 0;
    const light = new PointLight("point", new Vector3(0, 0, -4), Engine.LastCreatedScene!);
    light.radius = 30;
    light.intensity = 0.5;
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
    const root = new TransformNode("ground");
    const sky = MeshBuilder.CreatePlane("sky", { width: groundWidth, height: groundWidth });
    const m = createMaterial(new Color3(1, 1, 1), "skyMaterial");
    m.specularColor = Color3.Black();
    sky.material = m;
    sky.position.y = groundWidth / 2;
    sky.position.z = 6;
    sky.parent = root;
    createLight(Color3.FromHexString("#28335F"), new Vector3(5, 4, 2), "dark").parent = root;
    createLight(Color3.FromHexString("#ff0000"), new Vector3(-5, 0, 2), "red").parent = root;
}

function createPlant() {
    const root = new TransformNode("plant");
    const small = Plant.GetLeaft();
    const big = Plant.GetLeaft();
    const base = Plant.GetPlantBase();

    big.rotation.set(15 * DEGREE, 135 * DEGREE, 0)
    small.rotation.set(15 * DEGREE, -90 * DEGREE, 0)
    small.scaling.set(0.3, 0.3, 0.3);
    big.scaling.set(0.5, 0.5, 0.5);
    base.position.set(0, -0.2, 0);
    base.scaling.set(0.7, 0.7, 0.7);

    base.parent = root;
    small.parent = root;
    big.parent = root;
}

