document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const giftSection = document.getElementById("giftSection");
    const giftBox = document.getElementById("giftBox");
    const countdownScreen = document.getElementById("countdownScreen");
    const countdownNumber = document.getElementById("countdownNumber");
    const bdayGreetingScreen = document.getElementById("bdayGreetingScreen");
    const templateSection = document.getElementById("templateSection");
    const messageSection = document.getElementById("messageSection");
    const bgMusic = document.getElementById("bgMusic");
    const countdownAudio = document.getElementById("countdownAudio");
    const rainContainer = document.getElementById("rainContainer");
    const effectCanvas = document.getElementById("effectCanvas");

    let rainInterval = null;

    // STEP 1: Gift Box Click and Shaking
    if (giftBox) {
        giftBox.addEventListener("click", () => {
            // MAGIC FIX FOR AUDIO: Gift box click par hi music ko 'load' aur silent 'play' kar dete hain
            // Isse browser ko lagega ki user ne permission de di hai, aur music block nahi hoga!
            if (bgMusic) {
                bgMusic.play().then(() => {
                    bgMusic.pause(); // Turant pause kar diya taaki counting ke baad hi aawaz aaye
                    bgMusic.currentTime = 0; 
                }).catch(err => console.log("Audio unlock failed:", err));
            }

            // Box shake active karo
            giftBox.classList.add("shake-active");

            // 1.5 seconds shake hone ke BAAD counting shuru hogi
            setTimeout(() => {
                if (giftSection) giftSection.classList.add("hidden");
                if (countdownScreen) {
                    countdownScreen.classList.remove("hidden");
                    startCountdownTimer(); 
                } else {
                    showBirthdayGreeting();
                }
            }, 1500); 
        });
    }

    // STEP 2: Countdown System
    function startCountdownTimer() {
        if (countdownAudio) {
            countdownAudio.play().catch(err => console.log("Sound blocked by browser:", err));
        }

        let count = 3;
        if (countdownNumber) countdownNumber.textContent = count;

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

    // STEP 3: Happy Birthday Screen & REAL MUSIC PLAY HERE
    function showBirthdayGreeting() {
        if (bdayGreetingScreen) {
            bdayGreetingScreen.classList.remove("hidden");
        }

        // PERFECT TIMING UPON COUNTDOWN END: Ab music bina rukavat ke chalega!
        if (bgMusic) {
            bgMusic.play().catch(err => console.log("Music play error:", err));
        }

        initConfetti();
        startMagicalRain();

        // Keep Birthday title for 3 seconds, then transition to Template Section
        setTimeout(() => {
            if (bdayGreetingScreen) bdayGreetingScreen.classList.add("hidden");
            
            if (templateSection) {
                templateSection.classList.remove("hidden");
                
                setTimeout(() => {
                    templateSection.classList.add("active");
                }, 100);
                
                // STEP 4: 15 Seconds display and then smooth 3s fade out
                setTimeout(() => {
                    templateSection.classList.remove("active");
                    
                    // 3 seconds fade out complete then show Letter
                    setTimeout(() => {
                        templateSection.classList.add("hidden");
                        showLetterPage();
                    }, 3000); 
                    
                }, 15000); 
                
            } else {
                showLetterPage();
            }
        }, 3000);
    }

    // STEP 5: Smooth Arrival of Letter Page
    function showLetterPage() {
        if (messageSection) {
            messageSection.classList.remove("hidden");
            setTimeout(() => {
                messageSection.classList.add("active");
                typeWriterEffect();
            }, 100);
        }
    }

    // Magical Rain
    function startMagicalRain() {
        const items = ['🌸', '❤️', '🌹', '💕', '✨', '💝'];
        
        rainInterval = setInterval(() => {
            const element = document.createElement('div');
            element.classList.add('rain-item');
            element.innerHTML = items[Math.floor(Math.random() * items.length)];
            
            element.style.left = Math.random() * 100 + 'vw';
            const size = Math.random() * 18 + 12; 
            element.style.fontSize = size + 'px';
            
            const fallDuration = Math.random() * 5 + 4; 
            element.style.animationDuration = fallDuration + 's';
            
            if (rainContainer) {
                rainContainer.appendChild(element);
            }

            setTimeout(() => {
                element.remove();
            }, fallDuration * 1000);
            
        }, 250); 
    }

    // Typewriter Engine
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
                
                await new Promise(res => setTimeout(res, 50)); 
            }

            const finalCursor = element.querySelector('.heart-cursor');
            if (finalCursor) finalCursor.remove();

            await new Promise(res => setTimeout(res, 400));
        }
    }

    // Background Canvas Glitter Confetti System
    function initConfetti() {
        if (!effectCanvas) return;
        const ctx = effectCanvas.getContext("2d");
        let width = (effectCanvas.width = window.innerWidth);
        let height = (effectCanvas.height = window.innerHeight);

        const particles = [];
        const colors = ["#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1", "#fff"];

        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height - height,
                r: Math.random() * 4 + 2,
                d: Math.random() * 50 + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 10 - 5,
                tiltAngleIncremental: Math.random() * 0.07 + 0.02,
                tiltAngle: 0
            });
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p, idx) => {
                p.tiltAngle += p.tiltAngleIncremental;
                p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
                p.x += Math.sin(p.tiltAngle);
                p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;

                ctx.beginPath();
                ctx.lineWidth = p.r;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
                ctx.stroke();
            });

            updateParticles();
            requestAnimationFrame(draw);
        }

        function updateParticles() {
            particles.forEach((p) => {
                if (p.y > height) {
                    p.y = -20;
                    p.x = Math.random() * width;
                }
            });
        }

        draw();

        window.addEventListener("resize", () => {
            width = effectCanvas.width = window.innerWidth;
            height = effectCanvas.height = window.innerHeight;
        });
    }
});
                
