import { Mesh, MeshBuilder, Vector3 } from "@babylonjs/core";

export class SingleRoot {
    tube: Mesh
    constructor() {
        const makeCurve = (range: any, nbSteps: any) => {
            const path = [];
            const stepSize = range / nbSteps;
            for (let i = -range / 2; i < range / 2; i += stepSize) {
                let t = i / Math.PI * 2;
                let x = Math.sin(t) + i;
                path.push(new Vector3(x, 0, 0))
            }
            return path;
        };
        const length = 3;
        const segments = 10;
        const curve = makeCurve(length, segments);

        const radiusChange = (index: any, distance: any) => {
            const radius = (distance / length) * 0.1;
            return radius;
        };

        this.tube = MeshBuilder.CreateTube("tube", { path: curve, radiusFunction: radiusChange, sideOrientation: Mesh.DOUBLESIDE });

    }
}