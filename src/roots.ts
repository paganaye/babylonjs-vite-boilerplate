import {
  AbstractMesh,
  Mesh,
  MeshBuilder,
  PointerEventTypes,
  Scene,
  Vector3,
} from "@babylonjs/core";

export class Roots {
  scene: Scene;
  isDragging = false;
  timer?: NodeJS.Timer;
  currentMousePosition = Vector3.Zero();
  rootsPoints: Vector3[][] = [[Vector3.Zero()]];
  currentRoot: number = 0;
  roots: Mesh[] = [];
  sphere!: Mesh;
  rootSpeed = 0.015;

  constructor(scene: Scene) {
    this.scene = scene;
    this.roots[this.currentRoot] = MeshBuilder.CreateBox(
      "baseRoot",
      { size: 0.4 },
      this.scene
    );
    this.roots[this.currentRoot].position.y = -0.2;
  }

  getIsDragging() {
    return this.isDragging;
  }

  isMeshInRoots(mesh: AbstractMesh) {
    return this.roots.some((root) => root === mesh);
  }

  addRoot() {
    this.currentRoot += 1;
    this.rootsPoints.push([]);
    this.addRootPoint();
  }

  addRootPoint() {
    this.rootsPoints[this.currentRoot].push(this.sphere.position.clone());
  }

  addTime() {
    this.timer = setInterval(() => {
      this.addRootPoint();
    }, 500);
  }

  createSphere(position: Vector3) {
    this.sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 0.7 },
      this.scene
    );
    this.sphere.position = position;
    this.isDragging = true;
  }

  deleteSphere() {
    this.sphere.dispose();
    clearInterval(this.timer);
    this.isDragging = false;
    this.rootsPoints[this.currentRoot].forEach((point) => {
      const box = MeshBuilder.CreateBox(`box`, { size: 0.1 }, this.scene);
      box.position = point;
      this.roots.push(box);
    });
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
      }
    }
  }

  updateMousePosition(position: Vector3) {
    this.currentMousePosition = position;
  }
}
