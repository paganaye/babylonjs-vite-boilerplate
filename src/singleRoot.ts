import { Mesh, MeshBuilder, Vector3 } from "@babylonjs/core";
import { Plant } from "./plant";

export class SingleRoot {
  path: Vector3[] = [];
  // @ts-ignore
  tube: Mesh;

  constructor(initialPath: Vector3[] = [Vector3.Zero(), Vector3.Zero()]) {
    this.update(initialPath, true);
  }

  update(path: Vector3[], init?: boolean) {
    if (!init) {
      this.tube.dispose();
    }
    this.path = path;
    const segments = path.length;
    const radiusChange = (index: any) => {
      const radius = ((segments - 1 - index) / segments) * 0.1;
      return radius;
    };
    this.tube = MeshBuilder.CreateTube("tube", {
      path,
      radiusFunction: radiusChange,
      sideOrientation: Mesh.DOUBLESIDE,
      updatable: true,
    });
    this.tube.material = Plant.instance.material;
  }
}
