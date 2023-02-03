import { Color3, MeshBuilder, StandardMaterial, TransformNode, Vector3, VertexBuffer } from "@babylonjs/core";
import { DEGREE } from "./consts";
import { createMaterial } from './materials';


let mat: StandardMaterial;




export class Plant {
    static leavesCreated = 0;
    static material: StandardMaterial;

    static GetPlantBase() {
        if (!Plant.material) {
            Plant.material = createMaterial(Color3.FromHexString("#5EED5E"), "leaf");
        }
        const sphere = MeshBuilder.CreateSphere("plantBase", { segments: 1, diameter: 1 });
        sphere.material = Plant.material;
        return sphere

    }
    static GetLeaft() {
        if (!Plant.material) {
            Plant.material = createMaterial(Color3.FromHexString("#5EED5E"), "leaf");
        }
        const mat = Plant.material;
        mat.specularPower = 128.0000;
        mat.emissiveColor = Color3.FromHexString("#183A2B");
        mat.ambientColor = Color3.FromHexString("#407D3A");
        // const leafScale = 0.6;
        // const degree = Math.PI / 180;
        const stemNode = new TransformNode("stemNode")
        const stem = MeshBuilder.CreateCylinder("steam", { height: 2, diameterBottom: 0.2, diameterTop: 0.1, updatable: true, tessellation: 4, subdivisions: 4 });
        stem.material = mat;

        // cylinder.position.y = 0.1;
        const leaf = MeshBuilder.CreateCylinder("leaf", { height: 2, diameterBottom: 1, diameterTop: 1, updatable: true, tessellation: 4, subdivisions: 4 });
        leaf.material = mat;
        leaf.setPivotPoint(new Vector3(0, -1, 0));
        const vertices = leaf.getVerticesData(VertexBuffer.PositionKind);
        const map = {
            ['-1']: 0,
            ['-0.5']: 1,
            ['0']: 1.5,
            ['0.5']: 1.2,
            ['1']: 0,
        }
        vertices!.forEach((v, i, arr) => {
            if (i % 3 === 0) {
                // console.log(arr[i], arr[i + 1], arr[i + 2]);
                const y = map[arr[i + 1].toString()]
                console.log(y)
                arr[i] *= y;
                arr[i + 2] *= 0.2 * y;

            }
        })

        leaf.setVerticesData(VertexBuffer.PositionKind, vertices!)
        leaf.addRotation(DEGREE * 30, 0, 0)
        stem.position.y = 1;
        leaf.position.y = 2.8;
        stem.parent = stemNode;
        leaf.parent = stemNode;

        return stemNode;
        /**
                console.log(cylinder2.getVerticesData(VertexBuffer.PositionKind));
                console.log(cylinder2.getIndices());
        
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
                // root.addRotation(degree * 30, degree * 45, 0);
                const masterRoot = new TransformNode("leaf" + this.leavesCreated + 1);
                root.parent = masterRoot;
                root.position.y = 0.5;
                return masterRoot;
                 */
    }
}