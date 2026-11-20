const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navAnchorLinks = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const yearElement = document.getElementById("year");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
  updateActiveLink();
});

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navAnchorLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  let currentSection = "home";

  sections.forEach(section => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) {
      currentSection = section.id;
    }
  });

  navAnchorLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(element => observer.observe(element));

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    formStatus.textContent = "Please fill in all fields.";
    formStatus.style.color = "#ff6b6b";
    return;
  }

  formStatus.textContent = "Thank you, " + name + "! Your message has been recorded.";
  formStatus.style.color = "#5b8cff";
  contactForm.reset();
});

yearElement.textContent = new Date().getFullYear();