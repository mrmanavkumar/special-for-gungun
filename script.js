// 🎈 1. Background Rain Effects
function createBackgroundEffects() {
    const container = document.getElementById("effects-container");
    if (!container) return;

    const elements = ["🎈", "✨", "⭐", "🌸", "💖", "💫"];
    const totalCount = 35;

    for (let i = 0; i < totalCount; i++) {
        const span = document.createElement("span");
        span.classList.add("floating-element");

        const randomSymbol = elements[Math.floor(Math.random() * elements.length)];
        span.innerText = randomSymbol;

        const leftPos = Math.random() * 100;
        const duration = 5 + Math.random() * 7;
        const delay = Math.random() * 5;
        const fontSize = 14 + Math.random() * 18;

        span.style.left = `${leftPos}vw`;
        span.style.animationDuration = `${duration}s`;
        span.style.animationDelay = `${delay}s`;
        span.style.fontSize = `${fontSize}px`;

        container.appendChild(span);
    }
}

// ⏳ 2. Preloader & Setup
window.addEventListener("DOMContentLoaded", () => {
    createBackgroundEffects();

    setTimeout(() => {
        const loader = document.getElementById("balloonLoader");
        const mainContainer = document.getElementById("mainWishContainer");

        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 1000);
        }

        if (mainContainer) {
            mainContainer.classList.remove("main-content-hidden");
            mainContainer.classList.add("main-content-visible");
        }
    }, 3000);
});

// 🎁 3. Sequence Controller
let sequenceStarted = false;

function startSurpriseSequence() {
    if (sequenceStarted) return;
    sequenceStarted = true;

    const giftBoxContainer = document.getElementById("giftBoxContainer");
    const giftBoxSection = document.getElementById("giftBoxSection");
    const countdownOverlay = document.getElementById("countdownOverlay");
    const countdownNumber = document.getElementById("countdownNumber");
    const templateSection = document.getElementById("templateSection");
    const messageSection = document.getElementById("messageSection");
    const music = document.getElementById("bgMusic");

    // STEP A: Box Shake Effect
    if (giftBoxContainer) {
        giftBoxContainer.classList.add("shake-box");
    }

    setTimeout(() => {
        // Hide Box, Show Countdown Overlay
        if (giftBoxSection) giftBoxSection.classList.add("hidden");
        if (countdownOverlay) countdownOverlay.classList.remove("hidden");

        const countdownSteps = ["3", "2", "1", "🎉 Happy Birthday! 🎈"];
        let stepIdx = 0;

        let timer = setInterval(() => {
            stepIdx++;

            if (stepIdx < countdownSteps.length) {
                if (countdownNumber) {
                    countdownNumber.innerText = countdownSteps[stepIdx];
                    if (stepIdx === 3) {
                        countdownNumber.style.fontSize = "2.2rem"; 
                    }
                }

                // Jaise hi 'Happy Birthday!' bolega: Music Starts
                if (stepIdx === 3 && music) {
                    music.play().catch(err => console.log("Audio Error:", err));
                }

            } else {
                clearInterval(timer);

                // STEP B: Hide Happy Birthday Text completely
                if (countdownOverlay) countdownOverlay.classList.add("hidden");

                // STEP C: Show Template Page
                setTimeout(() => {
                    if (templateSection) {
                        templateSection.classList.remove("hidden");
                        templateSection.classList.add("fade-in-slow");
                    }

                    // STEP D: Show Template for 15s then Fade-Out to Letter
                    setTimeout(() => {
                        if (templateSection) {
                            templateSection.classList.remove("fade-in-slow");
                            templateSection.classList.add("fade-out-slow");
                        }

                        setTimeout(() => {
                            if (templateSection) templateSection.classList.add("hidden");
                            if (messageSection) {
                                messageSection.classList.remove("hidden");
                                messageSection.classList.add("fade-in-slow");
                            }

                            typeWriterEffect();
                        }, 1500);

                    }, 15000);

                }, 500);
            }
        }, 1000);

    }, 1200);
}

// ✍️ 4. Typewriter Letter Engine
async function typeWriterEffect() {
    const targetDiv = document.getElementById("typewriterText");
    const scrollContainer = document.getElementById("messageSection");
    if (!targetDiv) return;

    const letterData = [
        { type: 'h3', text: 'SPECIAL WISHES FOR GUNGUN 🦋' },
        { type: 'p', text: 'Gungun, main bas yehi dua kerta hu ki tum humesha khush rho. Tumhare chahre ki muskan kabhi kam naa ho kyuki tum sachme her ek khushi deserve kerti ho.' },
        { type: 'p', text: 'Humehsa aise hi muskurati rehna, aur apne sapno ko kerna or life me aage badhte rehna 🩺👩‍⚕️🩺' },
        { type: 'p', text: 'Once again happy birthday 🎊✨' },
        { type: 'p', text: 'Take care of yourself. 🌸✨', className: 'signature' },
        { type: 'p', text: '- MANAV', className: 'signature' }
    ];

    targetDiv.innerHTML = ""; 

    for (const data of letterData) {
        const element = document.createElement(data.type);
        if (data.className) element.classList.add(data.className);
        targetDiv.appendChild(element);

        let rawText = data.text;
        for (let i = 0; i < rawText.length; i++) {
            const oldCursor = element.querySelector('.heart-cursor');
            if (oldCursor) oldCursor.remove();

            element.innerHTML += rawText.charAt(i);
            element.innerHTML += '<span class="heart-cursor">✨</span>';

            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
            await new Promise(res => setTimeout(res, 45)); 
        }
        const finalCursor = element.querySelector('.heart-cursor');
        if (finalCursor) finalCursor.remove();
        await new Promise(res => setTimeout(res, 350));
    }
}
