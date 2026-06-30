// Dark Mode Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

// Check local storage for theme preference, default is dark (set in HTML)
if (localStorage.getItem("theme") === "light") {
    htmlElement.setAttribute("data-theme", "light");
}

themeToggle.addEventListener("click", () => {
    if (htmlElement.getAttribute("data-theme") === "dark") {
        htmlElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    } else {
        htmlElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
    // Redraw particles to update color
    initParticles();
});


// Dynamic Typing Effect
const typingText = document.getElementById("typing-text");
const roles = ["Im an IT Student"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        if (roles.length === 1) return; // Stop deleting if only 1 role
        typingSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
}
// Start typing effect
setTimeout(typeEffect, 1000);


// Interactive Particles Background
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");
let particlesArray = [];

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", () => {
    setCanvasSize();
    initParticles();
});
setCanvasSize();

// Mouse position for particle interaction
const mouse = { x: null, y: null, radius: 150 };
window.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});
window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
});

class Particle {
    constructor(x, y, dx, dy, size) {
        this.x = x; this.y = y;
        this.dx = dx; this.dy = dy;
        this.size = size;
        this.baseX = this.x; this.baseY = this.y;
    }
    draw() {
        // Get primary color from CSS variables for theming
        const isDark = document.documentElement.getAttribute("data-theme") !== "light";
        ctx.fillStyle = isDark ? "rgba(56, 189, 248, 0.8)" : "rgba(0, 91, 143, 0.6)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * 5;
            const directionY = forceDirectionY * force * 5;
            this.x -= directionX;
            this.y -= directionY;
        } else {
            // Return to original path slowly
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 50;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 50;
            }
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dx = (Math.random() - 0.5) * 1;
        let dy = (Math.random() - 0.5) * 1;
        particlesArray.push(new Particle(x, y, dx, dy, size));
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

function connectParticles() {
    let opacityValue = 1;
    const isDark = document.documentElement.getAttribute("data-theme") !== "light";
    const lineColor = isDark ? "56, 189, 248" : "0, 91, 143";

    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(${lineColor}, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

initParticles();
animateParticles();


// Existing UI Logic
const projectsData = {
    'kiyoka': {
        title: "Kiyoka Rice",
        img: "kiyoka.png",
        content: "<p>Creating a website that will be a primary catalyst for building a brand, educating consumers about lifestyle, and generating direct sales.</p>"
    },
    'ntt': {
        title: "CTRL P + CTRL F",
        img: "CTRLP.jpg.jpeg",
        content: "<p>Social Project in the form of a seminar. Act as a member of the logistics division, responsible in facilitating the necessary provisions for the event.</p>"
    },
    'slr': {
        title: "Click & Found",
        img: "click.jpeg",
        content: "<p>Economic Survival project in the form of a E-Commerce web. Act as Project Manager, responsible in leading, planning, and organizing  </p>"
    }
};

const mainPage = document.getElementById('main-page');
const detailPage = document.getElementById('project-detail-page');

// Custom SPA Fullpage Engine
let currentSectionIndex = 0;
const sections = document.querySelectorAll('section');
let isScrolling = false;

window.navigateTo = function (index, event) {
    if (window.innerWidth <= 768) {
        if (detailPage.style.display === 'block') {
            detailPage.style.display = 'none';
            mainPage.style.display = 'block';
        }
        return;
    }

    if (event) event.preventDefault();
    if (index < 0 || index >= sections.length) return;

    currentSectionIndex = index;
    mainPage.style.transform = `translateY(-${index * 100}vh)`;

    const targetId = sections[index].getAttribute('id');
    history.pushState(null, null, `#${targetId}`);

    // Update active indicator
    const indicators = document.querySelectorAll('.indicator');
    if (indicators.length > 0) {
        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[index].classList.add('active');
    }

    isScrolling = true;
    setTimeout(() => { isScrolling = false; }, 1000);

    if (detailPage.style.display === 'block') {
        detailPage.style.display = 'none';
        mainPage.style.display = 'block';
    }
};

window.openProject = function (projectId) {
    const data = projectsData[projectId];
    document.getElementById('detail-title').innerHTML = data.title;
    document.getElementById('detail-image').src = data.img;
    document.getElementById('detail-content').innerHTML = data.content;
    mainPage.style.display = 'none';
    detailPage.style.display = 'block';
    detailPage.scrollTop = 0;
}

window.closeProject = function () {
    detailPage.style.display = 'none';
    mainPage.style.display = 'block';
}

window.toggleMenu = function () {
    const nav = document.getElementById('nav-menu');
    if (window.innerWidth <= 768) {
        nav.classList.toggle('active');
    }
}

// Fullpage Event Listeners
window.addEventListener('wheel', (e) => {
    if (window.innerWidth <= 768) return; // Native scroll on mobile
    if (detailPage.style.display === 'block') return; // Let native scroll work on detail page
    if (isScrolling) return;
    if (Math.abs(e.deltaY) < 15) return; // Trackpad sensitivity threshold

    if (e.deltaY > 0) {
        navigateTo(currentSectionIndex + 1);
    } else {
        navigateTo(currentSectionIndex - 1);
    }
}, { passive: false });

let touchStartY = 0;
window.addEventListener('touchstart', e => {
    if (window.innerWidth <= 768) return;
    if (detailPage.style.display === 'block') return;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: false });

window.addEventListener('touchend', e => {
    if (window.innerWidth <= 768) return;
    if (detailPage.style.display === 'block') return;
    const touchEndY = e.changedTouches[0].screenY;
    if (isScrolling) return;

    if (touchStartY - touchEndY > 50) {
        navigateTo(currentSectionIndex + 1);
    } else if (touchEndY - touchStartY > 50) {
        navigateTo(currentSectionIndex - 1);
    }
}, { passive: false });

window.addEventListener('keydown', (e) => {
    if (window.innerWidth <= 768) return;
    if (detailPage.style.display === 'block' || isScrolling) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        navigateTo(currentSectionIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        navigateTo(currentSectionIndex - 1);
    }
});

// 3D Tilt Effect for Portfolio Cards
const cards = document.querySelectorAll('.portfolio-item');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none'; // Smooth tracking
    });
});

// Scroll Reveal Observer
document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active'); // Re-animate on revisit
            }
        });
    }, { rootMargin: "0px 0px 0px 0px", threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
});

// EmailJS Form Handling
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // TODO: Ganti dengan SERVICE ID dan TEMPLATE ID dari akun EmailJS Anda
            const serviceID = 'service_s7tjnqa';
            const templateID = 'template_guhi7wi';

            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;
            statusMsg.style.display = 'none';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    statusMsg.textContent = 'Message Sent!';
                    statusMsg.style.color = '#4ade80'; // Green
                    statusMsg.style.display = 'block';
                    form.reset();
                    submitBtn.textContent = 'Send';
                    submitBtn.disabled = false;

                    setTimeout(() => {
                        statusMsg.style.display = 'none';
                    }, 5000);
                }, (error) => {
                    console.log('FAILED...', error);
                    statusMsg.textContent = 'Gagal mengirim pesan. Silakan cek konfigurasi EmailJS (Service ID, Template ID, Public Key).';
                    statusMsg.style.color = '#f87171'; // Red
                    statusMsg.style.display = 'block';
                    submitBtn.textContent = 'Send';
                    submitBtn.disabled = false;
                });
        });
    }
});

