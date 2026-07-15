document.addEventListener("DOMContentLoaded", () => {
    // Aapki HTML ke exact elements ko target kiya hai
    const giftBox = document.getElementById("giftBox");
    const giftSection = document.getElementById("giftSection");
    const countdownScreen = document.getElementById("countdownScreen");
    const countdownNumber = document.getElementById("countdownNumber");
    const bdayGreetingScreen = document.getElementById("bdayGreetingScreen");
    const messageSection = document.getElementById("messageSection"); // Aapka scroll-letter box

    // 1. Gift Box Click Event
    if (giftBox) {
        giftBox.addEventListener("click", () => {
            if (giftSection) giftSection.classList.add("hidden");
            if (countdownScreen) {
                countdownScreen.classList.remove("hidden");
                startCountdownTimer();
            } else {
                showBirthdayGreeting();
            }
        });
    }

    // 2. Countdown Timer Logic
    function startCountdownTimer() {
        let count = 3;
        if (countdownNumber) countdownNumber.textContent = count;

        // HTML ke countdown audio tag ko play karega
        const countdownAudio = document.getElementById("countdownAudio");
        if (countdownAudio) {
            countdownAudio.play().catch(err => console.log("Audio play blocked", err));
        }

        const timer = setInterval(() => {
            count--;
            if (count > 0) {
                if (countdownNumber) countdownNumber.textContent = count;
            } else {
                clearInterval(timer);
                if (countdownScreen) countdownScreen.classList.add("hidden");
                showBirthdayGreeting();
            }
        }, 1000);
    }

    // 3. Greeting Screen Sequence
    function showBirthdayGreeting() {
        if (bdayGreetingScreen) {
            bdayGreetingScreen.classList.remove("hidden");
        }

        // Background music play hoga
        const bgMusic = document.getElementById("bgMusic");
        if (bgMusic) {
            bgMusic.play().catch(err => console.log("BG Music play blocked", err));
        }

        // 3 seconds baad romantic letter section show hoga
        setTimeout(() => {
            if (bdayGreetingScreen) bdayGreetingScreen.classList.add("hidden");
            if (messageSection) {
                messageSection.classList.remove("hidden");
                // Smooth transition ke liye active class jodi hai
                setTimeout(() => {
                    messageSection.classList.add("active");
                    typeWriterEffect();
                }, 100);
            }
        }, 3000);
    }

    // 4. Romantic Typewriter Engine (Heading center ke sath)
    async function typeWriterEffect() {
        const targetDiv = document.getElementById("typewriterText");
        const scrollBox = document.getElementById("messageSection");
        if (!targetDiv) return;

        const letterData = [
            { type: 'h3', text: 'HAPPY BIRTHDAY GUNGUN ❤️' }, // Yeh header CSS se center hoga
            { type: 'p', text: 'Gungun, main bas yehi dua karta hu ki tum hamesha khush raho. Tumhare chehre ki smile kabhi kam na ho, kyuki tum sach me har ek happiness deserve karti ho.' },
            { type: 'p', text: 'Hamesha aise hi muskurati rehna, apne sapno ko poora karna aur life me aage badhte rehna.' },
            { type: 'p', text: 'Aur ek baat... tum hamesha mere liye bahut special aur important rahogi. ❤️' },
            { type: 'p', text: 'Once again, Happy Birthday Gungun! 🥳🎂', className: 'highlight-bday' },
            { type: 'p', text: 'Take care of yourself. ✨', className: 'signature' }
        ];

        targetDiv.innerHTML = ""; // Clear existing before typing

        for (const data of letterData) {
            const element = document.createElement(data.type);
            if (data.className) element.classList.add(data.className);
            targetDiv.appendChild(element);

            let rawText = data.text;
            
            for (let i = 0; i < rawText.length; i++) {
                // Purana temporary cursor hatao
                const oldCursor = element.querySelector('.heart-cursor');
                if (oldCursor) oldCursor.remove();

                // Naya text aur pulsing heart cursor jodo
                element.innerHTML += rawText.charAt(i);
                element.innerHTML += '<span class="heart-cursor">❤️</span>';

                // Automatically scroll down as it types
                if (scrollBox) {
                    scrollBox.scrollTop = scrollBox.scrollHeight;
                }
                
                await new Promise(res => setTimeout(res, 45));
            }

            // Paragraph khatam hote hi aakhiri cursor remove karo
            const finalCursor = element.querySelector('.heart-cursor');
            if (finalCursor) finalCursor.remove();

            await new Promise(res => setTimeout(res, 600));
        }
    }
});
