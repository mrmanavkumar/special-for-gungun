// 🎈 1. Background Continuous Rain (Balloons, Sparkles, Hearts)
function createBackgroundEffects() {
    const container = document.getElementById("effects-container");
    if (!container) return;

    const elements = ["🎈", "✨", "⭐", "🌸", "💖", "💫"];
    const totalCount = 40;

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

// ⏳ 2. Preloader Logic
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

// 🎁 3. Main Step-by-Step Sequence Trigger
let sequenceStarted = false;

function startSurpriseSequence() {
    if (sequenceStarted) return;
    sequenceStarted = true;

    const giftBoxContainer = document.getElementById("giftBoxContainer");
    const giftBoxSection = document.getElementById("giftBoxSection");
    const countdownOverlay = document.getElementById("countdownOverlay");
    const countdownNumber = document.getElementById("countdownNumber");
    const birthdayGreeting = document.getElementById("birthdayGreeting");
    const templateSection = document.getElementById("templateSection");
    const messageSection = document.getElementById("messageSection");
    const music = document.getElementById("bgMusic");

    // STEP A: Box Shaking Effect (1.2 Seconds)
    giftBoxContainer.classList.add("shake-box");

    setTimeout(() => {
        // Hide Box & Start Countdown Overlay
        giftBoxSection.classList.add("hidden");
        countdownOverlay.classList.remove("hidden");

        let count = 3;
        countdownNumber.innerText = count;

        let timer = setInterval(() => {
            count--;
            if (count > 0) {
                countdownNumber.innerText = count;
            } else {
                clearInterval(timer);
                countdownOverlay.classList.add("hidden");

                // STEP B: "Happy Birthday!" Text Appears AND Music Starts
                birthdayGreeting.classList.remove("hidden");
                if (music) {
                    music.play().catch(err => console.log("Audio Error:", err));
                }

                // STEP C: Template Entry (3 Seconds after Happy Birthday text)
                setTimeout(() => {
                    templateSection.classList.remove("hidden");
                    templateSection.classList.add("fade-in-slow");

                    // STEP D: Template Stays for 15 Seconds then Fade Out
                    setTimeout(() => {
                        templateSection.classList.remove("fade-in-slow");
                        templateSection.classList.add("fade-out-slow");

                        // STEP E: Show Letter Section Smoothly
                        setTimeout(() => {
                            templateSection.classList.add("hidden");
                            messageSection.classList.remove("hidden");
                            messageSection.classList.add("fade-in-slow");

                            typeWriterEffect();
                        }, 2000);

                    }, 15000);

                }, 3000);
            }
        }, 1000);

    }, 1200);
}

// ✍️ 4. Typewriter Letter Engine (With Auto Scroll)
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
