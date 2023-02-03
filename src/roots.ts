import {
  AbstractMesh,
  Mesh,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";

export class Roots {
  scene: Scene;
  isDragging = false;
  timer = null;
  currentMousePosition = Vector3.Zero();
  roots?: Mesh;
  sphere?: Mesh;

  constructor(scene: Scene) {
    this.scene = scene;
    this.roots = MeshBuilder.CreateBox("baseRoot", { size: 0.4 }, this.scene);
    this.roots.position.y = -0.2;
  }

  // on click on other roots create sphere on mouse location
  // that goes to mouse possition moves at speed of 1

  getIsDragging() {
    return this.isDragging;
  }

  isMeshInRoots(mesh: AbstractMesh) {
    return mesh === this.roots;
  }

  createSphere() {
    this.sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 0.7 },
      this.scene
    );

    this.isDragging = true;
  }

  deleteSphere() {
    this.isDragging = false;
    this.sphere.dispose();
  }

  moveSphere(position: Vector3) {
    this.sphere.position = position;
  }
}
