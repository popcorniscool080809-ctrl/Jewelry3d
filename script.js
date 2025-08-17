// Set up scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Controls (orbit around)
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Example: Gold ring (torus)
const goldMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700, metalness: 1, roughness: 0.3 });
const ringGeometry = new THREE.TorusGeometry(2, 0.4, 16, 100);
const ring = new THREE.Mesh(ringGeometry, goldMaterial);
scene.add(ring);

// Example: Gem (diamond-like)
const gemMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, metalness: 0.8, roughness: 0.1 });
const gemGeometry = new THREE.OctahedronGeometry(0.7);
const gem = new THREE.Mesh(gemGeometry, gemMaterial);
gem.position.set(0, 1.5, 0);
scene.add(gem);

// Camera position
camera.position.z = 6;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  ring.rotation.y += 0.01;
  gem.rotation.y -= 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
