document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const giftSection = document.getElementById("giftSection");
    const mainLink = document.getElementById("mainLink");
    const giftBox = document.getElementById("giftBox");
    const countdownScreen = document.getElementById("countdownScreen");
    const countdownNumber = document.getElementById("countdownNumber");
    const bdayGreetingScreen = document.getElementById("bdayGreetingScreen");
    const templateSection = document.getElementById("templateSection");
    const messageSection = document.getElementById("messageSection");
    
    // Audio Elements
    const selfi1 = document.getElementById("selfi1");
    const selfi3 = document.getElementById("selfi3");
    const countdownAudio = document.getElementById("countdownAudio");
    const rainContainer = document.getElementById("rainContainer");
    const effectCanvas = document.getElementById("effectCanvas");

    let isTriggered = false;

    function handleLinkClick(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (isTriggered) return;
        isTriggered = true;

        // Unlock all audio elements on user interaction
        [selfi1, selfi3, countdownAudio].forEach(aud => {
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

    // STEP 2: Countdown Timer (3 Seconds)
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
        }, 1000); // Exact 3 Seconds
    }

    // STEP 3: 5 Seconds Suspense Gap -> Audio Sync Text Transition -> Flower Rain -> Template
    function showBirthdayGreeting() {
        if (bdayGreetingScreen) {
            bdayGreetingScreen.classList.remove("hidden");
            bdayGreetingScreen.innerHTML = ""; // Clear container
        }

        // Start BGM (selfi 1.mp3) smoothly right after counting
        if (selfi1) {
            selfi1.volume = 0;
            selfi1.play().catch(err => console.log("selfi 1 BGM error:", err));
            let fadeAudio = setInterval(() => {
                if (selfi1.volume < 0.8) selfi1.volume += 0.05;
                else { selfi1.volume = 0.8; clearInterval(fadeAudio); }
            }, 150);
        }

        // 5 SECONDS SUSPENSE GAP (Pure Black Screen)
        setTimeout(() => {
            
            // Container for Animated Text
            const textDisplay = document.createElement("div");
            textDisplay.className = "pop-text-display";
            bdayGreetingScreen.appendChild(textDisplay);

            // Play selfi 3.m4a Dialogue ("Oye Happy Birthday")
            if (selfi3) {
                if (selfi1) selfi1.volume = 0.2; // Duck BGM for clear voice
                selfi3.play().catch(err => console.log("selfi 3 error:", err));

                selfi3.onended = () => {
                    if (selfi1) selfi1.volume = 0.9; // Restore BGM volume
                };
            }

            // Phase 1: Show "Oye... 👀✨"
            textDisplay.innerHTML = "Oye... 👀✨";
            textDisplay.classList.add("show-pop");

            // Phase 2: Achanak Gayab (Disappear "Oye...") after ~1 second
            setTimeout(() => {
                textDisplay.classList.remove("show-pop");
                textDisplay.classList.add("hide-pop");

                // Phase 3: Show "Happy Birthday! 💖🎉🎂"
                setTimeout(() => {
                    textDisplay.innerHTML = "Happy Birthday! 💖🎉🎂";
                    textDisplay.classList.remove("hide-pop");
                    textDisplay.classList.add("show-pop");

                    // Hold Text -> Fade Out -> Start 8s Flower Rain
                    setTimeout(() => {
                        textDisplay.classList.remove("show-pop");
                        textDisplay.classList.add("hide-pop");

                        setTimeout(() => {
                            initConfetti();
                            startGradualRain(); // Start 8 Seconds Rain

                            setTimeout(() => {
                                if (bdayGreetingScreen) bdayGreetingScreen.classList.add("hidden");
                                
                                // Show Template Image
                                if (templateSection) {
                                    templateSection.classList.remove("hidden");
                                    setTimeout(() => { 
                                        templateSection.classList.add("active"); // Dhere-dhere fade in
                                    }, 100);
                                    
                                    // Template 15 Seconds Hold -> Fade Out
                                    setTimeout(() => {
                                        templateSection.classList.remove("active"); // Dhere-dhere fade out
                                        setTimeout(() => {
                                            templateSection.classList.add("hidden");
                                            showLetterPage();
                                        }, 2000); 
                                    }, 15000); 
                                    
                                } else {
                                    showLetterPage();
                                }

                            }, 8000); // 8 Seconds Rain Hold

                        }, 1000);

                    }, 2500); // Hold Happy Birthday text

                }, 200); // Small gap between disappear & reappear

            }, 1100); // Display duration for "Oye..."

        }, 5000); // EXACT 5 SECONDS SUSPENSE GAP AFTER COUNTING
    }

    // STEP 4: Letter Page Arrival
    function showLetterPage() {
        if (messageSection) {
            messageSection.classList.remove("hidden");
            setTimeout(() => {
                messageSection.classList.add("active"); // Dhere-dhere fade in
                typeWriterEffect();
            }, 100);
        }
    }

    // Flower Rain Generator
    function startGradualRain() {
        const items = ['🌸', '❤️', '🌹', '💕', '✨', '💝'];
        let delay = 500;

        function dropItem() {
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

            if (delay > 250) delay -= 20;
            setTimeout(dropItem, delay);
        }

        dropItem();
    }

    // Typewriter Engine
    async function typeWriterEffect() {
        const targetDiv = document.getElementById("typewriterText");
        const scrollBox = document.getElementById("messageSection");
        if (!targetDiv) return;

        const letterData = [
            { type: 'h3', text: 'DEAR GUNGUN🦋' },
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

                // Auto Scroll
                if (scrollBox) scrollBox.scrollTop = scrollBox.scrollHeight;
                await new Promise(res => setTimeout(res, 50)); 
            }
            const finalCursor = element.querySelector('.heart-cursor');
            if (finalCursor) finalCursor.remove();
            await new Promise(res => setTimeout(res, 400));
        }
    }

    // Canvas Confetti
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
                                                   
