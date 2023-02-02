import { Color3, MeshBuilder, TransformNode, Vector3 } from "@babylonjs/core";
import { createMaterial } from './materials';


const colorMesh = (mesh) => {

    mesh.material = createMaterial(new Color3(0, 1, 0));
}

export const createLeaft = () => {

    const degree = Math.PI / 180;
    const root = new TransformNode("leafRoot")
    const leaf = new TransformNode("leafBase")
    const cylinder = MeshBuilder.CreateCylinder("a", { height: 2, diameterBottom: 0.2, diameterTop: 0.1 });
    colorMesh(cylinder);
    cylinder.parent = root;

    const arr = [0, 2, 3, 2.7, 2];
    const height = 1;
    let base = leaf;
    const pieces = arr.map((diameterBottom, index) => {
        const diameterTop = index === arr.length - 1 ? 0 : arr[index + 1];
        const mesh = MeshBuilder.CreateCylinder("a", { height, diameterBottom, diameterTop });
        colorMesh(mesh);
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
    const leafScale = 0.6;
    leaf.addRotation(degree * 20, 0, 0);
    leaf.position.y = 0.8;
    leaf.parent = root;
    root.scaling.set(leafScale, leafScale, leafScale)
    root.addRotation(degree * 20, degree * 20, 0);
    const masterRoot = new TransformNode("leafRoot");
    root.parent = masterRoot;
    root.position.y = 0.5;
    return masterRoot;
}
