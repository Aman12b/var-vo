import * as THREE from 'three';

const CREAM = 0xfffdd0;

export function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(CREAM);
    return scene;
}

export function createCamera() {
    return new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
}

export function createRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    return renderer;
}