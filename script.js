if (typeof THREE === "undefined") {
  console.warn("Three.js gagal dimuat");
}
/* =========================================
   GSAP SETUP
========================================= */

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   CINEMATIC TITLE REVEAL
========================================= */

gsap.to(".hero-title span", {
  opacity: 1,

  filter: "blur(0px)",

  y: 0,

  duration: 1.5,

  stagger: 0.25,

  ease: "power4.out",
});

/* =========================================
   MOUSE LIGHT FOLLOW
========================================= */

const hero = document.querySelector(".hero");

if (hero) {
  hero.addEventListener("mousemove", (e) => {
    let x = e.clientX;

    let y = e.clientY;

    hero.style.setProperty("--mouse-x", x + "px");

    hero.style.setProperty("--mouse-y", y + "px");
  });
}

/* =========================================
   HERO INTRO ANIMATION
========================================= */

const heroTimeline = gsap.timeline();

heroTimeline
  .from(".logo", {
    y: -30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  })

  .from(
    ".subtitle",
    {
      y: 40,
      opacity: 0,
      duration: 1,
    },
    "-=0.5",
  )

  .from(
    ".hero h1",
    {
      y: 100,
      opacity: 0,
      duration: 1.4,
      ease: "power4.out",
    },
    "-=0.5",
  )

  .from(
    ".desc",
    {
      y: 40,
      opacity: 0,
      duration: 1,
    },
    "-=0.8",
  )

  .from(
    ".hero-buttons",
    {
      y: 30,
      opacity: 0,
      duration: 1,
    },
    "-=0.7",
  )

  .from(
    ".hero-logo-large",
    {
      scale: 0,

      rotation: 20,

      duration: 1.5,

      ease: "elastic.out(1,.5)",
    },
    "-=1",
  );

const heroButtons = document.querySelector(".hero-buttons");

if (heroButtons) {
  heroTimeline.from(
    heroButtons,
    {
      y: 30,
      opacity: 0,
      duration: 1,
    },
    "-=0.7",
  );
}

/* =========================================
   SCROLL REVEAL
========================================= */

const sections = document.querySelectorAll(".about, .card, .stats div, .cta");

sections.forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,

      start: "top 80%",

      toggleActions: "play none none reverse",
    },

    y: 80,

    opacity: 0,

    duration: 1,

    ease: "power3.out",
  });
});

/* =========================================
   PROJECT IMAGE PARALLAX
========================================= */

gsap.utils.toArray(".project img").forEach((img) => {
  gsap.to(img, {
    y: -80,

    scrollTrigger: {
      trigger: img,

      scrub: true,
    },
  });
});

/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector("#cursor");

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;

  mouseY = e.clientY;
});

function cursorMove() {
  if (cursor) {
    cursor.style.left = mouseX + "px";

    cursor.style.top = mouseY + "px";
  }

  requestAnimationFrame(cursorMove);
}

cursorMove();

const hoverElements = document.querySelectorAll("a, button, .card, .project");

hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-active");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-active");
  });
});

/* =========================================
   MAGNETIC BUTTON
========================================= */

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;

    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.25,

      y: y * 0.25,

      duration: 0.3,
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      x: 0,

      y: 0,

      duration: 0.5,

      ease: "elastic.out(1,.3)",
    });
  });
});

/* =========================================
   MOUSE PARALLAX HERO
========================================= */

const heroVisual = document.querySelector(".hero-image");

if (heroVisual) {
  document.addEventListener("mousemove", (e) => {
    let x = e.clientX / window.innerWidth - 0.5;

    let y = e.clientY / window.innerHeight - 0.5;

    gsap.to(heroVisual, {
      rotationY: x * 20,

      rotationX: -y * 20,

      duration: 1,

      ease: "power2.out",
    });
  });
}

/* =========================================
   THREE.JS PARTICLE BACKGROUND
========================================= */

/* =========================================
   PREMIUM THREE.JS EXPERIENCE
========================================= */

const canvas = document.querySelector("#bg");

let scene = null;
let camera = null;
let renderer = null;
let particles = null;
let blob = null;

