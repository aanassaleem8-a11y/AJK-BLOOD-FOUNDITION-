/* =========================================================
   AJK BLOOD FOUNDATION
   FINAL FRONT-END JAVASCRIPT
========================================================= */


/* =========================================================
   FOUNDATION WHATSAPP CONFIGURATION
=========================================================

   IMPORTANT:
   Abhi number blank hai.

   Baad mein sirf is jagah official foundation WhatsApp
   number add karna hoga.

   Example:
   const FOUNDATION_WHATSAPP_NUMBER = "923001234567";

   Pakistan number:
   03001234567
   becomes:
   923001234567

   +, spaces ya dashes nahi lagane.
========================================================= */

const FOUNDATION_WHATSAPP_NUMBER = "";


/* =========================================================
   DEMO BLOOD CASE / DONOR DATABASE
=========================================================

   Har record:

   name
   bloodGroup
   area
   phone
   caseClosedDate

   Rule:
   Case closed date + 3 calendar months
   = donor available/searchable date

========================================================= */

const donors = [

    {
        id: 1,
        name: "Muhammad Usman",
        bloodGroup: "O+",
        area: "Bagh",
        phone: "03000000001",
        caseClosedDate: "2026-05-20"
    },

    {
        id: 2,
        name: "Ahmed Khan",
        bloodGroup: "B+",
        area: "Rawalpindi",
        phone: "03000000002",
        caseClosedDate: "2026-06-10"
    },

    {
        id: 3,
        name: "Ali Raza",
        bloodGroup: "A+",
        area: "Muzaffarabad",
        phone: "03000000003",
        caseClosedDate: "2026-04-15"
    },

    {
        id: 4,
        name: "Hassan Ahmed",
        bloodGroup: "O-",
        area: "Bagh",
        phone: "03000000004",
        caseClosedDate: "2026-07-01"
    },

    {
        id: 5,
        name: "Usman Ali",
        bloodGroup: "AB+",
        area: "Rawalpindi",
        phone: "03000000005",
        caseClosedDate: "2026-03-12"
    },

    {
        id: 6,
        name: "Bilal Hussain",
        bloodGroup: "B-",
        area: "Muzaffarabad",
        phone: "03000000006",
        caseClosedDate: "2026-07-10"
    }

];


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

    addDonorCardStyles();

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


        if (!icon) {
            return;
        }


        if (navMenu.classList.contains("show")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });


    /* Close mobile menu after clicking a link */

    const links =
        navMenu.querySelectorAll("a");


    links.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("show");


            const icon =
                menuButton.querySelector("i");


            if (!icon) {
                return;
            }


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
        document.querySelectorAll('a[href^="#"]');


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
                document.querySelector(".header");


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

    const buttonIds = [

        "navWhatsapp",

        "heroWhatsapp",

        "emergencyWhatsapp",

        "donorWhatsapp",

        "contactWhatsapp",

        "floatingWhatsapp",

        "ctaWhatsapp",

        "footerWhatsapp",

        "footerWhatsappText"

    ];


    buttonIds.forEach(id => {

        const button =
            document.getElementById(id);


        if (!button) {
            return;
        }


        button.addEventListener("click", event => {

            event.preventDefault();


            let message =
                "Assalam o Alaikum, I want to contact AJK Blood Foundation.";


            if (id === "emergencyWhatsapp") {

                message =
                    "Assalam o Alaikum, I need urgent blood support. Please guide me.";

            }


            if (id === "donorWhatsapp") {

                message =
                    "Assalam o Alaikum, I want to contact AJK Blood Foundation regarding blood donation and support.";

            }


            if (id === "heroWhatsapp") {

                message =
                    "Assalam o Alaikum, I want to contact AJK Blood Foundation.";

            }


            if (id === "ctaWhatsapp") {

                message =
                    "Assalam o Alaikum, I want to learn more about AJK Blood Foundation.";

            }


            openFoundationWhatsApp(message);

        });

    });

}


/* =========================================================
   OPEN FOUNDATION WHATSAPP
========================================================= */

