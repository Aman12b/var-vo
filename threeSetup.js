import * as THREE from 'three';
import { TextureLoader } from 'three';

const GRASS_GREEN = 0x55e56f;
const CREAM = 0xfffdd0;

export function setupThreeJS() {
    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();
    document.body.appendChild(renderer.domElement);

    const cube = createCube();
    scene.add(cube);

    const floor = createFloor();
    scene.add(floor);

    const plane = createShadowPlane();
    scene.add(plane);

    addLights(scene);

    camera.position.y = 1;
    camera.position.z = 10;

    function animate() {
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.05;
        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
}

function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(CREAM);
    return scene;
}

function createCamera() {
    return new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
}

function createRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    return renderer;
}

function createCube() {
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshStandardMaterial({ color: GRASS_GREEN });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    return cube;
}

function createFloor() {
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const textureLoader = new TextureLoader();
    const floorTexture = textureLoader.load('https://threejs.org/examples/textures/terrain/grasslight-big.jpg');
    const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    return floor;
}

function createShadowPlane() {
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2.1;
    plane.receiveShadow = true;
    return plane;
}

function addLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);
}