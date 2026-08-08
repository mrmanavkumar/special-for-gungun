document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const giftSection = document.getElementById("giftSection");
    const mainLink = document.getElementById("mainLink");
    const giftBox = document.getElementById("giftBox");
    const countdownScreen = document.getElementById("countdownScreen");
    const countdownNumber = document.getElementById("countdownNumber");
    const bdayGreetingScreen = document.getElementById("bdayGreetingScreen");
    const bdayText = document.querySelector(".bday-text");
    const templateSection = document.getElementById("templateSection");
    const messageSection = document.getElementById("messageSection");
    const creditsSection = document.getElementById("creditsSection");
    const creditsSlide1 = document.getElementById("creditsSlide1");
    const creditsSlide2 = document.getElementById("creditsSlide2");
    const creditsSlide3 = document.getElementById("creditsSlide3");
    
    // Audio Elements
    const selfi1 = document.getElementById("selfi1");
    const selfi2 = document.getElementById("selfi2");
    const selfi3 = document.getElementById("selfi3");
    const countdownAudio = document.getElementById("countdownAudio");
    const rainContainer = document.getElementById("rainContainer");
    const effectCanvas = document.getElementById("effectCanvas");

    let isTriggered = false;

    // Direct Gift Click Handler
    function handleLinkClick(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (isTriggered) return;
        isTriggered = true;

        // Unlock Mobile Audio
        [selfi1, selfi2, selfi3, countdownAudio].forEach(aud => {
            if (aud) {
                aud.play().then(() => {
                    aud.pause();
                    aud.currentTime = 0;
                }).catch(err => console.log("Audio unlock note:", err));
            }
        });

        if (giftBox) giftBox.classList.add("shake-active");

        setTimeout(() => {
            if (giftSection) giftSection.classList.add("hidden");
            if (countdownScreen) {
                countdownScreen.classList.remove("hidden");
                startCountdownTimer();
            } else {
                showBirthdayGreeting();
            }
        }, 1200);
    }

    if (mainLink) mainLink.addEventListener("click", handleLinkClick);
    if (giftBox) giftBox.addEventListener("click", handleLinkClick);
    if (giftSection) giftSection.addEventListener("click", handleLinkClick);

    // STEP 2: Countdown Timer
    function startCountdownTimer() {
        if (countdownAudio) {
            countdownAudio.play().catch(err => console.log("Countdown sound skipped:", err));
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

    // STEP 3: Happy Birthday Screen -> Disappear -> 5s Black Screen + BGM -> Flower Rain + Template
    function showBirthdayGreeting() {
        if (bdayGreetingScreen) bdayGreetingScreen.classList.remove("hidden");

        // 1.5 Seconds baad HAPPY BIRTHDAY text gayab hoga
        setTimeout(() => {
            if (bdayText) bdayText.style.display = "none";

            // BGM (selfi 1.mp3) start hoga purely black screen par
            if (selfi1) {
                selfi1.volume = 0;
                selfi1.play().catch(err => console.log("selfi 1 BGM error:", err));
                let fadeAudio = setInterval(() => {
                    if (selfi1.volume < 0.9) selfi1.volume += 0.05;
                    else { selfi1.volume = 1.0; clearInterval(fadeAudio); }
                }, 150);
            }

            // Exactly 5 Seconds pure Black Screen hold
            setTimeout(() => {
                // 5 sec baad Flowers & Hearts rain shuru aur "Oye Selfie" dialogue
                initConfetti();
                startMagicalRain();

                if (selfi2) {
                    if (selfi1) selfi1.volume = 0.3; // Duck BGM
                    selfi2.play().catch(err => console.log("selfie 2 error:", err));
                    
                    selfi2.onended = () => {
                        if (selfi1) selfi1.volume = 1.0;
                    };
                }

                // 1.5 Sec baad Template screen reveal
                setTimeout(() => {
                    if (bdayGreetingScreen) bdayGreetingScreen.classList.add("hidden");
                    
                    if (templateSection) {
                        templateSection.classList.remove("hidden");
                        setTimeout(() => { 
                            templateSection.classList.add("active"); 

                            // Template aane ke 3 Sec baad "Oye Happy Birthday" (selfi 3.mp3)
                            setTimeout(() => {
                                if (selfi3) {
                                    if (selfi1) selfi1.volume = 0.3;
                                    selfi3.play().catch(err => console.log("selfi 3 error:", err));

                                    selfi3.onended = () => {
                                        if (selfi1) selfi1.volume = 1.0;
                                    };
                                }
                            }, 3000);

                        }, 100);
                        
                        // 15 Sec baad Template Screen Fade-Out -> Letter Page
                        setTimeout(() => {
                            templateSection.classList.remove("active");
                            setTimeout(() => {
                                templateSection.classList.add("hidden");
                                showLetterPage();
                            }, 2000); 
                        }, 15000); 
                        
                    } else {
                        showLetterPage();
                    }
                }, 1500);

            }, 5000); // 5 Seconds Black Delay

        }, 1500);
    }

    // STEP 4: Notebook Letter Screen Arrival
    function showLetterPage() {
        if (messageSection) {
            messageSection.classList.remove("hidden");
            setTimeout(() => {
                messageSection.classList.add("active");
                typeWriterEffect();
            }, 100);
        }
    }

    // Flower & Hearts Rain Generator
    function startMagicalRain() {
        const items = ['🌸', '❤️', '🌹', '💕', '✨', '💝'];
        setInterval(() => {
            const element = document.createElement('div');
            element.classList.add('rain-item');
            element.innerHTML = items[Math.floor(Math.random() * items.length)];
            element.style.left = Math.random() * 100 + 'vw';
            const size = Math.random() * 18 + 12; 
            element.style.fontSize = size + 'px';
            const fallDuration = Math.random() * 5 + 4; 
            element.style.animationDuration = fallDuration + 's';
            
            if (rainContainer) rainContainer.appendChild(element);
            setTimeout(() => { element.remove(); }, fallDuration * 1000);
        }, 250); 
    }

    // Typewriter Engine
    async function typeWriterEffect() {
        const targetDiv = document.getElementById("typewriterText");
        const scrollBox = document.getElementById("messageSection");
        if (!targetDiv) return;

        const letterData = [
            { type: 'h3', text: 'HAPPY BIRTHDAY GUNGUN🦋' },
            { type: 'p', text: 'Gungun, main bas yehi dua karta hu ki tum hamesha khush raho. Tumhare chehre ki muskan kabhi kam na ho, kyuki tum sach me har ek khusi deserve karti ho.' },
            { type: 'p', text: 'Hamesha aise hi muskurati rehna, apne sapno ko poora karna aur life me aage badhte rehna.🩺👩‍⚕️🩺' },
            { type: 'p', text: 'Aur ek baat...mujhe ptaa hai ki waqt ke sath sab kuch badal jaayega lekin tum hamesha mere liye bahut special aur important rahogi.🔒♥️' },
            { type: 'p', text: 'Once again, Happy Birthday Gungun!✨🎂', className: 'highlight-bday' },
            { type: 'p', text: 'Take care of yourself.🌸', className: 'signature' },
            { type: 'p', text: '-MANAV', className: 'signature' }
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
                await new Promise(res => setTimeout(res, 50)); 
            }
            const finalCursor = element.querySelector('.heart-cursor');
            if (finalCursor) finalCursor.remove();
            await new Promise(res => setTimeout(res, 400));
        }

        // 15 Seconds Delay After Letter, Then Start Credits
        setTimeout(() => {
            if (messageSection) {
                messageSection.classList.remove("active");
                setTimeout(() => {
                    messageSection.classList.add("hidden");
                    startCreditsSequence();
                }, 1000);
            }
        }, 15000); 
    }

    // Credits Sequence Controller
    function startCreditsSequence() {
        if (!creditsSection) return;
        creditsSection.classList.remove("hidden");

        // Slide 1
        if (creditsSlide1) {
            creditsSlide1.classList.remove("hidden");
            setTimeout(() => creditsSlide1.classList.add("fade-in"), 100);
        }

        // Slide 1 -> Slide 2 (After 4s)
        setTimeout(() => {
            if (creditsSlide1) {
                creditsSlide1.classList.remove("fade-in");
                creditsSlide1.classList.add("fade-out");
                
                setTimeout(() => {
                    creditsSlide1.classList.add("hidden");
                    if (creditsSlide2) {
                        creditsSlide2.classList.remove("hidden");
                        setTimeout(() => creditsSlide2.classList.add("fade-in"), 100);
                    }
                }, 1000);
            }
        }, 4000);

        // Slide 2 -> Slide 3 [THE END] (After 12s)
        setTimeout(() => {
            if (creditsSlide2) {
                creditsSlide2.classList.remove("fade-in");
                creditsSlide2.classList.add("fade-out");

                setTimeout(() => {
                    creditsSlide2.classList.add("hidden");
                    if (creditsSlide3) {
                        creditsSlide3.classList.remove("hidden");
                        setTimeout(() => creditsSlide3.classList.add("fade-in"), 100);
                    }
                }, 1000);
            }
        }, 12000);
    }

    // Confetti System
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
            particles.forEach((p) => { if (p.y > height) { p.y = -20; p.x = Math.random() * width; } });
            requestAnimationFrame(draw);
        }
        draw();
    }
});
                    
