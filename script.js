document.addEventListener('DOMContentLoaded', () => {
    // Canvas Rain System
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

    // Audio Controls
    const tikTokAudio = document.getElementById('tikTokAudio');
    const bgMusic = document.getElementById('bgMusic');
    const hbAudio = document.getElementById('hbAudio');

    // Screens
    const loadingScreen = document.getElementById('loading-screen');
    const giftScreen = document.getElementById('gift-screen');
    const giftBox = document.getElementById('giftBox');
    const timerScreen = document.getElementById('timer-screen');
    const timerText = document.getElementById('timer');
    const wishScreen = document.getElementById('wish-screen');
    const templateScreen = document.getElementById('template-screen');
    const letterScreen = document.getElementById('letter-screen');
    const typewriterElement = document.getElementById('typewriter');

    // Letter Content (Aap yahan apna real message likh sakte hain)
    const letterText = `Dear Gungun,\n\nHappy Birthday! ❤️\nAaj ke din tumhare face par humesha smile honi chahiye.\nTum mere liye bohot special ho, and I wish tumko duniya ki saari khushiyan mile.\nAlways stay happy and keep glowing! ✨`;

    // Step 1: 5-Second Loading Screen
    setTimeout(() => {
        switchScreen(loadingScreen, giftScreen);
        createRain();
        animateRain();
    }, 5000);

    // Step 2: Gift Box Click -> Shake & Start Timer Sequence
    giftBox.addEventListener('click', () => {
        giftBox.classList.add('shake');
        setTimeout(() => {
            switchScreen(giftScreen, timerScreen);
            startTimerSequence();
        }, 600);
    });

    // Step 3: Timer 11:59:50 to 12:00:00
    function startTimerSequence() {
        let seconds = 50;
        const interval = setInterval(() => {
            // Sound play on every tick
            tikTokAudio.currentTime = 0;
            tikTokAudio.play().catch(() => {});

            if (seconds <= 59) {
                timerText.innerText = `11:59:${seconds < 10 ? '0' + seconds : seconds}`;
                seconds++;
            } else {
                timerText.innerText = `12:00:00`;
                clearInterval(interval);
                
                // 1.5 sec delay after 12:00:00
                setTimeout(() => {
                    switchScreen(timerScreen, wishScreen);
                    playBirthdayWishes();
                }, 1500);
            }
        }, 1000);
    }

    // Step 4 & 5: Wish Screen & Audio + Template 15-sec logic
    function playBirthdayWishes() {
        // Voice & Background Music Play
        hbAudio.play().catch(() => {});
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => {});

        // Show Template Screen after 3 seconds of HB Text
        setTimeout(() => {
            switchScreen(wishScreen, templateScreen);
            
            // Hold Template for 15 Seconds then transition to Letter Screen
            setTimeout(() => {
                switchScreen(templateScreen, letterScreen);
                startTypewriter();
            }, 15000);

        }, 3000);
    }

    // Step 6: Typewriter Effect for Letter
    function startTypewriter() {
        let i = 0;
        typewriterElement.innerHTML = '';
        
        function type() {
            if (i < letterText.length) {
                let char = letterText.charAt(i);
                if(char === '\n') {
                    typewriterElement.innerHTML += '<br>';
                } else {
                    typewriterElement.innerHTML += char;
                }
                i++;
                // Keep scroll at bottom automatically
                let container = document.querySelector('.letter-container');
                container.scrollTop = container.scrollHeight;
                
                setTimeout(type, 60);
            } else {
                typewriterElement.innerHTML += '<span class="cursor">♥️</span>';
            }
        }
        type();
    }

    // Helper Function to Switch Screens smoothly
    function switchScreen(fromScreen, toScreen) {
        fromScreen.style.opacity = '0';
        setTimeout(() => {
            fromScreen.classList.remove('active');
            toScreen.classList.add('active');
            setTimeout(() => {
                toScreen.style.opacity = '1';
            }, 50);
        }, 1500);
    }
});
