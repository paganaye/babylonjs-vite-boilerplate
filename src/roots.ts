import {
  AbstractMesh,
  Mesh,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { SingleRoot } from "./singleRoot";

export class Roots {
  scene: Scene;
  isDragging = false;
  timer?: NodeJS.Timer;
  currentMousePosition = Vector3.Zero();
  rootsPoints: Vector3[][] = [[Vector3.Zero()]];
  currentRoot: number = 0;
  roots: SingleRoot[] = [];
  sphere!: Mesh;
  rootSpeed = 0.015;

  baseRoot: Mesh;

  constructor(scene: Scene) {
    this.scene = scene;
    this.baseRoot = MeshBuilder.CreateBox(
      "baseRoot",
      { size: 0.4 },
      this.scene
    );
    this.baseRoot.position.y = -0.2;
  }

  getIsDragging() {
    return this.isDragging;
  }

  isMeshInRoots(mesh: AbstractMesh) {
    return (
      this.baseRoot === mesh || this.roots.some((root) => root.tube === mesh)
    );
  }

  addRoot() {
    this.currentRoot += 1;
    this.rootsPoints.push([]);
    this.addRootPoint();
    this.roots[this.currentRoot] = new SingleRoot();
  }

  addRootPoint() {
    this.rootsPoints[this.currentRoot].push(this.sphere.position.clone());
  }

  addTime() {
    this.timer = setInterval(() => {
      this.addRootPoint();
    }, 300);
  }

  createSphere(position: Vector3) {
    this.sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 0.7 },
      this.scene
    );
    this.sphere.visibility = 0;
    this.sphere.position = position;
    this.isDragging = true;
    return this.sphere;
  }

  deleteSphere() {
    this.sphere.dispose();
    clearInterval(this.timer);
    this.isDragging = false;
  }

  moveSphere() {
    if (this.isDragging) {
      const direction = this.currentMousePosition.subtract(
        this.sphere.position
      );
      const distance = direction.length();
      direction.normalize();

      // Move the sphere in the direction of the mouse with speed 1
      if (distance > 0.1) {
        this.sphere?.moveWithCollisions(
          new Vector3(
            direction.x * this.rootSpeed,
            direction.y * this.rootSpeed,
            0
          )
        );
        this.roots[this.currentRoot].update([
          ...this.rootsPoints[this.currentRoot],
          this.sphere.position,
        ]);
      }
    }
  }

  updateMousePosition(position: Vector3) {
    this.currentMousePosition = position;
  }
}
