document.addEventListener("DOMContentLoaded", () => {
    const giftBox = document.getElementById("giftBox");
    const giftSection = document.getElementById("giftSection");
    const countdownScreen = document.getElementById("countdownScreen");
    const countdownNumber = document.getElementById("countdownNumber");
    const bdayGreetingScreen = document.getElementById("bdayGreetingScreen");
    const templateSection = document.getElementById("templateSection"); 
    const messageSection = document.getElementById("messageSection"); 
    const rainContainer = document.getElementById("rainContainer");

    let rainInterval = null;

    // 1. Beautiful Rain Effect (Rose Petals & Hearts)
    function startMagicalRain() {
        const items = ['🌸', '❤️', '🌹', '💕', '✨', '💝'];
        
        rainInterval = setInterval(() => {
            const element = document.createElement('div');
            element.classList.add('rain-item');
            
            // Random element select karo
            element.innerHTML = items[Math.floor(Math.random() * items.length)];
            
            // Positioning and sizing
            element.style.left = Math.random() * 100 + 'vw';
            const size = Math.random() * 18 + 12; // 12px to 30px
            element.style.fontSize = size + 'px';
            
            // Speed of falling
            const fallDuration = Math.random() * 5 + 4; // 4s to 9s
            element.style.animationDuration = fallDuration + 's';
            
            if (rainContainer) {
                rainContainer.appendChild(element);
            }

            // Garbages delete
            setTimeout(() => {
                element.remove();
            }, fallDuration * 1000);
            
        }, 250); // Har 250ms me barish hogi
    }

    // 2. Gift Box Click Process (2s shaking then countdown)
    if (giftBox) {
        giftBox.addEventListener("click", () => {
            // Box shake shuru karo
            giftBox.classList.add("shake-active");

            // Background music start
            const bgMusic = document.getElementById("bgMusic");
            if (bgMusic) {
                bgMusic.play().catch(err => console.log("Music blocked", err));
            }

            // 2 Seconds tak shake hoga, uske baad box gayab aur countdown
            setTimeout(() => {
                if (giftSection) giftSection.classList.add("hidden");
                if (countdownScreen) {
                    countdownScreen.classList.remove("hidden");
                    startCountdownTimer();
                } else {
                    showBirthdayGreeting();
                }
            }, 2000); // 2 Seconds shake time
        });
    }

    // 3. Countdown Timer (3 -> 2 -> 1)
    function startCountdownTimer() {
        let count = 3;
        if (countdownNumber) countdownNumber.textContent = count;

        const countdownAudio = document.getElementById("countdownAudio");
        if (countdownAudio) {
            countdownAudio.play().catch(err => console.log("Audio blocked", err));
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

    // 4. Greeting Zoom -> Template Display & 15s Fade-out -> Letter Page
    function showBirthdayGreeting() {
        // "HAPPY BIRTHDAY" screen unhide with zoom animation
        if (bdayGreetingScreen) {
            bdayGreetingScreen.classList.remove("hidden");
        }

        // 3 seconds baad zoom text gayab hokar template display karega
        setTimeout(() => {
            if (bdayGreetingScreen) bdayGreetingScreen.classList.add("hidden");
            
            if (templateSection) {
                templateSection.classList.remove("hidden");
                
                // Active class adds smooth entrance
                setTimeout(() => {
                    templateSection.classList.add("active");
                    // Rose/Heart rain shuru
                    startMagicalRain();
                }, 100);
                
                // 15 seconds tak template dikhao, fir dhire-dhire fade-out karo
                setTimeout(() => {
                    // Remove "active" class to start smooth CSS transition fade-out (3 seconds duration)
                    templateSection.classList.remove("active");
                    
                    // 3 seconds ke smooth fade-out complete hone ka wait karein, fir hide karein aur letter laya jaye
                    setTimeout(() => {
                        templateSection.classList.add("hidden");
                        
                        if (messageSection) {
                            messageSection.classList.remove("hidden");
                            setTimeout(() => {
                                messageSection.classList.add("active");
                                typeWriterEffect();
                            }, 100);
                        }
                    }, 3000); // 3s fading wait time
                    
                }, 15000); // 15 Seconds template screen stay time
                
            } else {
                // If template missing, direct letter
                startMagicalRain();
                if (messageSection) {
                    messageSection.classList.remove("hidden");
                    setTimeout(() => {
                        messageSection.classList.add("active");
                        typeWriterEffect();
                    }, 100);
                }
            }
        }, 3000);
    }

    // 5. Typewriter Engine with Beautiful Heart Cursor
    async function typeWriterEffect() {
        const targetDiv = document.getElementById("typewriterText");
        const scrollBox = document.getElementById("messageSection");
        if (!targetDiv) return;

        const letterData = [
            { type: 'h3', text: 'HAPPY BIRTHDAY GUNGUN ❤️' },
            { type: 'p', text: 'Gungun, main bas yehi dua karta hu ki tum hamesha khush raho. Tumhare chehre ki smile kabhi kam na ho, kyuki tum sach me har ek happiness deserve karti ho.' },
            { type: 'p', text: 'Hamesha aise hi muskurati rehna, apne sapno ko poora karna aur life me aage badhte rehna.' },
            { type: 'p', text: 'Aur ek baat... tum hamesha mere liye bahut special aur important rahogi. ❤️' },
            { type: 'p', text: 'Once again, Happy Birthday Gungun! 🥳🎂', className: 'highlight-bday' },
            { type: 'p', text: 'Take care of yourself. ✨', className: 'signature' }
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

                if (scrollBox) {
                    scrollBox.scrollTop = scrollBox.scrollHeight;
                }
                
                await new Promise(res => setTimeout(res, 50)); // typing speed
            }

            const finalCursor = element.querySelector('.heart-cursor');
            if (finalCursor) finalCursor.remove();

            await new Promise(res => setTimeout(res, 600));
        }
    }
});
        