function openFoundationWhatsApp(message = "") {

    /*
       Number intentionally blank for now.
    */

    if (!FOUNDATION_WHATSAPP_NUMBER) {

        alert(
            "Foundation WhatsApp number will be added soon."
        );

        return;

    }


    const cleanNumber =
        cleanPhone(
            FOUNDATION_WHATSAPP_NUMBER
        );


    if (!cleanNumber) {

        alert(
            "Foundation WhatsApp number is not configured yet."
        );

        return;

    }


    let whatsappURL =
        `https://wa.me/${cleanNumber}`;


    if (message) {

        whatsappURL +=
            `?text=${encodeURIComponent(message)}`;

    }


    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

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

            event.preventDefault();

            performBloodSearch();

        }

    });

}


/* =========================================================
   PERFORM BLOOD SEARCH
========================================================= */

function performBloodSearch() {

    const bloodGroupElement =
        document.getElementById("bloodGroup");

    const areaElement =
        document.getElementById("area");

    const resultsContainer =
        document.getElementById("donorResults");


    if (
        !bloodGroupElement ||
        !areaElement ||
        !resultsContainer
    ) {
        return;
    }


    const bloodGroup =
        bloodGroupElement.value.trim();


    const area =
        normalizeText(
            areaElement.value
        );


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
                    to search available donors.
                </p>

            </div>

        `;

        return;

    }


    /*
       Sirf woh donors appear honge
       jinke case close hone ke 3 calendar months
       complete ho chuke hain.
    */

    const availableDonors =
        donors.filter(donor => {

            return calculateDonorStatus(
                donor.caseClosedDate
            ).available;

        });


    const matchingDonors =
        availableDonors.filter(donor => {

            const groupMatches =
                !bloodGroup ||
                donor.bloodGroup === bloodGroup;


            const areaMatches =
                !area ||
                normalizeText(donor.area)
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

    if (!matchingDonors.length) {

        container.innerHTML = `

            <div class="empty-results">

                <div class="empty-icon">
                    <i class="fa-solid fa-heart-crack"></i>
                </div>

                <h3>
                    No Available Donor Found
                </h3>

                <p>
                    No donor matching your search is
                    currently available. Try another
                    blood group or area.
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

}


/* =========================================================
   CREATE DONOR CARD
========================================================= */

function createDonorCard(donor) {

    const status =
        calculateDonorStatus(
            donor.caseClosedDate
        );


    const safeName =
        escapeHTML(donor.name);


    const safeArea =
        escapeHTML(donor.area);


    const safeBloodGroup =
        escapeHTML(donor.bloodGroup);


    const jsName =
        escapeJS(donor.name);


    const jsBloodGroup =
        escapeJS(donor.bloodGroup);


    const jsArea =
        escapeJS(donor.area);


    return `

        <article class="donor-card">

            <div class="donor-card-top">

                <div class="donor-blood">
                    ${safeBloodGroup}
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
                            ${safeBloodGroup}
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

                    <i class="fa-solid fa-circle-check"></i>

                    <span>
                        Available Now
                    </span>

                </div>

            </div>


            <div class="donor-card-bottom">

                <button
                    type="button"
                    class="donor-contact"
                    onclick="contactDonorViaFoundation('${jsName}', '${jsBloodGroup}', '${jsArea}')"
                >

                    <i class="fa-brands fa-whatsapp"></i>

                    Contact Foundation

                </button>

            </div>

        </article>

    `;

}


/* =========================================================
   CONTACT FOUNDATION ABOUT DONOR
========================================================= */

function contactDonorViaFoundation(
    donorName,
    bloodGroup,
    area
) {

    const message =
        `Assalam o Alaikum, I need blood assistance.

Donor Name: ${donorName}
Blood Group: ${bloodGroup}
Area: ${area}

Please help me with this blood requirement.`;


    openFoundationWhatsApp(message);

}


/* =========================================================
   DONOR STATUS CALCULATION
=========================================================

   Example:

   Case closed:
   20 May 2026

   Available:
   20 August 2026

========================================================= */

function calculateDonorStatus(caseClosedDate) {

    const closedDate =
        parseLocalDate(caseClosedDate);


    if (!closedDate) {

        return {

            available: false,

            label: "Case Closed",

            className: "status-pending"

        };

    }


    const availableDate =
        addCalendarMonths(
            closedDate,
            3
        );


    const today =
        startOfToday();


    if (today >= availableDate) {

        return {

            available: true,

            label: "Available",

            className: "status-available",

            availableDate: availableDate

        };

    }


    const remainingDays =
        calculateDaysBetween(
            today,
            availableDate
        );


    return {

        available: false,

        label: "Case Closed",

        className: "status-pending",

        remainingDays: remainingDays,

        availableDate: availableDate

    };

}


