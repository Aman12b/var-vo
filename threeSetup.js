import {createCamera, createRenderer, createScene} from './src/world.js';
import {addLights} from './src/lights.js';
import {createCube, createFloor, createShadowPlane} from './src/objects.js';
import * as THREE from 'three';

export function setupThreeJS() {
    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();
    document.body.appendChild(renderer.domElement);

    const cube = createCube();
    scene.add(cube);

    const {floor, floorTexture} = createFloor();
    scene.add(floor);

    const plane = createShadowPlane();
    scene.add(plane);

    addLights(scene);

    camera.position.y = 1;
    camera.position.z = 10;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const pointerShadow = createPointerShadow();
    scene.add(pointerShadow);

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function createPointerShadow() {
        const geometry = new THREE.SphereGeometry(0.1, 32, 32);
        const material = new THREE.MeshStandardMaterial({color: 0x000000});
        const sphere = new THREE.Mesh(geometry, material);
        sphere.castShadow = true;
        return sphere;
    }

    function animate() {
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.05;
        floorTexture.offset.y += 0.01; // Animate the lava texture

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(floor);
        if (intersects.length > 0) {
            pointerShadow.position.copy(intersects[0].point);
            pointerShadow.position.y += 0.1; // Slightly above the floor
        }

        renderer.render(scene, camera);
    }

    window.addEventListener('mousemove', onMouseMove, false);
    renderer.setAnimationLoop(animate);
}