import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render (scene, camera);

//const geometry = new THREE.TorusGeometry(10,3,16,100)
//const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
//const torus = new THREE.Mesh(geometry, material);

//scene.add(torus)

const loader = new GLTFLoader();
loader.load('computadora/scene.gltf', function (gltf){
  gltf.scene.scale.set(10,10,10) // scale here
  scene.add( gltf.scene );
}, undefined, function (error){
  console.error(error)
});

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
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

  //torus.rotation.x += 0.01;
  //torus.rotation.y += 0.005;
  //torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene,camera);
}

animate()