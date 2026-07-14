document.addEventListener("DOMContentLoaded", () => {
    // Ye direct aapki purani HTML ke elements ko pakdega
    const startBtn = document.querySelector('[onclick*="startCountdown"]'); // Gift box ya button
    const splashScreen = document.getElementById("splashScreen");
    const countdownScreen = document.getElementById("countdownScreen");
    const countdownNumber = document.getElementById("countdownNumber");
    const bdayGreetingScreen = document.getElementById("bdayGreetingScreen");
    const scrollLetter = document.getElementById("scrollLetter");

    // Agar direct HTML onclick call nahi ho rahi, toh hum is event listener se safe-handle karenge
    const giftBoxElement = document.querySelector('.gift-container') || document.querySelector('.splash-container') || document.getElementById("splashScreen");
    
    if (giftBoxElement) {
        giftBoxElement.addEventListener("click", () => {
            triggerStart();
        });
    }

    // Is function ko global scope mein bhi daal dete hain taaki HTML ka "onclick" crash na ho
    window.startCountdown = function() {
        triggerStart();
    };

    function triggerStart() {
        if (splashScreen) splashScreen.classList.add("hidden");
        
        // Agar countdown screen hai toh wahan le jao, nahi toh direct letter par
        if (countdownScreen) {
            countdownScreen.classList.remove("hidden");
            startCountdownTimer();
        } else {
            showBirthdayGreeting();
        }
    }

    // Countdown logic
    function startCountdownTimer() {
        let count = 3;
        if (countdownNumber) countdownNumber.textContent = count;

        const countdownMusic = document.getElementById("countdownMusic");
        if (countdownMusic) {
            countdownMusic.play().catch(err => console.log("Music play blocked", err));
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

    // Greeting transition to romantic letter
    function showBirthdayGreeting() {
        if (bdayGreetingScreen) {
            bdayGreetingScreen.classList.remove("hidden");
        }

        const bgMusic = document.getElementById("bgMusic");
        if (bgMusic) {
            bgMusic.play().catch(err => console.log("BG Music play blocked", err));
        }

        setTimeout(() => {
            if (bdayGreetingScreen) bdayGreetingScreen.classList.add("hidden");
            if (scrollLetter) {
                scrollLetter.classList.remove("hidden");
                setTimeout(() => {
                    scrollLetter.classList.add("active");
                    typeWriterEffect();
                }, 100);
            }
        }, 3000);
    }

    // Typewriter engine with beautiful heart cursor
    async function typeWriterEffect() {
        const targetDiv = document.getElementById("typewriterText");
        const scrollBox = document.querySelector(".scroll-letter");
        if (!targetDiv) return;

        const letterData = [
            { type: 'h3', text: 'HAPPY BIRTHDAY GUNGUN ❤️' },
            { type: 'p', text: 'Gungun, main bas yehi dua karta hu ki tum hamesha khush raho. Tumhare chehre ki smile kabhi kam na ho, kyuki tum sach me har ek happiness deserve karti ho.' },
            { type: 'p', text: 'Hamesha aise hi muskurati rehna, apne sapno ko poora karna aur life me aage badhte rehna.' },
            { type: 'p', text: 'Aur ek baat... tum hamesha mere liye bahut special aur important rahogi. ❤️' },
            { type: 'p', text: 'Once again, Happy Birthday Gungun! 🥳🎂', className: 'highlight-bday' },
            { type: 'p', text: 'Take care of yourself. ✨', className: 'signature' }
        ];

        targetDiv.innerHTML = ""; // Clear existing

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

                if (scrollBox) {
                    scrollBox.scrollTop = scrollBox.scrollHeight;
                }
                
                await new Promise(res => setTimeout(res, 45));
            }

            const finalCursor = element.querySelector('.heart-cursor');
            if (finalCursor) finalCursor.remove();

            await new Promise(res => setTimeout(res, 600));
        }
    }
});
                
