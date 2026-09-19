/* =========================================================
   AJK BLOOD FOUNDATION
   FINAL FRONT-END JAVASCRIPT
========================================================= */


/* =========================================================
   WHATSAPP CONFIGURATION
=========================================================

   IMPORTANT:
   Later you will give me the official WhatsApp Group link.
   We will put it here once, and all WhatsApp buttons
   will automatically use it.
========================================================= */

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/EJmWJXXgRUw3DaioKnUbwj";


/* =========================================================
   DEMO DONOR DATABASE
=========================================================

   These are demo records for testing the website.

   Later we can replace these with a real database/admin
   system where you can add donors yourself.
========================================================= */

const donors = [

    {
        id: 1,
        name: "Muhammad Usman",
        bloodGroup: "O+",
        area: "Bagh",
        phone: "03000000001",
        lastDonation: "2026-05-20"
    },

    {
        id: 2,
        name: "Ahmed Khan",
        bloodGroup: "B+",
        area: "Rawalpindi",
        phone: "03000000002",
        lastDonation: "2026-06-10"
    },

    {
        id: 3,
        name: "Ali Raza",
        bloodGroup: "A+",
        area: "Muzaffarabad",
        phone: "03000000003",
        lastDonation: "2026-04-15"
    },

    {
        id: 4,
        name: "Hassan Ahmed",
        bloodGroup: "O-",
        area: "Bagh",
        phone: "03000000004",
        lastDonation: "2026-07-01"
    },

    {
        id: 5,
        name: "Usman Ali",
        bloodGroup: "AB+",
        area: "Rawalpindi",
        phone: "03000000005",
        lastDonation: "2026-03-12"
    },

    {
        id: 6,
        name: "Bilal Hussain",
        bloodGroup: "B-",
        area: "Muzaffarabad",
        phone: "03000000006",
        lastDonation: "2026-07-10"
    }

];


/* =========================================================
   90 DAY DONATION RULE
========================================================= */

const DONATION_WAIT_DAYS = 90;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});


/* =========================================================
   MAIN INITIALIZATION
========================================================= */

function initializeWebsite() {

    setupMobileMenu();

    setupSmoothNavigation();

    setupWhatsAppButtons();

    setupBloodSearch();

    updateStatistics();

    updateCurrentYear();

    setupScrollReveal();

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const menuButton =
        document.getElementById("mobileMenuBtn");

    const navMenu =
        document.getElementById("navMenu");


    if (!menuButton || !navMenu) {
        return;
    }


    menuButton.addEventListener("click", () => {

        navMenu.classList.toggle("show");


        const icon =
            menuButton.querySelector("i");


        if (navMenu.classList.contains("show")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });


    /* Close menu after clicking a link */

    const links =
        navMenu.querySelectorAll("a");


    links.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("show");

            const icon =
                menuButton.querySelector("i");


            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

function setupSmoothNavigation() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener("click", function(event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#" ||
                targetId.length <= 1
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const header =
                document.querySelector(".main-header");


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}


/* =========================================================
   WHATSAPP BUTTONS
========================================================= */

function setupWhatsAppButtons() {

    const buttons = [

        document.getElementById("navWhatsapp"),

        document.getElementById("emergencyWhatsapp"),

        document.getElementById("donorWhatsapp"),

        document.getElementById("contactWhatsapp"),

        document.getElementById("floatingWhatsapp")

    ];


    buttons.forEach(button => {

        if (!button) {
            return;
        }


        button.addEventListener("click", event => {

            if (
                !WHATSAPP_GROUP_LINK ||
                WHATSAPP_GROUP_LINK === "#"
            ) {

                event.preventDefault();


                alert(
                    "WhatsApp Group link will be added soon."
                );


                return;

            }


            button.href =
                WHATSAPP_GROUP_LINK;

        });

    });

}


/* =========================================================
   BLOOD SEARCH
========================================================= */

function setupBloodSearch() {

    const searchButton =
        document.getElementById("searchDonors");

    const bloodGroup =
        document.getElementById("bloodGroup");

    const area =
        document.getElementById("area");


    if (
        !searchButton ||
        !bloodGroup ||
        !area
    ) {

        return;

    }


    searchButton.addEventListener(
        "click",
        performBloodSearch
    );


    /* Search when Enter is pressed */

    area.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            performBloodSearch();

        }

    });

}


/* =========================================================
   PERFORM BLOOD SEARCH
========================================================= */