if (canvas && typeof THREE !== "undefined") {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.z = 6;

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // particles
  const particleGeometry = new THREE.BufferGeometry();
  const particleAmount = 1500;
  const particlePosition = new Float32Array(particleAmount * 3);

  for (let i = 0; i < particleAmount * 3; i++) {
    particlePosition[i] = (Math.random() - 0.5) * 18;
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePosition, 3),
  );

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.018,
    color: "#ffffff",
    transparent: true,
    opacity: 0.7,
  });

  particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // blob
  const blobGeometry = new THREE.IcosahedronGeometry(1.4, 64);
  const blobMaterial = new THREE.MeshStandardMaterial({
    color: "#D4A63A",
    roughness: 0.2,
    metalness: 0.7,
    transparent: true,
    opacity: 0.85,
  });

  blob = new THREE.Mesh(blobGeometry, blobMaterial);
  blob.position.set(2, 0, 0);
  scene.add(blob);

  // lighting
  const light1 = new THREE.PointLight("#5b8cff", 5, 10);
  light1.position.set(3, 3, 5);
  scene.add(light1);

  const light2 = new THREE.PointLight("#750808", 4, 10);
  light2.position.set(-3, -2, 3);
  scene.add(light2);

  // mouse
  const mouse = { x: 0, y: 0 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX / window.innerWidth - 0.5;
    mouse.y = e.clientY / window.innerHeight - 0.5;
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    if (!particles || !blob) return;

    particles.rotation.y += 0.0008;
    particles.rotation.x = Math.sin(time * 0.2) * 0.001;

    blob.rotation.x = time * 0.2;
    blob.rotation.y = time * 0.3;

    const scale = 1 + Math.sin(time * 2) * 0.08;
    blob.scale.set(scale, scale, scale);

    blob.position.x += (mouse.x * 2 - blob.position.x) * 0.02;
    blob.position.y += (-mouse.y * 2 - blob.position.y) * 0.02;

    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.02;

    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  function updateThreeSize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", updateThreeSize);

  animate();
}

/* =========================================
   LOADING ANIMATION
========================================= */

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(function () {
    loader.classList.add("hide");
  }, 1000);
});
/* =========================================
   TEXT REVEAL
========================================= */

const bigTexts = document.querySelectorAll(
  ".hero h1, .about h2, .showcase h2, .cta h2",
);

bigTexts.forEach((text) => {
  gsap.from(text, {
    scrollTrigger: {
      trigger: text,

      start: "top 85%",
    },

    y: 120,

    opacity: 0,

    duration: 1.4,

    ease: "power4.out",
  });
});

/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
// document.getElementById("loader").style.display = "none"; // avoid fighting CSS #loader.hide
/* =========================================
   MEMORY CARD 3D TILT
========================================= */

const cards = document.querySelectorAll(".memory-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 20;

    const rotateX = (y / rect.height - 0.5) * -20;

    gsap.to(card, {
      rotateY: rotateY,

      rotateX: rotateX,

      duration: 0.5,
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,

      rotateY: 0,

      duration: 0.8,

      ease: "elastic.out(1,.3)",
    });
  });
});
/* =========================================
   SCROLL PROGRESS
========================================= */

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;

  const height = document.body.scrollHeight - window.innerHeight;

  const progress = (scrollTop / height) * 100;

  document.querySelector(".scroll-progress").style.width = progress + "%";
});
/* =========================================
 IMAGE REVEAL
========================================= */

gsap.utils.toArray(".memory-card, .project").forEach((item) => {
  gsap.to(item, {
    scrollTrigger: {
      trigger: item,

      start: "top 80%",
    },

    clipPath: "inset(0% 0% 0% 0%)",

    duration: 1.5,

    ease: "power4.out",
  });
});
/* =========================================
 MAGNETIC LINKS
========================================= */

const magnetic = document.querySelectorAll("nav a");

magnetic.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const box = item.getBoundingClientRect();

    const x = e.clientX - (box.left + box.width / 2);

    const y = e.clientY - (box.top + box.height / 2);

    gsap.to(item, {
      x: x * 0.3,

      y: y * 0.3,

      duration: 0.4,
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      x: 0,

      y: 0,

      duration: 0.5,
    });
  });
});
const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function updateSlides() {
  if (!slides || slide.length === 0) return;
  slides.style.transform = `translateX(-${index * 100}%)`;
}

if (nextBtn && prevBtn) {
  nextBtn.onclick = () => {
    index++;
    if (index >= slide.length) index = 0;
    updateSlides();
  };

  prevBtn.onclick = () => {
    index--;
    if (index < 0) index = slide.length - 1;
    updateSlides();
  };
}

if (slides && slide.length > 0) {
  updateSlides();
}
