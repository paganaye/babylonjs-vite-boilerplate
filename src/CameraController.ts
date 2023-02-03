import { Camera, Engine, Mesh, TransformNode } from "@babylonjs/core";
import { animateTo, animateToVector } from "./animations";

const REGULAR_ZOOM = -12;
const CLOSE_UP = -5;

export class CameraConrtoller {
  cameraContainer: TransformNode;
  target?: Mesh;
  constructor(camera: Camera) {
    this.cameraContainer = new TransformNode("cameraNode");

    camera.parent = this.cameraContainer;
    this.cameraContainer.position.set(0, 0.1, REGULAR_ZOOM);
    Engine.LastCreatedScene?.onBeforeRenderObservable.add(() => {
      if (this.target) {
        const diff = this.target.position.subtract(this.cameraContainer.position);
        diff.z = 0;

        this.cameraContainer.position.x += diff.x / 4;
        this.cameraContainer.position.y += diff.y / 4;
      }
    });
  }
  startFollow = (target: Mesh) => {
    this.target = target;
    animateTo(this.cameraContainer, "position.z", 1, [REGULAR_ZOOM, CLOSE_UP]);
  };
  stopFollow = () => {
    this.target = undefined;
    animateTo(this.cameraContainer, "position.z", 1, [CLOSE_UP, REGULAR_ZOOM]);
  };
}
