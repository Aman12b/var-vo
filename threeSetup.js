import * as THREE from 'three';
import {TextureLoader} from "three";

const GRASS_GREEN = 0x55e56f;

const CREAM = 0xfffdd0;

/**
 * Sets up a basic Three.js scene with a rotating cube.
 *
 * This function initializes a Three.js scene, camera, and renderer. It creates a cube
 * and adds it to the scene. The cube is animated to rotate continuously.
 */
export function setupThreeJS() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(CREAM);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshBasicMaterial({color: GRASS_GREEN});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const textureLoader = new TextureLoader();
    const floorTexture = textureLoader.load('https://threejs.org/examples/textures/terrain/grasslight-big.jpg');
    const floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture});
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    scene.add(floor);

    camera.position.y = 1;
    camera.position.z = 10;

    function animate() {
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.05;
        renderer.render(scene, camera);
    }
}