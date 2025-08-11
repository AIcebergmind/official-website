// /js/iceberg-viewer.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// Opzionali se il GLB è compresso:
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const MODEL_URL = '/iceberg.glb'; // <-- aggiorna questo path
const DEBUG = true;            // false in produzione
const LOAD_TIMEOUT_MS = 15000; // messaggio "rete lenta" dopo 15s

const container = document.getElementById('iceberg-viewport');
const loaderEl  = document.getElementById('iceberg-loader');
if (!container) throw new Error('Missing #iceberg-viewport in DOM');

let renderer, scene, camera, controls, model, boxHelper;

// Progress manager (fluido, funziona anche senza Content-Length)
const prog = SmoothProgress(
  (p) => { if (loaderEl) loaderEl.textContent = `Loading… ${Math.round(p)}%`; },
  ()  => fadeOutLoader()
);

init();
preflightThenLoad(MODEL_URL);
render();

function init(){
  if (DEBUG) container.classList.add('debug');

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  resizeRenderer();
  container.appendChild(renderer.domElement);

  // Scene & Camera
  scene = new THREE.Scene();
  const fov = window.matchMedia('(max-width: 768px)').matches ? 38 : 32;
  camera = new THREE.PerspectiveCamera(fov, aspect(), 0.01, 1000);
  camera.position.set(0.6, 0.4, 2.2);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const dir = new THREE.DirectionalLight(0xffffff, 0.9);
  dir.position.set(2, 2, 2);
  scene.add(dir);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.target.set(0, 0.35, 0);

  // Events
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) autoRotate.set(false);
  });
  container.addEventListener('pointerdown', () => autoRotate.toggle());

  // Pause quando fuori viewport
  const io = new IntersectionObserver(([entry]) => {
    autoRotate.set(entry.isIntersecting);
  }, { threshold: 0.1 });
  io.observe(container);
}

async function preflightThenLoad(url){
  // HEAD check: se fallisce per CORS, proseguiamo comunque
  try {
    const head = await fetch(url, { method: 'HEAD' });
    if (!head.ok) throw new Error(`HTTP ${head.status}`);
  } catch (e) {
    console.warn('[GLB HEAD check warning]', e);
  }
  await loadModel(url);
}

function loadModel(url){
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    // Opzionali se usi compressione:
    // const draco = new DRACOLoader();
    // draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    // loader.setDRACOLoader(draco);
    // loader.setMeshoptDecoder(MeshoptDecoder);

    const slowTimer = setTimeout(() => {
      if (loaderEl) loaderEl.textContent = 'Loading… (rete lenta?)';
    }, LOAD_TIMEOUT_MS);

    loader.load(
      url,
      (gltf) => {
        clearTimeout(slowTimer);

        model = gltf.scene || gltf.scenes?.[0];
        applyFallbackMaterial(model, 0x5EE4C3); // colore fallback
        normalizeAndCenter(model, 1.4);         // scala/centra il modello
        scene.add(model);

        // Fit aggressivo della camera e dei controls
        fitCameraToObject(camera, model, controls, 1.25);

        // Helper 3D in debug
        if (DEBUG) {
          boxHelper = new THREE.Box3Helper(new THREE.Box3().setFromObject(model), 0xff00ff);
          scene.add(boxHelper);
        }

        prog.to(100);
        resolve();
      },
      (evt) => onProgress(evt),
      (err) => {
        clearTimeout(slowTimer);
        if (loaderEl) loaderEl.textContent = 'Errore nel caricamento del modello';
        console.error('[GLB load error]', err);
        setTimeout(() => fadeOutLoader(), 1000);
        reject(err);
      }
    );
  });
}

function onProgress(evt){
  if (evt && evt.total) {
    const p = (evt.loaded / evt.total) * 100;
    prog.to(Math.max(5, p)); // parti almeno da 5% per feedback visivo
  } else {
    // Nessun total: avanza dolcemente fino a ~90%
    prog.to(90);
  }
}

