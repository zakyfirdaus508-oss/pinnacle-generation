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

// animasi kartu khusus halaman panggung
const stageCards = document.querySelectorAll("[data-animate-card]");
stageCards.forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    y: 60,
    opacity: 0,
    duration: 1,
    delay: i * 0.03,
    ease: "power3.out",
  });
});

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

// Start cursor animation only if cursor exists
if (cursor) cursorMove();

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
  // animasi saat ditekan
  button.addEventListener("pointerdown", () => {
    button.classList.add("btn-pressed");
  });

  button.addEventListener("pointerup", () => {
    button.classList.remove("btn-pressed");
  });

  button.addEventListener("pointercancel", () => {
    button.classList.remove("btn-pressed");
  });

  button.addEventListener("mouseleave", () => {
    button.classList.remove("btn-pressed");
  });

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

  const progressText = document.getElementById("loaderProgressText");
  const bar = document.querySelector(".loader-progress-bar");

  const setProgress = (value) => {
    const v = Math.max(0, Math.min(100, Math.round(value)));

    if (progressText) progressText.textContent = `${v}%`;
    if (bar) bar.setAttribute("data-progress", v);

    // Animate bar width smoothly
    if (bar) bar.style.setProperty("--p", `${v}%`);
  };

  // Simulasi proses loading (biar ada timeline 0% -> 30% -> 100%)
  const t0 = 0;
  const total = 1700;

  // 0% langsung
  setProgress(0);

  // 30% di ~35% waktu
  const t30 = Math.round(total * 0.35);

  // 100% di akhir
  const t100 = total;

  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    if (elapsed >= t100) {
      setProgress(100);
      loader.classList.add("hide");
      return;
    }

    if (elapsed < t30) {
      const p = (elapsed / t30) * 30;
      setProgress(p);
    } else {
      const p = 30 + ((elapsed - t30) / (t100 - t30)) * 70;
      setProgress(p);
    }

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
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
/* =========================================
 EVENT
========================================= */
// Kegiatan
const kegiatan = {
  hutri: {
    title: "HUT RI",

    description:
      "Perayaan Hari Kemerdekaan Republik Indonesia dengan berbagai perlombaan dan upacara.",

    location: "Lapangan Utama",

    date: "17 Agustus",

    participant: "800 Santri",

    photos: ["img/hut1.jpg", "img/hut2.jpg", "img/hut3.jpg"],
  },

  bti: {
    title: "BTI 434",

    description: "Pagelaran Seni & Budaya adalah .",

    location: "Darunnajah",

    date: "2026",

    participant: "500 Santri",

    photos: [
      "BTI/bti1.jpg",
      "BTI/bti2.jpg",
      "BTI/bti3.jpg",
      "BTI/bti4.jpg",
      "BTI/bti5.jpg",
      "BTI/bti6.jpg",
      "BTI/bti7.jpg",
      "BTI/bti8.jpg",
      "BTI/bti9.jpg",
    ],
  },

  qurban: {
    title: "Idul Adha 1446 H",

    description: ".",

    location: "Darunnajah 2 Cipining",

    date: "",

    participant: "-",

    photos: [
      "Qurban/qurban1.jpg",
      "Qurban/qurban2.jpg",
      "Qurban/qurban3.jpg",
      "Qurban/qurban4.jpg",
      "Qurban/qurban5.jpg",
      "Qurban/qurban6.jpg",
      "Qurban/qurban7.jpg",
      "Qurban/qurban8.jpg",
      "Qurban/qurban9.jpg",
    ],
  },

  da: {
    title: "Drama Arena 534",

    description:
      "Pagelaran Seni & Kreasi Drama Arena 534 ini diadakan sebagai salah satu sarana untuk menggugah kesadaran kita tentang pentingnya menjaga moralitas dalam kehidupan sehari-hari. Dengan tema peradaban moral, acara ini bertujuan untuk menggambarkan secara kreatif dan menghibur, namun tetap sarat dengan pesan moral, mengenai dampak dari krisis moral yang sedang terjadi di sekitar kita. Melalui drama, kita akan memperlihatkan bagaimana perubahan nilai dalam kehidupan sehari-hari mempengaruhi hubungan antar individu dan kehidupan sosial secara umum.",

    location: "Aula Kampus 3",

    date: "25 Oktober 2025",

    participant: "-",

    photos: [
      "DA/da1.jpg",
      "DA/da2.jpg",
      "DA/da3.jpg",
      "DA/da4.jpg",
      "DA/da5.jpg",
      "DA/da6.jpg",
      "DA/da7.jpg",
      "DA/da8.jpg",
      "DA/da9.jpg",
      "DA/da10.jpg",
      "DA/da11.jpg",
      "DA/da12.jpg",
      "DA/da13.jpg",
      "DA/da14.jpg",
    ],
  },

  p3: {
    title: "Panitia Pergantian Pengurus 2026",

    description: ".",

    location: "Darunnajah 2 Cipining",

    date: "17 Januari 2026",

    participant: "-",

    photos: ["img/ifsho1.jpg", "img/ifsho2.jpg", "img/ifsho3.jpg"],
  },

  sas: {
    title: "Santunan Sosial & Ifthor Shoimin 1447 H",

    description:
      "Santunan Sosial & Ifthor Shoimin bersama merupakan kegiatan yang diadakan setahun sekali di Pesantren Darunnajah 2 Cipining Bogor yang bertujuan untuk membentuk jiwa peduli sosial santri dan bertujuan untuk mempererat Ukhuwah Islamiyah.",

    location: "Aula Kampus 3 Putra",

    date: "07 Maret 2026",

    participant: "2838 Santri",

    photos: [
      "SAS/sas1.JPG",
      "SAS/sas2.JPG",
      "SAS/sas3.JPG",
      "SAS/sas4.JPG",
      "SAS/sas5.JPG",
      "SAS/sas6.JPG",
      "SAS/sas7.JPG",
      "SAS/sas8.JPG",
      "SAS/sas9.JPG",
      "SAS/sas10.JPG",
      "SAS/sas11.JPG",
      "SAS/sas12.JPG",
      "SAS/sas13.JPG",
      "SAS/sas14.JPG",
      "SAS/sas15.JPG",
      "SAS/sas16.JPG",
      "SAS/sas17.JPG",
      "SAS/sas18.JPG",
      "SAS/sas19.JPG",
      "SAS/sas20.JPG",
      "SAS/sas21.JPG",
      "SAS/sas22.JPG",
      "SAS/sas23.JPG",
      "SAS/sas24.JPG",
      "SAS/sas25.JPG",
      "SAS/sas26.JPG",
    ],
  },

  porseka: {
    title: "Pekan Olahraga, Seni & Pramuka 39",

    description: ".",

    location: "-",

    date: "-",

    participant: "-",

    photos: [""],
  },

  pg: {
    title: "Panggung Gembira 634",

    description:
      "Melalui panggung ini, kami ingin membangun narasi bahwa literasi adalah kunci kebebasan berekspresi. Panggung Gembira Iluminary Library hadir sebagai sebuah perpustakaan hidup, di mana setiap pertunjukan seni, kreasi panggung, dan bakat yang ditampilkan merupakan halaman-halaman inspiratif yang siap dibaca, dinikmati, dan diresapi sebagai bentuk syukur atas karunia akal dan bakat yang diberikan oleh Allah SWT.",

    location: "Aula Kampus 1",

    date: "27 September 2026",

    participant: "-",

    photos: [""],
  },
};