/* =========================================================
   ADD CALENDAR MONTHS
========================================================= */

function addCalendarMonths(
    date,
    months
) {

    const originalDay =
        date.getDate();


    const result =
        new Date(date);


    result.setDate(1);


    result.setMonth(
        result.getMonth() + months
    );


    const lastDay =
        new Date(
            result.getFullYear(),
            result.getMonth() + 1,
            0
        ).getDate();


    result.setDate(
        Math.min(
            originalDay,
            lastDay
        )
    );


    return startOfDay(result);

}


/* =========================================================
   DATE PARSER
========================================================= */

function parseLocalDate(dateString) {

    if (!dateString) {
        return null;
    }


    const parts =
        String(dateString)
            .split("-")
            .map(Number);


    if (parts.length !== 3) {
        return null;
    }


    const [
        year,
        month,
        day
    ] = parts;


    const date =
        new Date(
            year,
            month - 1,
            day
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return null;
    }


    return startOfDay(date);

}


/* =========================================================
   START OF TODAY
========================================================= */

function startOfToday() {

    return startOfDay(
        new Date()
    );

}


/* =========================================================
   START OF DAY
========================================================= */

function startOfDay(date) {

    const result =
        new Date(date);


    result.setHours(
        0,
        0,
        0,
        0
    );


    return result;

}


/* =========================================================
   CALCULATE DAYS BETWEEN DATES
========================================================= */

function calculateDaysBetween(
    startDate,
    endDate
) {

    const difference =
        endDate.getTime() -
        startDate.getTime();


    return Math.max(
        0,
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        )
    );

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {

    const date =
        parseLocalDate(dateString);


    if (!date) {
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
        String(phone || "")
            .replace(/\D/g, "");


    /*
       Pakistan local number:

       03001234567

       becomes:

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
   NORMALIZE TEXT
========================================================= */

function normalizeText(value) {

    return String(value || "")
        .trim()
        .toLowerCase();

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
                donor.caseClosedDate
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

            margin-top: 20px;

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

            transition:
                transform 0.3s ease,
                background 0.3s ease,
                border-color 0.3s ease;

        }


        .donor-card:hover {

            transform:
                translateY(-5px);

            background:
                rgba(255,255,255,0.09);

            border-color:
                rgba(255,255,255,0.20);

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

            flex-shrink: 0;

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

            white-space: nowrap;

        }


        .donor-status span {

            width: 6px;

            height: 6px;

            border-radius: 50%;

            display: block;

            flex-shrink: 0;

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

            line-height: 1.25;

        }


        .donor-detail {

            display: flex;

            align-items: center;

            gap: 9px;

            margin-top: 9px;

            color:
                rgba(255,255,255,0.58);

            font-size: 10px;

            line-height: 1.5;

        }


        .donor-detail i {

            width: 20px;

            flex-shrink: 0;

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

            min-height: 45px;

            display: flex;

            align-items: center;

            justify-content: center;

            gap: 8px;

            border: 0;

            border-radius: 10px;

            color: white;

            background: #15803d;

            font-family: inherit;

            font-size: 10px;

            font-weight: 800;

            cursor: pointer;

            transition:
                transform 0.3s ease,
                background 0.3s ease;

        }


        .donor-contact:hover {

            transform:
                translateY(-2px);

            background:
                #16a34a;

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

                gap: 14px;

            }


            .donor-card {

                padding: 20px;

                border-radius: 18px;

            }


            .donor-card-top {

                gap: 10px;

            }


            .donor-blood {

                width: 50px;

                height: 50px;

                border-radius: 13px;

            }


            .donor-status {

                font-size: 8px;

                padding: 6px 8px;

            }


            .donor-info h3 {

                font-size: 20px;

                margin-top: 18px;

            }


            .donor-detail {

                font-size: 10px;

            }


            .donor-contact {

                min-height: 48px;

                font-size: 11px;

            }

        }

    `;


    document.head.appendChild(style);

}


/* =========================================================
   ESCAPE HTML
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
   ESCAPE JAVASCRIPT STRING
========================================================= */

function escapeJS(value) {

    return String(value || "")

        .replace(/\\/g, "\\\\")

        .replace(/'/g, "\\'")

        .replace(/"/g, '\\"')

        .replace(/\r?\n/g, "\\n");

}


/* =========================================================
   END
========================================================= */
