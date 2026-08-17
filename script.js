document.addEventListener('DOMContentLoaded', () => {
    // Canvas Rain Setup
    const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const elements = [];
    const symbols = ['🎈', '✨', '🎁', '💖', '🎉'];

    function createRain() {
        for (let i = 0; i < 40; i++) {
            elements.push({
                x: Math.random() * width,
                y: Math.random() * height - height,
                speed: 1 + Math.random() * 3,
                symbol: symbols[Math.floor(Math.random() * symbols.length)],
                size: 16 + Math.random() * 20
            });
        }
    }

    function animateRain() {
        ctx.clearRect(0, 0, width, height);
        elements.forEach((el) => {
            el.y += el.speed;
            if (el.y > height) el.y = -20;
            ctx.font = `${el.size}px serif`;
            ctx.fillText(el.symbol, el.x, el.y);
        });
        requestAnimationFrame(animateRain);
    }

    // Audio & HTML Handles
    const tikTokAudio = document.getElementById('tikTokAudio');
    const bgMusic = document.getElementById('bgMusic');
    const hbAudio = document.getElementById('hbAudio');

    const loadingScreen = document.getElementById('loading-screen');
    const giftScreen = document.getElementById('gift-screen');
    const giftBox = document.getElementById('giftBox');
    const timerScreen = document.getElementById('timer-screen');
    const timerText = document.getElementById('timer');
    const wishScreen = document.getElementById('wish-screen');
    const templateScreen = document.getElementById('template-screen');
    const letterScreen = document.getElementById('letter-screen');
    const typewriterElement = document.getElementById('typewriter');

    // Exact Text from Screenshot 1
    const letterText = `🌹 SPECIAL WISHES FOR GUNGUN 🦋\n\nGungun, main bas yehi dua kerta hu ki tum humesha khush rho. Tumhare chahre ki muskan kabhi kam naa ho kyuki tum sachme her ek khushi deserve kerti ho.\n\nHumehsa aise hi muskurati rehna, aur apne sapno ko pura kerna or life me aage badhte rehna 🩺👩‍⚕️🩺\n\nOnce again happy birthday 🎊✨\n\nTake care of yourself. 🌸✨\n\n- MANAV`;

    // 1. Loading Screen (5 sec)
    setTimeout(() => {
        switchScreen(loadingScreen, giftScreen);
        createRain();
        animateRain();
    }, 5000);

    // 2. Gift Box Shake & Transition
    giftBox.addEventListener('click', () => {
        giftBox.classList.add('shake');
        setTimeout(() => {
            switchScreen(giftScreen, timerScreen);
            startTimerSequence();
        }, 600);
    });

    // 3. Timer Sequence (Only 1 Single Run from 11:59:50 to 12:00:00)
    function startTimerSequence() {
        let seconds = 50;
        const interval = setInterval(() => {
            tikTokAudio.currentTime = 0;
            tikTokAudio.play().catch(() => {});

            if (seconds <= 59) {
                timerText.innerText = `11:59:${seconds < 10 ? '0' + seconds : seconds}`;
                seconds++;
            } else {
                timerText.innerText = `12:00:00`;
                clearInterval(interval);
                tikTokAudio.pause(); // Stop Tik Tok sound permanently

                // 1.5 Sec delay after 12:00:00
                setTimeout(() => {
                    switchScreen(timerScreen, wishScreen);
                    playBirthdayWishes();
                }, 1500);
            }
        }, 1000);
    }

    // 4. Voice Audio, BG Music & Screen Transitions
    function playBirthdayWishes() {
        hbAudio.play().catch(() => {});
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => {});

        // 3 sec baad Birthday Template display hoga
        setTimeout(() => {
            switchScreen(wishScreen, templateScreen);
            
            // Hold Template for 15 Seconds then transition to Letter Screen
            setTimeout(() => {
                switchScreen(templateScreen, letterScreen);
                startTypewriter();
            }, 15000);

        }, 3000);
    }

    // 5. Typewriter Effect for Letter
    function startTypewriter() {
        let i = 0;
        typewriterElement.innerHTML = '';
        
        function type() {
            if (i < letterText.length) {
                let char = letterText.charAt(i);
                if (char === '\n') {
                    typewriterElement.innerHTML += '<br>';
                } else {
                    typewriterElement.innerHTML += char;
                }
                i++;
                let container = document.querySelector('.letter-container');
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
                setTimeout(type, 50);
            } else {
                typewriterElement.innerHTML += '<span class="cursor">♥️</span>';
            }
        }
        type();
    }

    // Helper for Smooth Screen Fade
    function switchScreen(fromScreen, toScreen) {
        fromScreen.style.opacity = '0';
        setTimeout(() => {
            fromScreen.classList.remove('active');
            toScreen.classList.add('active');
            setTimeout(() => {
                toScreen.style.opacity = '1';
            }, 50);
        }, 1200);
    }
});
