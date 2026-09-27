// ==========================================
// MOARISE CONSULT WEBSITE JAVASCRIPT
// ==========================================


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {
        mainNav.classList.toggle("active");

        if (mainNav.classList.contains("active")) {
            menuToggle.innerHTML = "✕";
        } else {
            menuToggle.innerHTML = "☰";
        }
    });


    // Close menu when a navigation link is clicked

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mainNav.classList.remove("active");

            menuToggle.innerHTML = "☰";

        });

    });

}


// ==========================================
// CURRENT YEAR
// ==========================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        /*
        The Google Apps Script backend will be connected here.

        We are intentionally leaving the backend URL empty for now
        because the Apps Script Web App has not yet been deployed.
        */

        const backendURL = "";


        // Collect form information

        const formData = {

            name: document.getElementById("name")?.value.trim() || "",

            email: document.getElementById("email")?.value.trim() || "",

            whatsapp: document.getElementById("whatsapp")?.value.trim() || "",

            service: document.getElementById("service")?.value || "",

            message: document.getElementById("message")?.value.trim() || ""

        };


        // Basic validation

        if (!formData.name || !formData.email || !formData.message) {

            formMessage.textContent =
                "Please complete your name, email and message.";

            formMessage.style.color = "#b5122b";

            return;
        }


        /*
        BACKEND CONNECTION

        When the Google Apps Script Web App URL is ready,
        we will put it into backendURL above and activate
        the fetch request below.
        */


        if (!backendURL) {

            formMessage.textContent =
                "Your form is ready. The contact system will be connected next.";

            formMessage.style.color = "#b5122b";

            return;
        }


        // Send data to Google Apps Script

        formMessage.textContent = "Sending...";
        formMessage.style.color = "#444444";


        fetch(backendURL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(formData)

        })

        .then(function () {

            formMessage.textContent =
                "Thank you. Your enquiry has been submitted successfully.";

            formMessage.style.color = "green";

            contactForm.reset();

        })

        .catch(function (error) {

            console.error("Form submission error:", error);

            formMessage.textContent =
                "Something went wrong. Please try again or contact us directly.";

            formMessage.style.color = "#b5122b";

        });

    });

}
