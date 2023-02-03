import { Color3, Engine, StandardMaterial, Texture } from "@babylonjs/core";


export const createMaterial = (color: Color3, name = 'default') => {
    const scene = Engine.LastCreatedScene;
    const material = new StandardMaterial(name, scene!);
    material.alpha = 1;
    material.diffuseColor = color
    return material
}

export const createUndergroundMaterial = () => {
    const mat = new StandardMaterial("underground")
    const scale = 16;
    const textures = []
    const diff = new Texture("./textures/forest_ground_04_diff_1k.jpg");
    const amb = new Texture("./textures/forest_ground_04_ao_1k.jpeg");
    const norm = new Texture("./textures/forest_ground_04_nor_gl_1k.jpeg");

    mat.diffuseTexture = diff;
    mat.ambientTexture = amb;

    textures.push(diff)
    textures.push(amb)
    textures.push(norm)

    mat.specularPower = 180;

    textures.forEach(tex => {
        tex.uScale = scale;
        tex.vScale = scale;
    })

    return mat;
}