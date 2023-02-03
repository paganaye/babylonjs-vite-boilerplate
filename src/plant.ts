import { Color3, Color4, Engine, MeshBuilder, ParticleSystem, StandardMaterial, Texture, TransformNode, Vector3, VertexBuffer } from "@babylonjs/core";
import { animateToVector } from "./animations";
import { DEGREE } from "./consts";
import { createMaterial } from './materials';






export class Plant {
    leavesCreated = 0;
    material: StandardMaterial;
    root: TransformNode;
    pairs: TransformNode[]
    static instance: Plant;
    particle: ParticleSystem;

    constructor() {
        this.root = new TransformNode("plant");
        this.material = this.getPlantMaterial();
        const base = this.getPlantBase();
        this.pairs = []
        this.particle = this.initParticles();
        this.addPairOfLeaves(-90);
        setTimeout(() => {
            this.addPairOfLeaves(0);
        }, 4000)
        setTimeout(() => {
            this.addPairOfLeaves(90);
        }, 8000)
        base.position.set(0, -0.2, 0);

        base.parent = this.root;
        Plant.instance = this;
    }

    initParticles = () => {
        const particleSystem = new ParticleSystem("particles", 2000, Engine.LastCreatedScene!);

        particleSystem.particleTexture = new Texture("./textures/Flare.png");
        particleSystem.emitRate = 40;
        particleSystem.minSize = 0.005;
        particleSystem.minSize = 0.2;
        particleSystem.color1 = Color4.FromHexString("#8888ff");
        particleSystem.color2 = Color4.FromHexString("#0088ff");
        particleSystem.emitter = new Vector3(0, 0.5, 0);
        return particleSystem;

    }
    private addPairOfLeaves = (baseRotation: number) => {
        const pair = new TransformNode("pairOfLeaves");
        const small = this.createLeaf();
        const big = this.createLeaf();

        this.particle.start();
        setTimeout(() => {
            this.particle.stop();
        }, 1500)
        big.rotation.set(15 * DEGREE, (180 + baseRotation) * DEGREE, 0)
        small.rotation.set(15 * DEGREE, baseRotation * DEGREE, 0)
        const smallSize = 0.25 + (Math.random() / 10);
        const bigSize = 0.3 + (Math.random() / 5);
        small.scaling.set(0, 0, 0);
        big.scaling.set(0, 0, 0);
        animateToVector(big, "scaling", 2, [Vector3.Zero(), new Vector3(bigSize, bigSize, bigSize)])
        animateToVector(small, "scaling", 2, [Vector3.Zero(), new Vector3(smallSize, smallSize, smallSize)])



        small.parent = pair;
        big.parent = pair;
        this.pairs.forEach((p, i) => {
            const scale = 1.2;
            p.getChildTransformNodes().forEach(c => {
                animateToVector(c, "scaling", 2, [c.scaling, c.scaling.multiplyByFloats(scale, scale, scale)])
                animateToVector(c, "rotation", 2, [c.rotation, c.rotation.multiplyByFloats(scale, scale, 1)])
            })
        })
        this.pairs.push(pair);
        return pair;
    }

    private getPlantBase() {
        const sphere = MeshBuilder.CreateSphere("plantBase", { segments: 1, diameter: 0.7 });
        sphere.material = this.material
        return sphere
    }

    private createLeaf() {

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
        leaf.addRotation(DEGREE * 15, 0, 0)
        stem.position.y = 1;
        leaf.position.y = 2.8;
        stem.parent = stemNode;
        leaf.parent = stemNode;

        return stemNode;
    }

    getPlantMaterial() {
        const mat = createMaterial(Color3.FromHexString("#5EED5E"), "leaf");
        mat.specularPower = 5.7000;
        mat.diffuseColor = Color3.FromHexString("#4BBD4B");
        mat.emissiveColor = Color3.FromHexString("#183A2B");
        mat.ambientColor = Color3.FromHexString("#407D3A");
        mat.specularColor = Color3.FromHexString("#263D1C");
        return mat
    }
}