document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.getElementById("splashScreen");
    const countdownScreen = document.getElementById("countdownScreen");
    const countdownNumber = document.getElementById("countdownNumber");
    const bdayGreetingScreen = document.getElementById("bdayGreetingScreen");
    const scrollLetter = document.getElementById("scrollLetter");

    // 1. Splash Screen Tap Event
    splashScreen.addEventListener("click", () => {
        splashScreen.classList.add("hidden");
        countdownScreen.classList.remove("hidden");
        startCountdown();
    });

    // 2. Countdown Engine
    function startCountdown() {
        let count = 3;
        countdownNumber.textContent = count;

        const countdownMusic = document.getElementById("countdownMusic");
        if (countdownMusic) {
            countdownMusic.play().catch(err => console.log("Music play blocked", err));
        }

        const timer = setInterval(() => {
            count--;
            if (count > 0) {
                countdownNumber.textContent = count;
            } else {
                clearInterval(timer);
                countdownScreen.classList.add("hidden");
                showBirthdayGreeting();
            }
        }, 1000);
    }

    // 3. Birthday Greeting Screen Sequence
    function showBirthdayGreeting() {
        bdayGreetingScreen.classList.remove("hidden");

        const bgMusic = document.getElementById("bgMusic");
        if (bgMusic) {
            bgMusic.play().catch(err => console.log("BG Music play blocked", err));
        }

        // 3 Seconds baad automatically gift box transition and letter page open
        setTimeout(() => {
            bdayGreetingScreen.classList.add("hidden");
            scrollLetter.classList.remove("hidden");
            // Add class for smooth fade in
            setTimeout(() => {
                scrollLetter.classList.add("active");
                typeWriterEffect();
            }, 100);
        }, 3000);
    }

    // 4. Premium Romantic Typewriter Engine with Heart Cursor
    async function typeWriterEffect() {
        const targetDiv = document.getElementById("typewriterText");
        const scrollBox = document.querySelector(".scroll-letter");
        if (!targetDiv) return;

        // Custom Deep Romantic Letter Content
        const letterData = [
            { type: 'h3', text: 'HAPPY BIRTHDAY GUNGUN ❤️' },
            { type: 'p', text: 'Gungun, main bas yehi dua karta hu ki tum hamesha khush raho. Tumhare chehre ki smile kabhi kam na ho, kyuki tum sach me har ek happiness deserve karti ho.' },
            { type: 'p', text: 'Hamesha aise hi muskurati rehna, apne sapno ko poora karna aur life me aage badhte rehna.' },
            { type: 'p', text: 'Aur ek baat... tum hamesha mere liye bahut special aur important rahogi. ❤️' },
            { type: 'p', text: 'Once again, Happy Birthday Gungun! 🥳🎂', className: 'highlight-bday' },
            { type: 'p', text: 'Take care of yourself. ✨', className: 'signature' }
        ];

        targetDiv.innerHTML = ""; // Pehle clear karein

        for (const data of letterData) {
            const element = document.createElement(data.type);
            if (data.className) element.classList.add(data.className);
            targetDiv.appendChild(element);

            let rawText = data.text;
            
            for (let i = 0; i < rawText.length; i++) {
                // Remove previous temporary heart cursors
                const oldCursor = element.querySelector('.heart-cursor');
                if (oldCursor) oldCursor.remove();

                // Append new character + glowing heart cursor
                element.innerHTML += rawText.charAt(i);
                element.innerHTML += '<span class="heart-cursor">❤️</span>';

                // Smooth scrolling calculation
                if (scrollBox) {
                    scrollBox.scrollTop = scrollBox.scrollHeight;
                }
                
                // Typing speed setup (45ms per word)
                await new Promise(res => setTimeout(res, 45));
            }

            // End of paragraph cursor removal
            const finalCursor = element.querySelector('.heart-cursor');
            if (finalCursor) finalCursor.remove();

            // Delay between paragraphs (600ms)
            await new Promise(res => setTimeout(res, 600));
        }
    }
});
                
