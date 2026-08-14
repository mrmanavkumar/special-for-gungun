document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    const giftSection = document.getElementById("giftSection");
    const mainLink = document.getElementById("mainLink");
    const giftBox = document.getElementById("giftBox");
    const countdownScreen = document.getElementById("countdownScreen");
    const countdownNumber = document.getElementById("countdownNumber");
    const bdayGreetingScreen = document.getElementById("bdayGreetingScreen");
    const templateSection = document.getElementById("templateSection");
    const messageSection = document.getElementById("messageSection");
    const letterContent = document.getElementById("letterContent");
    const bgMusic = document.getElementById("bgMusic");
    const countdownAudio = document.getElementById("countdownAudio");
    const rainContainer = document.getElementById("rainContainer");
    const effectCanvas = document.getElementById("effectCanvas");

    let isTriggered = false;

    // STEP 0: 5 SECONDS LOADING TEXT + GIFT BOX SE RAIN START
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = "0";
            loadingScreen.style.visibility = "hidden";
            setTimeout(() => {
                loadingScreen.classList.add("hidden");
                startMagicalRain(); 
            }, 1000);
        }
    }, 5000); 

    function handleLinkClick(e) {
        if (e) e.preventDefault();
        if (isTriggered) return;
        isTriggered = true;

        if (bgMusic) {
            bgMusic.play().then(() => {
                bgMusic.pause(); 
                bgMusic.currentTime = 0; 
            }).catch(err => console.log("Audio unlock:", err));
        }

        if (giftBox) giftBox.classList.add("shake-active");

        setTimeout(() => {
            if (giftSection) giftSection.classList.add("hidden");
            if (countdownScreen) {
                countdownScreen.classList.remove("hidden");
                startCountdownTimer(); 
            } else {
                showBirthdayGreeting();
            }
        }, 1500);
    }

    if (mainLink) {
        mainLink.addEventListener("click", handleLinkClick);
    }

    function startCountdownTimer() {
        if (countdownAudio) {
            countdownAudio.play().catch(err => console.log("Countdown sound blocked:", err));
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

    function showBirthdayGreeting() {
        if (bdayGreetingScreen) bdayGreetingScreen.classList.remove("hidden");

        if (bgMusic) {
            bgMusic.play().catch(err => console.log("Music play failed:", err));
        }

        initConfetti();

        setTimeout(() => {
            if (bdayGreetingScreen) bdayGreetingScreen.classList.add("hidden");
            
            if (templateSection) {
                templateSection.classList.remove("hidden");
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
        }, 3000);
    }

    function showLetterPage() {
        if (messageSection) {
            messageSection.classList.remove("hidden");
            setTimeout(() => {
                messageSection.classList.add("active");
                typeWriterEffect();
            }, 100);
        }
    }

    function startMagicalRain() {
        const items = ['✨', '🎈', '✨', '🌟', '🎈', '🌟', '🎈'];
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

    async function typeWriterEffect() {
        const targetDiv = document.getElementById("typewriterText");
        if (!targetDiv) return;

        const letterData = [
            { type: 'h3', text: 'Special wishes for Gungun🦋' },
            { type: 'p', text: 'Gungun, main bas yehi dua kerta hu ki tum humesha khush raho.Tumhare chehre ki muskan kabhi naa ho kyuki tum schme her ek khushi deserve kerti ho.' },
            { type: 'p', text: 'Humehsa aise hi muskurati rehna,aur apne sapno ko pura kerna or life me bohot aage badte rehna🩺👩‍⚕️🩺' },
            { type: 'p', text: 'once again Happy Birthday 🎊🎉' },
              { type: 'p', text: 'Take care of yourself✨', className: 'signature' },
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

                if (letterContent) letterContent.scrollTop = letterContent.scrollHeight;
                await new Promise(res => setTimeout(res, 50)); 
            }
            const finalCursor = element.querySelector('.heart-cursor');
            if (finalCursor) finalCursor.remove();
            await new Promise(res => setTimeout(res, 400));
        }
    }

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
                           
