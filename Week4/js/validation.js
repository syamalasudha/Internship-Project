/* ===========================================
   Delicious Bites - Contact Form Validation
=========================================== */

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        // Get Values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const guests = document.getElementById("guests").value.trim();
        const date = document.getElementById("date").value;
        const message = document.getElementById("message").value.trim();

        // Regular Expressions
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phonePattern =
            /^[6-9]\d{9}$/;

        // Name Validation
        if (name === "") {

            alert("Please enter your name.");

            return;
        }

        // Email Validation
        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;
        }

        // Phone Validation
        if (!phonePattern.test(phone)) {

            alert("Please enter a valid 10-digit mobile number.");

            return;
        }

        // Guests Validation
        if (guests === "" || guests < 1) {

            alert("Please enter the number of guests.");

            return;
        }

        // Date Validation
        const selectedDate = new Date(date);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (date === "") {

            alert("Please select a reservation date.");

            return;
        }

        if (selectedDate < today) {

            alert("Reservation date cannot be in the past.");

            return;
        }

        // Message Validation
        if (message.length < 10) {

            alert("Please enter at least 10 characters in the message.");

            return;
        }

        // Success Message
        alert(
            "🎉 Thank you, " +
            name +
            "!\n\nYour table reservation has been received successfully.\n\nWe look forward to serving you at Delicious Bites!"
        );

        // Reset Form
        form.reset();

    });

}