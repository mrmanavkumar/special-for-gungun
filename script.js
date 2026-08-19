document.addEventListener("DOMContentLoaded", () => {
    // Helper function to safely get element
    const getEl = (id) => document.getElementById(id);

    const giftSection = getEl("giftSection");
    const mainLink = getEl("mainLink");
    const giftBox = getEl("giftBox");
    const loadingBox = getEl("loadingBox");
    const countdownScreen = getEl("countdownScreen");
    const countdownNumber = getEl("countdownNumber");
    const bdayGreetingScreen = getEl("bdayGreetingScreen");
    const templateSection = getEl("templateSection");
    const messageSection = getEl("messageSection");
    const bgMusic = getEl("bgMusic");
    const hbdVoice = getEl("hbdVoice");
    const countdownAudio = getEl("countdownAudio");
    const rainContainer = getEl("rainContainer");
    const effectCanvas = getEl("effectCanvas");

    let isTriggered = false;

    // STEP 1: 5 SECONDS LOADING LOGIC
    setTimeout(() => {
        if (loadingBox) loadingBox.style.display = "none";
        
        if (mainLink) {
            mainLink.classList.remove("hidden");
            mainLink.style.display = "flex";
            setTimeout(() => {
                mainLink.classList.add("show-fade");
            }, 50);
        } else if (giftBox) {
            giftBox.classList.remove("hidden");
            giftBox.style.display = "block";
        }
    }, 5000);

    // Direct Click Handler (Gift Box Click)
    function handleLinkClick(e) {
        if (e) e.preventDefault();
        if (isTriggered) return;
        isTriggered = true;

        // Unlock audio for mobile / Insta browsers
        if (bgMusic) {
            bgMusic.play().then(() => {
                bgMusic.pause();
                bgMusic.currentTime = 0;
            }).catch(err => console.log("BgMusic unlock:", err));
        }

        if (hbdVoice) {
            hbdVoice.play().then(() => {
                hbdVoice.pause();
                hbdVoice.currentTime = 0;
            }).catch(err => console.log("HbdVoice unlock:", err));
        }

        if (giftBox) giftBox.classList.add("shake-active");

        setTimeout(() => {
            if (giftSection) giftSection.classList.add("hidden");
            if (countdownScreen) {
                countdownScreen.classList.remove("hidden");
                countdownScreen.style.display = "flex";
                startCountdownTimer(); 
            } else {
                showBirthdayGreeting();
            }
        }, 1500);
    }

    if (mainLink) {
        mainLink.addEventListener("click", handleLinkClick);
    } else if (giftBox) {
        giftBox.addEventListener("click", handleLinkClick);
    }

    // STEP 3: Countdown Timer (11:59:50 -> 12:00:00)
        function startCountdownTimer() {
        let seconds = 50;
        if (countdownNumber) countdownNumber.textContent = "11:59:50";

        // Sound ko alag se ek baar chalaya hai taaki loop me ruk-ruk kar na baje
        const timerSound = new Audio("tik tok.m4a");
        timerSound.loop = true;
        timerSound.play().catch(err => console.log("Sound play error:", err));

        const timer = setInterval(() => {
            if (seconds < 60) {
                seconds++;
                
                if (seconds === 60) {
                    if (countdownNumber) countdownNumber.textContent = "12:00:00";
                } else {
                    if (countdownNumber) countdownNumber.textContent = `11:59:${seconds.toString().padStart(2, '0')}`;
                }
            } else {
                clearInterval(timer);
                
                // Countdown khatam hone par sound stop
                timerSound.pause();
                timerSound.currentTime = 0;

                setTimeout(() => {
                    if (countdownScreen) countdownScreen.classList.add("hidden");
                    showBirthdayGreeting();
                }, 1000);
            }
        }, 1000);
        }
    
        }, 1000);
    }

    // STEP 4: Happy Birthday Screen + Audios
    function showBirthdayGreeting() {
        if (bdayGreetingScreen) {
            bdayGreetingScreen.classList.remove("hidden");
            bdayGreetingScreen.style.display = "flex";
        }

        if (hbdVoice) {
            try {
                hbdVoice.currentTime = 0;
                hbdVoice.play().catch(e => {});
            } catch(e){}
        }

        if (bgMusic) {
            try {
                bgMusic.play().catch(e => {});
            } catch(e){}
        }

        initConfetti();
        startMagicalRain();

        setTimeout(() => {
            if (bdayGreetingScreen) bdayGreetingScreen.classList.add("hidden");
            
            if (templateSection) {
                templateSection.classList.remove("hidden");
                templateSection.style.display = "flex";
                setTimeout(() => { templateSection.classList.add("active"); }, 100);
                
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
        }, 3500);
    }

    // STEP 6: Notebook Letter Screen
    function showLetterPage() {
        if (messageSection) {
            messageSection.classList.remove("hidden");
            messageSection.style.display = "block";
            setTimeout(() => {
                messageSection.classList.add("active");
                typeWriterEffect();
            }, 100);
        }
    }

    // Rain Particle Generator
    function startMagicalRain() {
        if (!rainContainer) return;
        const items = ['🌸', '❤️', '🎈', '🌸', '🎈', '♥️','✨','✨'];
        setInterval(() => {
            const element = document.createElement('div');
            element.classList.add('rain-item');
            element.innerHTML = items[Math.floor(Math.random() * items.length)];
            element.style.left = Math.random() * 100 + 'vw';
            const size = Math.random() * 18 + 12; 
            element.style.fontSize = size + 'px';
            const fallDuration = Math.random() * 5 + 4; 
            element.style.animationDuration = fallDuration + 's';
            
            rainContainer.appendChild(element);
            setTimeout(() => { element.remove(); }, fallDuration * 1000);
        }, 250); 
    }

    // Typewriter Engine
    async function typeWriterEffect() {
        const targetDiv = getEl("typewriterText");
        if (!targetDiv) return;

        const letterData = [
            { type: 'h3', text: 'SPECIAL WISHES FOR GUNGUN 🦋' },
            { type: 'p', text: 'Gungun, main bas yehi dua kerta hu ki tum humesha khush rho. Tumhare chahre ki muskan kabhi kam naa ho kyuki tum sachme her ek khushi deserve kerti ho.' },
            { type: 'p', text: 'Humehsa aise hi muskurati rehna, aur apne sapno ko pura kerna or life me aage badhte rehna 🩺👩‍⚕️🩺' },
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
                if (targetDiv) targetDiv.scrollTop = targetDiv.scrollHeight;
                
                await new Promise(res => setTimeout(res, 50)); 
            }
            const finalCursor = element.querySelector('.heart-cursor');
            if (finalCursor) finalCursor.remove();
            await new Promise(res => setTimeout(res, 400));
        }
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
                
