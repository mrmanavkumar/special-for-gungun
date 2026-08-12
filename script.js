// 🎈 1. Background Rain Balloons & Sparkles Generator
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

// ⏳ 2. Preloader & Initialize
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

// 🎁 3. Gift Box Open Event Trigger
function openBox() {
    const giftBox = document.getElementById("giftBoxSection");
    const templateSection = document.getElementById("templateSection");
    const messageSection = document.getElementById("messageSection");
    const music = document.getElementById("bgMusic");

    // Hide Gift Box, Reveal Template, Sketch & Message
    if (giftBox) giftBox.classList.add("hidden");
    if (templateSection) templateSection.classList.remove("hidden");
    if (messageSection) messageSection.classList.remove("hidden");

    // Play countdown.mp3
    if (music) {
        music.play().catch(err => console.log("Audio play prevented:", err));
    }

    typeWriterEffect();
}

// ✍️ 4. Typewriter Letter Engine
async function typeWriterEffect() {
    const targetDiv = document.getElementById("typewriterText");
    const scrollBox = document.getElementById("messageSection");
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

            if (scrollBox) scrollBox.scrollTop = scrollBox.scrollHeight;
            await new Promise(res => setTimeout(res, 45)); 
        }
        const finalCursor = element.querySelector('.heart-cursor');
        if (finalCursor) finalCursor.remove();
        await new Promise(res => setTimeout(res, 350));
    }
}
