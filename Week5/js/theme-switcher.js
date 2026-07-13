const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

});

document.querySelectorAll("a, button, .bento__card, .project, .skill-card").forEach((item) => {

    item.addEventListener("mouseenter", () => {

        cursor.style.width = "40px";
        cursor.style.height = "40px";
        cursor.style.background = "rgba(108,99,255,.25)";
        cursor.style.borderColor = "#6C63FF";

    });

    item.addEventListener("mouseleave", () => {

        cursor.style.width = "18px";
        cursor.style.height = "18px";
        cursor.style.background = "transparent";
        cursor.style.borderColor = "#00D9FF";

    });

});

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll(
    ".glass, .skill-card, .project, .timeline__item, .contact-wrapper"
).forEach((el) => {

    el.classList.add("hidden");
    observer.observe(el);

});

const backTop = document.querySelector(".back-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.style.opacity = "1";
        backTop.style.pointerEvents = "all";

    } else {

        backTop.style.opacity = "0";
        backTop.style.pointerEvents = "none";

    }

});

backTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});

const blobs = document.querySelectorAll(".blob");

window.addEventListener("mousemove", (e) => {

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {

        const moveX = (x * (20 + index * 10));
        const moveY = (y * (20 + index * 10));

        blob.style.transform = `translate(${moveX}px, ${moveY}px)`;

    });

});

const typingElement = document.querySelector(".hero__subtitle");

if (typingElement) {

    const words = [
        "Creative Frontend Developer",
        "React Developer",
        "UI Enthusiast",
        "Problem Solver"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {

        const current = words[wordIndex];

        if (!deleting) {

            typingElement.textContent = current.substring(0, charIndex++);
        } else {

            typingElement.textContent = current.substring(0, charIndex--);
        }

        let speed = 100;

        if (!deleting && charIndex === current.length + 1) {

            deleting = true;
            speed = 1500;

        } else if (deleting && charIndex === 0) {

            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 300;

        } else {

            speed = deleting ? 50 : 100;

        }

        setTimeout(type, speed);

    }

    type();

}

const theme = localStorage.getItem("theme");

if (theme === "light") {

    document.body.classList.add("light-theme");

}

const themeButton = document.createElement("button");

themeButton.className = "theme-toggle";

themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';

document.body.appendChild(themeButton);

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const icon = themeButton.querySelector("i");

    if (document.body.classList.contains("light-theme")) {

        icon.className = "fa-solid fa-sun";
        localStorage.setItem("theme", "light");

    } else {

        icon.className = "fa-solid fa-moon";
        localStorage.setItem("theme", "dark");

    }

});

document.querySelectorAll(".project").forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

    });

});