function performBloodSearch() {

    const bloodGroup =
        document
            .getElementById("bloodGroup")
            .value
            .trim();


    const area =
        document
            .getElementById("area")
            .value
            .trim()
            .toLowerCase();


    const resultsContainer =
        document.getElementById("donorResults");


    if (!resultsContainer) {
        return;
    }


    /* Require at least one filter */

    if (!bloodGroup && !area) {

        resultsContainer.innerHTML = `

            <div class="empty-results">

                <div class="empty-icon">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>

                <h3>
                    Choose a Search Filter
                </h3>

                <p>
                    Select a blood group or enter an area
                    to search the donor network.
                </p>

            </div>

        `;

        return;

    }


    const matchingDonors =
        donors.filter(donor => {

            const groupMatches =
                !bloodGroup ||
                donor.bloodGroup === bloodGroup;


            const areaMatches =
                !area ||
                donor.area
                    .toLowerCase()
                    .includes(area);


            return groupMatches && areaMatches;

        });


    displayDonorResults(
        matchingDonors,
        resultsContainer
    );

}


/* =========================================================
   DISPLAY DONOR RESULTS
========================================================= */

function displayDonorResults(
    matchingDonors,
    container
) {


    if (matchingDonors.length === 0) {

        container.innerHTML = `

            <div class="empty-results">

                <div class="empty-icon">
                    <i class="fa-solid fa-heart-crack"></i>
                </div>

                <h3>
                    No Donor Found
                </h3>

                <p>
                    We couldn't find a matching donor.
                    Try another blood group or area.
                </p>

            </div>

        `;

        return;

    }


    const cards =
        matchingDonors
            .map(createDonorCard)
            .join("");


    container.innerHTML = `

        <div class="donor-results-grid">

            ${cards}

        </div>

    `;


    addDonorCardStyles();

}


/* =========================================================
   CREATE DONOR CARD
========================================================= */

function createDonorCard(donor) {

    const status =
        calculateDonorStatus(
            donor.lastDonation
        );


    const safeName =
        escapeHTML(donor.name);


    const safeArea =
        escapeHTML(donor.area);


    return `

        <article class="donor-card">

            <div class="donor-card-top">

                <div class="donor-blood">

                    ${escapeHTML(donor.bloodGroup)}

                </div>


                <span class="donor-status ${status.className}">

                    <span></span>

                    ${status.label}

                </span>

            </div>


            <div class="donor-info">

                <h3>
                    ${safeName}
                </h3>


                <div class="donor-detail">

                    <i class="fa-solid fa-droplet"></i>

                    <span>
                        Blood Group:
                        <strong>
                            ${escapeHTML(donor.bloodGroup)}
                        </strong>
                    </span>

                </div>


                <div class="donor-detail">

                    <i class="fa-solid fa-location-dot"></i>

                    <span>
                        ${safeArea}
                    </span>

                </div>


                <div class="donor-detail">

                    <i class="fa-solid fa-calendar"></i>

                    <span>
                        Last Donation:
                        ${formatDate(donor.lastDonation)}
                    </span>

                </div>

            </div>


            <div class="donor-card-bottom">

                ${
                    status.available
                    ?

                    `

                    <a
                        href="https://wa.me/${cleanPhone(donor.phone)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="donor-contact"
                    >

                        <i class="fa-brands fa-whatsapp"></i>

                        Contact Donor

                    </a>

                    `

                    :

                    `

                    <div class="donor-unavailable">

                        <i class="fa-solid fa-clock"></i>

                        Donation interval pending

                    </div>

                    `

                }

            </div>

        </article>

    `;

}


/* =========================================================
   DONOR STATUS CALCULATION
========================================================= */

