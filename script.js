// 🎈 Background Rain
function createBackgroundEffects() {
    const container = document.getElementById("effects-container");
    if (!container) return;

    const elements = ["🌸", "✨", "💖", "💫", "🌹"];
    const totalCount = 30;

    for (let i = 0; i < totalCount; i++) {
        const span = document.createElement("span");
        span.classList.add("floating-element");

        const randomSymbol = elements[Math.floor(Math.random() * elements.length)];
        span.innerText = randomSymbol;

        const leftPos = Math.random() * 100;
        const duration = 6 + Math.random() * 6;
        const delay = Math.random() * 4;
        const fontSize = 14 + Math.random() * 16;

        span.style.left = `${leftPos}vw`;
        span.style.animationDuration = `${duration}s`;
        span.style.animationDelay = `${delay}s`;
        span.style.fontSize = `${fontSize}px`;

        container.appendChild(span);
    }
}

// ⏳ Setup
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
    }, 2500);
});

// 🎁 Surprise Flow
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

    if (giftBoxContainer) {
        giftBoxContainer.classList.add("shake-box");
    }

    setTimeout(() => {
        if (giftBoxSection) giftBoxSection.classList.add("hidden");
        if (countdownOverlay) countdownOverlay.classList.remove("hidden");

        const countdownSteps = ["3", "2", "1", "HAPPY BIRTHDAY"];
        let stepIdx = 0;

        let timer = setInterval(() => {
            stepIdx++;

            if (stepIdx < countdownSteps.length) {
                if (countdownNumber) {
                    countdownNumber.innerText = countdownSteps[stepIdx];
                    if (stepIdx === 3) {
                        countdownNumber.style.fontSize = "2.8rem"; 
                    }
                }

                // Audio Trigger
                if (stepIdx === 3 && music) {
                    music.play().catch(err => console.log("Audio Error:", err));
                }

            } else {
                clearInterval(timer);

                if (countdownOverlay) countdownOverlay.classList.add("hidden");

                setTimeout(() => {
                    if (templateSection) {
                        templateSection.classList.remove("hidden");
                        templateSection.classList.add("fade-in-slow");
                    }

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
                        }, 1200);

                    }, 12000);

                }, 400);
            }
        }, 1000);

    }, 1000);
}

// ✍️ Typewriter Engine with ♥️ Cursor
async function typeWriterEffect() {
    const targetDiv = document.getElementById("typewriterText");
    const scrollContainer = document.getElementById("messageSection");
    if (!targetDiv) return;

    const letterData = [
        { type: 'h3', text: 'SPECIAL WISHES FOR GUNGUN 🦋' },
        { type: 'p', text: 'Gungun, main bas yehi dua kerta hu ki tum humesha khush rho. Tumhare chahre ki muskan kabhi kam naa ho kyuki tum sachme her ek khushi deserve kerti ho.' },
        { type: 'p', text: 'Humehsa aise hi muskurati rehna, aur apne sapno ko pura kerna or life me aage badhte rehna 🩺👩‍⚕️🩺' },
        { type: 'p', text: 'Once again happy birthday 🎊✨' },
        { type: 'p', text: 'Take care of yourself. 🌸✨', className: 'italic-line' },
        { type: 'p', text: '- MANAV', className: 'signature' }
    ];

    targetDiv.innerHTML = ""; 

    for (const data of letterData) {
        const element = document.createElement(data.type);
        if (data.className) element.className = data.className;
        targetDiv.appendChild(element);

        let rawText = data.text;
        for (let i = 0; i < rawText.length; i++) {
            const oldCursor = element.querySelector('.heart-cursor');
            if (oldCursor) oldCursor.remove();

            element.innerHTML += rawText.charAt(i);
            element.innerHTML += '<span class="heart-cursor">♥️</span>';

            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
            await new Promise(res => setTimeout(res, 40)); 
        }
        const finalCursor = element.querySelector('.heart-cursor');
        if (finalCursor) finalCursor.remove();
        await new Promise(res => setTimeout(res, 300));
    }
}
