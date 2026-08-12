// 🎈 1. Balloon Loader Animation Logic (5 second wait)
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const balloonLoader = document.getElementById("balloonLoader");
        const mainContainer = document.getElementById("mainWishContainer");

        if (balloonLoader) {
            balloonLoader.style.display = "none";
        }
        if (mainContainer) {
            mainContainer.classList.remove("main-content-hidden");
            mainContainer.classList.add("main-content-visible");
        }
    }, 4500); // 4.5 seconds tak balloons upar jaayenge
});

// 🎁 2. Box Click Handler
function openBox() {
    const giftBox = document.getElementById("giftBoxSection");
    const messageSection = document.getElementById("messageSection");

    if (giftBox) giftBox.classList.add("hidden");
    if (messageSection) messageSection.classList.remove("hidden");

    typeWriterEffect();
}

// ✍️ 3. Typewriter Engine (Exact Updated Letter)
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
            element.innerHTML += '<span class="heart-cursor">❤️</span>';

            if (scrollBox) scrollBox.scrollTop = scrollBox.scrollHeight;
            await new Promise(res => setTimeout(res, 45)); 
        }
        const finalCursor = element.querySelector('.heart-cursor');
        if (finalCursor) finalCursor.remove();
        await new Promise(res => setTimeout(res, 350));
    }
}