function calculateDonorStatus(lastDonation) {

    const donationDate =
        new Date(lastDonation);


    const today =
        new Date();


    const difference =
        today.getTime() -
        donationDate.getTime();


    const daysPassed =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (
        daysPassed >= DONATION_WAIT_DAYS
    ) {

        return {

            available: true,

            label: "Available",

            className: "status-available"

        };

    }


    const remainingDays =
        DONATION_WAIT_DAYS -
        daysPassed;


    return {

        available: false,

        label:
            `${remainingDays} days remaining`,

        className: "status-pending"

    };

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {

    const date =
        new Date(dateString);


    if (Number.isNaN(date.getTime())) {

        return "Not available";

    }


    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   CLEAN PHONE NUMBER
========================================================= */

function cleanPhone(phone) {

    let cleaned =
        String(phone)
            .replace(/\D/g, "");


    /*
       Pakistan local number:
       03001234567

       WhatsApp international:
       923001234567
    */

    if (
        cleaned.startsWith("0") &&
        cleaned.length === 11
    ) {

        cleaned =
            "92" +
            cleaned.substring(1);

    }


    return cleaned;

}


/* =========================================================
   STATISTICS
========================================================= */

function updateStatistics() {

    const statElements =
        document.querySelectorAll(
            ".stat-number"
        );


    if (!statElements.length) {
        return;
    }


    const registeredDonors =
        donors.length;


    const availableDonors =
        donors.filter(donor => {

            return calculateDonorStatus(
                donor.lastDonation
            ).available;

        }).length;


    const bloodDonations =
        donors.length;


    const childrenSupported =
        Math.max(
            1,
            Math.floor(
                donors.length * 1.5
            )
        );


    const emergencyCases =
        Math.max(
            1,
            Math.floor(
                donors.length / 2
            )
        );


    const values = [

        registeredDonors,

        bloodDonations,

        childrenSupported,

        emergencyCases

    ];


    statElements.forEach(
        (element, index) => {

            const value =
                values[index] || 0;


            element.textContent =
                `${value}+`;

        }
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function updateCurrentYear() {

    const yearElement =
        document.getElementById(
            "currentYear"
        );


    if (!yearElement) {
        return;
    }


    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function setupScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".mission-card, .about-content, .about-visual, .process-item, .contact-card, .donate-content, .donate-visual"
        );


    if (!elements.length) {
        return;
    }


    elements.forEach(element => {

        element.classList.add(
            "reveal-element"
        );

    });


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.classList.add(
                "reveal-visible"
            );

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   DONOR CARD STYLES
=========================================================

   These styles are generated here because donor cards
   are created dynamically by JavaScript.
========================================================= */

function addDonorCardStyles() {

    if (
        document.getElementById(
            "dynamicDonorStyles"
        )
    ) {

        return;

    }


    const style =
        document.createElement("style");


    style.id =
        "dynamicDonorStyles";


    style.textContent = `

        .donor-results-grid {

            display: grid;

            grid-template-columns:
                repeat(3, 1fr);

            gap: 18px;

        }


        .donor-card {

            padding: 24px;

            border:
                1px solid
                rgba(255,255,255,0.12);

            border-radius: 20px;

            background:
                rgba(255,255,255,0.06);

            backdrop-filter: blur(12px);

            transition: 0.3s ease;

        }


        .donor-card:hover {

            transform:
                translateY(-5px);

            background:
                rgba(255,255,255,0.09);

        }


        .donor-card-top {

            display: flex;

            align-items: center;

            justify-content:
                space-between;

            gap: 15px;

        }


        .donor-blood {

            width: 54px;

            height: 54px;

            display: grid;

            place-items: center;

            border-radius: 15px;

            color:
                var(--red-main);

            background:
                var(--white);

            font-family:
                "Playfair Display",
                serif;

            font-size: 18px;

            font-weight: 700;

        }


        .donor-status {

            display: inline-flex;

            align-items: center;

            gap: 6px;

            padding:
                6px 9px;

            border-radius: 999px;

            font-size: 9px;

            font-weight: 700;

        }


        .donor-status span {

            width: 6px;

            height: 6px;

            border-radius: 50%;

            display: block;

        }


        .status-available {

            color:
                #86efac;

            background:
                rgba(34,197,94,0.10);

        }


        .status-available span {

            background:
                #22c55e;

        }


        .status-pending {

            color:
                #fcd34d;

            background:
                rgba(250,204,21,0.10);

        }


        .status-pending span {

            background:
                #eab308;

        }


        .donor-info h3 {

            margin-top: 22px;

            color:
                var(--white);

            font-family:
                "Playfair Display",
                serif;

            font-size: 21px;

        }


        .donor-detail {

            display: flex;

            align-items: center;

            gap: 9px;

            margin-top: 9px;

            color:
                rgba(255,255,255,0.58);

            font-size: 10px;

        }


        .donor-detail i {

            width: 20px;

            color:
                var(--red-light);

        }


        .donor-detail strong {

            color:
                rgba(255,255,255,0.85);

        }


        .donor-card-bottom {

            margin-top: 20px;

            padding-top: 17px;

            border-top:
                1px solid
                rgba(255,255,255,0.09);

        }


        .donor-contact {

            width: 100%;

            min-height: 43px;

            display: flex;

            align-items: center;

            justify-content: center;

            gap: 8px;

            border-radius: 10px;

            color: white;

            background: #15803d;

            font-size: 10px;

            font-weight: 800;

            transition: 0.3s ease;

        }


        .donor-contact:hover {

            transform:
                translateY(-2px);

            background:
                #16a34a;

        }


        .donor-unavailable {

            display: flex;

            align-items: center;

            justify-content: center;

            gap: 7px;

            min-height: 43px;

            border-radius: 10px;

            color:
                rgba(255,255,255,0.5);

            background:
                rgba(0,0,0,0.15);

            font-size: 9px;

        }


        .reveal-element {

            opacity: 0;

            transform:
                translateY(25px);

            transition:
                opacity 0.7s ease,
                transform 0.7s ease;

        }


        .reveal-visible {

            opacity: 1;

            transform:
                translateY(0);

        }


        @media (max-width: 900px) {

            .donor-results-grid {

                grid-template-columns:
                    repeat(2, 1fr);

            }

        }


        @media (max-width: 600px) {

            .donor-results-grid {

                grid-template-columns: 1fr;

            }

        }

    `;


    document.head.appendChild(style);

}


/* =========================================================
   SECURITY HELPER
========================================================= */

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =========================================================
   END
========================================================= */