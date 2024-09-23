import * as THREE from 'three';
import { TextureLoader } from 'three';

const GRASS_GREEN = 0x55e56f;

export function createCube() {
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshStandardMaterial({ color: GRASS_GREEN });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    return cube;
}

export function createFloor() {
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const textureLoader = new TextureLoader();
    const floorTexture = textureLoader.load('https://threejs.org/examples/textures/lava/lavatile.jpg');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 4); // Adjust the repeat to fit the plane size
    const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    return { floor, floorTexture };
}

export function createShadowPlane() {
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2.1;
    plane.receiveShadow = true;
    return plane;
}