import * as THREE from 'three';
import { TextureLoader } from 'three';

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

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Enable shadow mapping
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: softer shadows
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshStandardMaterial({ color: GRASS_GREEN });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true; // Cube casts shadow
    scene.add(cube);

    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const textureLoader = new TextureLoader();
    const floorTexture = textureLoader.load('https://threejs.org/examples/textures/terrain/grasslight-big.jpg');
    const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true; // Floor receives shadow
    scene.add(floor);

    // Add a plane to receive shadows
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2.1;
    plane.receiveShadow = true; // Plane receives shadow
    scene.add(plane);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true; // Light casts shadow
    directionalLight.shadow.mapSize.width = 1024; // Optional: increase shadow map resolution
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5; // Optional: adjust shadow camera settings
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    camera.position.y = 1;
    camera.position.z = 10;

    function animate() {
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.05;
        renderer.render(scene, camera);
    }
}