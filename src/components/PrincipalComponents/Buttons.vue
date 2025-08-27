<template>
  <div class="buttonCard">
    <div ref="container" class="three-container"></div>
    <v-sheet class="cardTitle" color="transparent" width="100" height="100" style="text-align: center; align-content: center;" >
        <span class="titleDodecahedrom" :style="'color:' + colorText" >{{ title }}</span>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import { COLOR } from "@/const/colors";


const props = defineProps({
  title: { required: true, type: String },
  colorDodecaedro: { required: true, type: String },
  colorCard: { required: true, type: String },
  colorText: { default: 'white', type: String}
})

const container = ref<HTMLDivElement | null>(null);

// Variables Three.js
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let button3D: THREE.Object3D | null = null;
let raycaster: THREE.Raycaster;
let mouse: THREE.Vector2;

const init = () => {
  if (!container.value) return;

  // Escena
  scene = new THREE.Scene();
  scene.background = new THREE.Color(COLOR.background);

  // Cámara
  camera = new THREE.PerspectiveCamera(
    50,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    100
  );
  camera.position.z = 5;

  // Render
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  // Controles
  controls = new OrbitControls(camera, renderer.domElement);

  // Luces
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  // Raycaster
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Cargar modelo .obj
  const loader = new OBJLoader();
  loader.load(
    "/SmartlinkRAOS/dodeca_button.obj", // Ajusta la ruta de tu archivo
    (object) => {
      object.scale.set(5, 5, 5);
      object.position.set(0, 0, 0);

      object.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
            color: props.colorDodecaedro,
          });
        }
      });

      scene.add(object);
      button3D = object;
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% cargado");
    },
    (error) => {
      console.error("Error cargando modelo:", error);
    }
  );

  // Listener click
  window.addEventListener("click", onMouseClick);
  window.addEventListener("resize", onResize);

  animate();
};

const onMouseClick = (event: MouseEvent) => {
  if (!container.value || !button3D) return;

  mouse.x = (event.clientX / container.value.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / container.value.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(button3D, true);
  if (intersects.length > 0) {
    alert("¡Botón 3D clickeado en Vue 3!");
  }
};

const onResize = () => {
  if (!container.value) return;
  // camera.aspect = container.value.clientWidth / container.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
};

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  window.removeEventListener("click", onMouseClick);
  window.removeEventListener("resize", onResize);
  if (renderer) renderer.dispose();
});
</script>

<style scoped>
.buttonCard {
  position: relative;
}
.buttonCard:hover{
  cursor: pointer;
}
.cardTitle{
  position: absolute;
  z-index: 2;
  top: 0;
}
.three-container {
  width: 100px;
  height: 100px;
  overflow: hidden;
  background-color: transparent !important;
  position: relative;
}
</style>