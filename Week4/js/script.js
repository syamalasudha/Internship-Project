/* =====================================
   Delicious Bites Restaurant Website
   Main JavaScript
===================================== */

// ==========================
// MOBILE NAVIGATION
// ==========================

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navbar.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

}

// Close menu after clicking a link

document.querySelectorAll("#navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});

// ==========================
// STICKY HEADER SHADOW
// ==========================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 8px 20px rgba(0,0,0,.15)";

    } else {

        header.style.boxShadow = "0 2px 15px rgba(0,0,0,.08)";

    }

});

// ==========================
// SCROLL TO TOP BUTTON
// ==========================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ==========================
// ACTIVE NAVIGATION LINK
// ==========================

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("#navbar a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage || (currentPage === "" && href === "index.html")) {

        link.classList.add("active");

    } else {

        link.classList.remove("active");

    }

});

// ==========================
// FADE-IN ANIMATION
// ==========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {

    threshold: 0.2

});

const animatedItems = document.querySelectorAll(

    ".feature-card, .food-card, .testimonial-card, .about-grid, .contact-info, .contact-form"

);

animatedItems.forEach(item => {

    item.style.opacity = "0";

    item.style.transform = "translateY(40px)";

    item.style.transition = "all .8s ease";

    observer.observe(item);

});

// ==========================
// IMAGE HOVER EFFECT
// ==========================

document.querySelectorAll(".gallery-grid img").forEach(image => {

    image.addEventListener("mouseenter", () => {

        image.style.transform = "scale(1.08)";

    });

    image.addEventListener("mouseleave", () => {

        image.style.transform = "scale(1)";

    });

});

// ==========================
// HERO BUTTON RIPPLE EFFECT
// ==========================

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transition = ".3s";

        button.style.transform = "translateY(-4px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0)";

    });

});

// ==========================
// FOOD CARD ANIMATION
// ==========================

document.querySelectorAll(".food-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.boxShadow = "0 20px 35px rgba(0,0,0,.2)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.boxShadow = "";

    });

});

// ==========================
// CONSOLE MESSAGE
// ==========================

console.log("🍔 Delicious Bites Website Loaded Successfully!");