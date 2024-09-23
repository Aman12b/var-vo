import {createCamera, createRenderer, createScene} from './src/world.js';
import {addLights} from './src/lights.js';
import {createCube, createFloor, createShadowPlane} from './src/objects.js';

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