function applyFallbackMaterial(obj, color){
  obj.traverse((c) => {
    if (c.isMesh) {
      const hasMat = !!c.material && (!Array.isArray(c.material) || c.material.length > 0);
      if (!hasMat) {
        c.material = new THREE.MeshStandardMaterial({
          color,
          metalness: 0.1,
          roughness: 0.85,
          side: THREE.FrontSide
        });
      }
      const mats = Array.isArray(c.material) ? c.material : [c.material];
      mats.forEach(m => {
        if (m && m.map) m.map.colorSpace = THREE.SRGBColorSpace;
        if (m && m.emissiveMap) m.emissiveMap.colorSpace = THREE.SRGBColorSpace;
      });
      c.castShadow = c.receiveShadow = false;
    }
  });
}

function normalizeAndCenter(obj, targetSize = 1.2){
  const box = new THREE.Box3().setFromObject(obj);
  const size = new THREE.Vector3(); box.getSize(size);
  const center = new THREE.Vector3(); box.getCenter(center);

  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = targetSize / maxDim;
  obj.scale.setScalar(scale);

  // Ricalcolo e centratura
  box.setFromObject(obj);
  box.getCenter(center);
  obj.position.sub(center);

  // Leggero lift se la base scende sotto 0
  const minY = box.min.y * scale;
  if (minY < 0) obj.position.y -= minY * 0.2;
}

function fitCameraToObject(camera, object, controls, offset = 1.2){
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3(); box.getSize(size);
  const center = new THREE.Vector3(); box.getCenter(center);

  const maxSize = Math.max(size.x, size.y, size.z);
  const fitHeightDistance = maxSize / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)));
  const fitWidthDistance  = fitHeightDistance / camera.aspect;
  const distance = offset * Math.max(fitHeightDistance, fitWidthDistance);

  const dir = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
  camera.position.copy(center).add(dir.multiplyScalar(distance));

  camera.near = Math.max(distance / 100, 0.01);
  camera.far  = Math.max(distance * 100, 10);
  camera.updateProjectionMatrix();

  controls.target.copy(center);
  controls.maxDistance = distance * 4;
  controls.minDistance = distance * 0.3;
  controls.update();
}

const autoRotate = (() => {
  let on = true;
  return {
    step: (obj) => { if (on && obj) obj.rotation.y += 0.003; },
    toggle: () => (on = !on),
    set: (v) => (on = !!v)
  };
})();

function onResize(){
  resizeRenderer();
  camera.aspect = aspect();
  camera.updateProjectionMatrix();
}

function resizeRenderer(){
  const w = container.clientWidth || container.offsetWidth || 300;
  const h = container.clientHeight || 300;
  renderer.setSize(w, h, false);
}

function aspect(){
  const w = container.clientWidth || container.offsetWidth || 300;
  const h = container.clientHeight || 300;
  return Math.max(w / h, 0.0001);
}

function fadeOutLoader(){
  if (!loaderEl) return;
  loaderEl.style.transition = 'opacity .35s ease';
  loaderEl.style.opacity = 0;
  setTimeout(() => { loaderEl.style.display = 'none'; }, 400);
}

// Progress helper (easing + clamp)
function SmoothProgress(onUpdate, onDone){
  let current = 0;
  let target = 0;
  let raf = null;

  function step(){
    const delta = target - current;
    if (Math.abs(delta) < 0.1) {
      current = target;
    } else {
      current += delta * 0.15 + 0.1;
    }
    onUpdate?.(current);

    if (current >= 99.9 && target >= 100) {
      cancelAnimationFrame(raf);
      raf = null;
      onDone?.();
      return;
    }
    raf = requestAnimationFrame(step);
  }

  return {
    to(n){
      target = Math.min(100, Math.max(target, n));
      if (!raf) raf = requestAnimationFrame(step);
    }
  };
}

function render(){
  requestAnimationFrame(render);
  if (model) autoRotate.step(model);
  controls.update();
  renderer.render(scene, camera);

  // Aggiorna helper in debug
  if (DEBUG && boxHelper && model){
    boxHelper.box.setFromObject(model);
    boxHelper.updateMatrixWorld(true);
  }
}
