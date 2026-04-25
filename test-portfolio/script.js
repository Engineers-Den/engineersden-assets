gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("bg-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 7);

const ambient = new THREE.AmbientLight(0x8ca8ff, 1.2);
scene.add(ambient);

const point = new THREE.PointLight(0x6ee7ff, 2.1, 40);
point.position.set(2, 3, 4);
scene.add(point);

const torusGeometry = new THREE.TorusKnotGeometry(1.2, 0.34, 150, 22);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: 0x8f7cff,
  metalness: 0.35,
  roughness: 0.2,
  emissive: 0x221155,
  emissiveIntensity: 0.7
});
const knot = new THREE.Mesh(torusGeometry, torusMaterial);
knot.position.set(2.2, -0.8, -0.8);
scene.add(knot);

const sphereGeometry = new THREE.IcosahedronGeometry(0.88, 1);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x62dfff,
  wireframe: true,
  opacity: 0.8,
  transparent: true
});
const wireSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
wireSphere.position.set(-2.4, 1, -1.2);
scene.add(wireSphere);

function animate() {
  knot.rotation.x += 0.003;
  knot.rotation.y += 0.004;
  wireSphere.rotation.x -= 0.002;
  wireSphere.rotation.y += 0.003;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

gsap.to(".orbit-1", {
  rotate: 360,
  duration: 15,
  repeat: -1,
  ease: "none"
});

gsap.to(".orbit-2", {
  rotate: -360,
  duration: 22,
  repeat: -1,
  ease: "none"
});

gsap.from(".hero-avatar-wrap", {
  y: 45,
  opacity: 0,
  duration: 1.1,
  ease: "power3.out"
});

gsap.from(".hero-content > *", {
  y: 28,
  opacity: 0,
  stagger: 0.12,
  duration: 0.8,
  ease: "power3.out",
  delay: 0.2
});

gsap.utils.toArray(".reveal").forEach((item) => {
  gsap.from(item, {
    y: 64,
    opacity: 0,
    duration: 0.85,
    ease: "power2.out",
    scrollTrigger: {
      trigger: item,
      start: "top 84%",
      toggleActions: "play none none reverse"
    }
  });
});

ScrollTrigger.create({
  trigger: ".timeline",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: (self) => {
    const p = self.progress;
    knot.rotation.z = p * Math.PI * 2;
    wireSphere.scale.setScalar(1 + p * 0.35);
    point.position.x = 2 + p * 2.2;
  }
});

ScrollTrigger.create({
  trigger: ".contact",
  start: "top 80%",
  onEnter: () => {
    gsap.to(".site-header", {
      backgroundColor: "rgba(10,18,36,0.76)",
      borderColor: "rgba(110,231,255,0.4)",
      duration: 0.4
    });
  },
  onLeaveBack: () => {
    gsap.to(".site-header", {
      backgroundColor: "rgba(255,255,255,0.08)",
      borderColor: "rgba(255,255,255,0.2)",
      duration: 0.4
    });
  }
});
