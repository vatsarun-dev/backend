// ==============================
// Backend Engineering Handbook
// script.js
// ==============================

// Active Sidebar Navigation

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Smooth Fade Animation

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

document.querySelectorAll("section").forEach((sec) => {
  sec.classList.add("hidden");

  observer.observe(sec);
});

// Reading Progress Bar

const progressBar = document.createElement("div");

progressBar.id = "progressBar";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;

  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / height) * 100;

  progressBar.style.width = progress + "%";
});

// Copy Code Button

document.querySelectorAll("pre").forEach((block) => {
  const button = document.createElement("button");

  button.innerText = "Copy";

  button.className = "copy-btn";

  block.style.position = "relative";

  block.appendChild(button);

  button.addEventListener("click", () => {
    navigator.clipboard.writeText(block.innerText.replace("Copy", ""));

    button.innerText = "Copied ✓";

    setTimeout(() => {
      button.innerText = "Copy";
    }, 1500);
  });
});

// Scroll To Top

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    topBtn.style.display = "flex";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.onclick = () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
};

// Dark Mode

const darkBtn = document.createElement("button");

darkBtn.innerHTML = "🌙";

darkBtn.id = "themeBtn";

document.body.appendChild(darkBtn);

darkBtn.onclick = () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkBtn.innerHTML = "☀️";

    localStorage.setItem("theme", "dark");
  } else {
    darkBtn.innerHTML = "🌙";

    localStorage.setItem("theme", "light");
  }
};

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");

  darkBtn.innerHTML = "☀️";
}

// Console Message

console.log(
  "%cBackend Engineering Handbook",
  "font-size:20px;color:#2563eb;font-weight:bold;",
);
console.log("%cCreated by Arun Vats", "font-size:14px;color:#0f172a;");
