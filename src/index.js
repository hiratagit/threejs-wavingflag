import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shaders/vertexShader";
import fragmentShader from "./shaders/fragmentShader";
import GUI from "lil-gui";
import jpFlag from "./textures/jp-flag.png";

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(jpFlag);

// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);


// Material
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uFrequency: { value: new THREE.Vector2(10, 5) },
    uTime : { value: 0 },
    uColor: { value: new THREE.Color('violet')},
    uTex: { value: texture }
  },
  transparent: true,
  side: THREE.DoubleSide,
});


// Mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.scale.y = 2 / 3;
scene.add(mesh);

// デバッグ
const gui = new GUI({width: 300 });
gui.add(material.uniforms.uFrequency.value, "x", 0, 50, 1).listen();
gui.add(material.uniforms.uFrequency.value, "y", 0, 50, 1).listen();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

let cameraPositionScale = Math.max(1.0, 0.6 + (1280 / window.innerWidth) * 0.35 );
camera.position.set(0.25, -0.25, cameraPositionScale);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const animate = () => {
  //時間取得
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsedTime;


  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
