import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 35, window.innerWidth/window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

renderer.render (scene, camera);

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color: 0x80b5ff});
const torus = new THREE.Mesh(geometry, material);
torus.position.set(-35,-5,-50)
scene.add(torus)

const geometry2 = new THREE.BoxGeometry(10,3,16,100)
const material2 = new THREE.MeshStandardMaterial({color: 0xebe971})
const torus2 = new THREE.Mesh(geometry2, material2)
torus2.scale.set(2,2,2)
torus2.position.set(70,-30,-100)
scene.add(torus2)

const loader = new GLTFLoader();
loader.load('computadora/scene.gltf', function (gltf){
  gltf.scene.scale.multiplyScalar(1500 / 100); // adjust scalar factor to match your scene scale
  gltf.scene.position.x = 15; // once rescaled, position the model where needed
  gltf.scene.position.y = -15;
  gltf.scene.position.z = -40;
  gltf.scene.rotation.y = 5.5;
  scene.add( gltf.scene );
}, undefined, function (error){
  console.error(error)
});

const pointLight = new THREE.PointLight(0x404040)
pointLight.position.set(0,0,0)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

//const lightHelper = new THREE.PointLightHelper(pointLight)
//scene.add(lightHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addThings(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffff69} )
  const thing = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  thing.position.set(x,y,z);
  scene.add(thing)
}

Array(200).fill().forEach(addThings)

const bkgnTexture = new THREE.TextureLoader().load('Background.jpg');
scene.background = bkgnTexture;

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  torus2.rotation.x += 0.02;
  torus2.rotation.y += 0.006;
  torus2.rotation.z += 0.01;

  controls.update();

  renderer.render(scene,camera);
}

animate()