// Mengambil elemen
const modal = document.querySelector(".modal");

const mainPhoto = document.getElementById("main-photo");

const thumbnailContainer = document.querySelector(".thumbnail-container");

const exploreButtons = document.querySelectorAll(".explore-btn");

const closeButton = document.querySelector(".close-btn");

const nextButton = document.querySelector(".next");

const prevButton = document.querySelector(".prev");

// Variabel
let currentPhotos = [];

let currentIndex = 0;

// Fungsi
function showPhoto(index) {
  if (!mainPhoto || !currentPhotos[index]) return;
  mainPhoto.src = currentPhotos[index];
}

function updateActiveThumbnail(index) {
  const thumbnails = document.querySelectorAll(".thumbnail-container img");

  thumbnails.forEach((img) => {
    img.classList.remove("active");
  });

  thumbnails[index].classList.add("active");
}

function createThumbnails() {
  if (!thumbnailContainer) return;
  thumbnailContainer.innerHTML = "";

  currentPhotos.slice(0, 14).forEach((photo, index) => {
    const img = document.createElement("img");

    img.src = photo;

    img.addEventListener("click", () => {
      currentIndex = index;

      showPhoto(currentIndex);

      updateActiveThumbnail(currentIndex);
    });

    thumbnailContainer.appendChild(img);
  });

  updateActiveThumbnail(currentIndex);
}

function showPhoto(index) {
  if (!mainPhoto) return;
  mainPhoto.style.opacity = 0;

  setTimeout(() => {
    mainPhoto.src = currentPhotos[index];

    mainPhoto.style.opacity = 1;
  }, 150);
}

// Explore (only if modal exists)
if (modal) {
  exploreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const eventName = button.dataset.event;
      const data = kegiatan[eventName];

      document.getElementById("modal-title").textContent = data.title;
      document.getElementById("modal-description").textContent =
        data.description;
      document.getElementById("modal-location").textContent = data.location;
      document.getElementById("modal-date").textContent = data.date;
      document.getElementById("modal-participant").textContent =
        data.participant;

      currentPhotos = data.photos;
      currentIndex = 0;

      // Modal muncul dulu
      modal.classList.add("active");

      // Foto utama
      showPhoto(currentIndex);

      // Thumbnail dibuat setelah modal tampil
      setTimeout(() => {
        createThumbnails();
      }, 50);
    });
  });

  // Next (modal)
  if (nextButton && !nextButton.classList.contains("slider-btn")) {
    nextButton.addEventListener("click", () => {
      currentIndex++;

      if (currentIndex >= currentPhotos.length) {
        currentIndex = 0;
      }

      showPhoto(currentIndex);
    });
  }

  // Previous (modal)
  if (prevButton && !prevButton.classList.contains("slider-btn")) {
    prevButton.addEventListener("click", () => {
      currentIndex--;

      if (currentIndex < 0) {
        currentIndex = currentPhotos.length - 1;
      }

      showPhoto(currentIndex);
    });
  }

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "ArrowRight") {
      nextButton.click();
    }

    if (e.key === "ArrowLeft") {
      prevButton.click();
    }
  });

  // Menutup modal
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  // Klik area gelap
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Tombol ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("active");
    }
  });
}

/* =========================================
   COUNTDOWN TIMER
========================================= */

function startCountdown() {
  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");

  if (!daysEl) return; // not on panggung-gembira page

  // Target: 27 September, tentukan tahun otomatis
  const now = new Date();
  let targetYear = now.getFullYear();
  const targetDate = new Date(targetYear, 8, 27, 23, 59, 59); // September = month 8 (0-indexed)

  // Jika target sudah lewat, gunakan tahun depan
  if (targetDate <= now) {
    targetDate.setFullYear(targetYear + 1);
  }

  function update() {
    const current = new Date();
    const diff = targetDate - current;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

startCountdown();
