import { Color3, MeshBuilder, StandardMaterial, TransformNode, Vector3 } from "@babylonjs/core";
import { createMaterial } from './materials';


let mat: StandardMaterial;

export const createLeaft = () => {
    if (!mat) {
        mat = createMaterial(Color3.FromHexString("#5EED5E"), "leaf");
    }
    mat.specularPower = 128.0000;
    mat.emissiveColor = Color3.FromHexString("#183A2B");
    mat.ambientColor = Color3.FromHexString("#407D3A");
    const leafScale = 0.6;
    const degree = Math.PI / 180;
    const root = new TransformNode("leafRoot")
    const leaf = new TransformNode("leafBase")
    const cylinder = MeshBuilder.CreateCylinder("lefStem", { height: 2, diameterBottom: 0.2, diameterTop: 0.1 });
    cylinder.material = mat;
    cylinder.parent = root;
    cylinder.position.y = 0.1;

    const arr = [0, 2, 3, 2.7, 2];
    const height = 1;
    let base = leaf;
    const pieces = arr.map((diameterBottom, index) => {
        const diameterTop = index === arr.length - 1 ? 0 : arr[index + 1];
        const mesh = MeshBuilder.CreateCylinder("a", { height, diameterBottom, diameterTop });
        mesh.material = mat;
        const pieceBase = new TransformNode("a");
        mesh.parent = pieceBase;

        mesh.scaling.z = 0.2;
        pieceBase.setPivotPoint(new Vector3(0, 0, 0));
        pieceBase.parent = base;
        base = pieceBase;
        return pieceBase;
    })
    pieces.forEach((trans, i) => {
        trans.position.y = i ? 1 : 0;
        trans.position.z = 0.1;
        trans.addRotation(degree * 10, 0, 0)
    })
    leaf.addRotation(degree * 20, 0, 0);
    leaf.position.y = 1.5;
    leaf.parent = root;
    root.scaling.set(leafScale, leafScale, leafScale)
    root.addRotation(degree * 30, degree * 45, 0);
    const masterRoot = new TransformNode("leafRoot");
    root.parent = masterRoot;
    root.position.y = 0.5;
    return masterRoot;
}
