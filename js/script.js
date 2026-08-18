// ======================================
// CURRENT YEAR
// ======================================

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


// ======================================
// THEME
// ======================================

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");


function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add(
            "light-theme"
        );

        if (themeIcon) {
            themeIcon.textContent = "☀";
        }

    } else {

        document.body.classList.remove(
            "light-theme"
        );

        if (themeIcon) {
            themeIcon.textContent = "◐";
        }

    }

}


function getInitialTheme() {

    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    if (
        savedTheme === "light" ||
        savedTheme === "dark"
    ) {
        return savedTheme;
    }


    // 默认使用深色。
    // 如果你希望自动跟随系统，
    // 可以把这里改成 prefers-color-scheme。

    return "dark";
}


let currentTheme =
    getInitialTheme();


applyTheme(currentTheme);


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            currentTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";


            applyTheme(
                currentTheme
            );


            localStorage.setItem(
                "portfolio-theme",
                currentTheme
            );

        }
    );

}


// ======================================
// LANGUAGE
// ======================================

const languageToggle =
    document.getElementById(
        "languageToggle"
    );


let currentLanguage =
    localStorage.getItem(
        "portfolio-language"
    ) || "en";


function updateLanguage() {

    const elements =
        document.querySelectorAll(
            "[data-en][data-zh]"
        );


    elements.forEach(
        (element) => {

            let content;


            if (
                currentLanguage === "zh"
            ) {

                content =
                    element.dataset.zh;

            } else {

                content =
                    element.dataset.en;

            }


            // 技能列表需要保留换行
            if (
                element.classList.contains(
                    "multiline-language"
                )
            ) {

                element.innerHTML =
                    content.replaceAll(
                        "|",
                        "<br>"
                    );

            } else {

                element.textContent =
                    content;

            }

        }
    );


    if (languageToggle) {

        languageToggle.textContent =
            currentLanguage === "zh"
                ? "EN"
                : "中文";

    }


    document.documentElement.lang =
        currentLanguage === "zh"
            ? "zh-CN"
            : "en";


    localStorage.setItem(
        "portfolio-language",
        currentLanguage
    );

}


if (languageToggle) {

    languageToggle.addEventListener(
        "click",
        () => {

            currentLanguage =
                currentLanguage === "en"
                    ? "zh"
                    : "en";


            updateLanguage();

        }
    );

}


updateLanguage();


// ======================================
// SCROLL REVEAL
// ======================================

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "active"
                                );


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },
            {
                threshold: 0.1,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "active"
            );

        }
    );

}


// ======================================
// MOUSE GLOW
// ======================================

const cursorGlow =
    document.getElementById(
        "cursorGlow"
    );


if (cursorGlow) {

    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;


    window.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        }
    );


    function animateGlow() {

        glowX +=
            (mouseX - glowX)
            * 0.08;

        glowY +=
            (mouseY - glowY)
            * 0.08;


        cursorGlow.style.left =
            `${glowX}px`;

        cursorGlow.style.top =
            `${glowY}px`;


        requestAnimationFrame(
            animateGlow
        );

    }


    animateGlow();

}


// ======================================
// MOBILE MENU
// ======================================

const mobileMenuButton =
    document.getElementById(
        "mobileMenuButton"
    );

const navLinksContainer =
    document.querySelector(
        ".nav-links"
    );


function closeMobileMenu() {

    if (
        !navLinksContainer ||
        !mobileMenuButton
    ) {
        return;
    }


    navLinksContainer
        .classList
        .remove(
            "open"
        );


    mobileMenuButton
        .classList
        .remove(
            "open"
        );


    mobileMenuButton
        .setAttribute(
            "aria-expanded",
            "false"
        );

}


if (
    mobileMenuButton &&
    navLinksContainer
) {

    mobileMenuButton
        .setAttribute(
            "aria-expanded",
            "false"
        );


    mobileMenuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinksContainer
                    .classList
                    .toggle(
                        "open"
                    );


            mobileMenuButton
                .classList
                .toggle(
                    "open",
                    isOpen
                );


            mobileMenuButton
                .setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );

        }
    );


    navLinksContainer
        .querySelectorAll("a")
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    closeMobileMenu
                );

            }
        );

}


// ======================================
// CLOSE MOBILE MENU ON RESIZE
// ======================================

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 760
        ) {

            closeMobileMenu();

        }

    }
);


// ======================================
// ACTIVE NAVIGATION
// ======================================

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navbarLinks =
    document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop
                - 180;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navbarLinks.forEach(
        (link) => {

            const target =
                link.getAttribute(
                    "href"
                );


            link.classList.remove(
                "active"
            );


            if (
                target ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


updateActiveNavigation();


// ======================================
// PROJECT CARD TILT
// ======================================

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth <
                    900
                ) {
                    return;
                }


                const rect =
                    card
                        .getBoundingClientRect();


                const x =
                    event.clientX
                    - rect.left;


                const y =
                    event.clientY
                    - rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    (
                        x - centerX
                    ) / 75;


                const rotateX =
                    (
                        centerY - y
                    ) / 75;


                card.style.transform =
                    `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-6px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


// ======================================
// SMOOTH INTERNAL LINKS
// ======================================

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                // 单独处理 href="#"
                if (
                    href === "#"
                ) {

                    event.preventDefault();


                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });


                    return;
                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }
);