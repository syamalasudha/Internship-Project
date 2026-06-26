
// =========================
// DAY 1: Setup + Console
// =========================
console.log("7 Day JS Project Loaded");

// =========================
// Reusable Functions (DAY 2 requirement)
// =========================
function setError(id, msg) {
  document.getElementById(id).innerText = msg;
}

function clearErrors() {
  setError("nameError", "");
  setError("emailError", "");
  setError("messageError", "");
}

// =========================
// DAY 3: Event Listeners
// =========================

// Dark Mode Toggle
const darkBtn = document.getElementById("darkBtn");

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Load theme
window.onload = function () {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  if (localStorage.getItem("savedName")) {
    document.getElementById("savedName").innerText =
      "Welcome back " + localStorage.getItem("savedName");
  }
};

// =========================
// DAY 4: Form Validation
// =========================
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  clearErrors();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  let valid = true;

  if (name === "") {
    setError("nameError", "Name is required");
    valid = false;
  }

  if (!email.includes("@")) {
    setError("emailError", "Invalid email");
    valid = false;
  }

  if (message.length < 5) {
    setError("messageError", "Message too short");
    valid = false;
  }

  if (valid) {
    document.getElementById("successMsg").innerText =
      "Form submitted successfully!";
    form.reset();
  }
});

// =========================
// DAY 2 + DAY 3: DOM Manipulation + Events
// =========================
const textInput = document.getElementById("textInput");
const changeTextBtn = document.getElementById("changeTextBtn");

changeTextBtn.addEventListener("click", function () {
  document.getElementById("liveText").innerText = textInput.value;
});

// =========================
// IMAGE GALLERY (FIXED)
// =========================

window.addEventListener("DOMContentLoaded", () => {

  const images = document.querySelectorAll(".img");
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");

  // safety check (important)
  if (!modal || !modalImg || !closeModal) {
    console.error("Modal elements not found in HTML");
    return;
  }

  images.forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

});

// =========================
// DAY 6: Local Storage Feature
// =========================
document.getElementById("saveBtn").addEventListener("click", function () {
  const name = document.getElementById("userName").value;

  if (name.trim() !== "") {
    localStorage.setItem("savedName", name);
    document.getElementById("savedName").innerText =
      "Saved: " + name;
  }
});