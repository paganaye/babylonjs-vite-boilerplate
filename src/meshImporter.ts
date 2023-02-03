import { Color3, MeshBuilder, StandardMaterial, TransformNode, Vector3, VertexBuffer } from "@babylonjs/core";
import { DEGREE } from "./consts";
import { createMaterial } from './materials';






export class Plant {
    static leavesCreated = 0;
    static material: StandardMaterial;

    static GetPlantBase() {

        const sphere = MeshBuilder.CreateSphere("plantBase", { segments: 1, diameter: 0.7 });
        sphere.material = this.getPlantMaterial();;
        return sphere

    }
    static GetLeaft() {

        const stemNode = new TransformNode("stemNode")
        const stem = MeshBuilder.CreateCylinder("steam", { height: 2, diameterBottom: 0.2, diameterTop: 0.1, updatable: true, tessellation: 4 });
        stem.material = this.getPlantMaterial();;

        const leaf = MeshBuilder.CreateCylinder("leaf", { height: 2, diameterBottom: 1, diameterTop: 1, updatable: true, tessellation: 5, subdivisions: 4 });
        leaf.material = this.getPlantMaterial();;
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
                const key = (arr[i + 1].toString()) as unknown as keyof typeof map;
                const y = map[key]
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
    }

    static getPlantMaterial() {
        if (Plant.material) {
            return Plant.material;
        }
        Plant.material = createMaterial(Color3.FromHexString("#5EED5E"), "leaf");
        Plant.material.specularPower = 5.7000;
        Plant.material.diffuseColor = Color3.FromHexString("#4BBD4B");
        Plant.material.emissiveColor = Color3.FromHexString("#183A2B");
        Plant.material.ambientColor = Color3.FromHexString("#407D3A");
        Plant.material.specularColor = Color3.FromHexString("#263D1C");
        return Plant.material
    }
}