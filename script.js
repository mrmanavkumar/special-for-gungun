const canvas = document.getElementById('effectCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationActive = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Dual Particle Logic: Roses drop down, Hearts rise up!
class DualParticle {
    constructor(direction) {
        this.direction = direction; // 'rose' (down) or 'heart' (up)
        this.x = Math.random() * canvas.width;
        this.size = Math.random() * 10 + 6;
        this.speedY = direction === 'rose' ? (Math.random() * 1.2 + 0.5) : -(Math.random() * 1.2 + 0.5);
        this.y = direction === 'rose' ? -20 : canvas.height + 20;
        this.swing = Math.random() * 2;
        this.swingSpeed = Math.random() * 0.02;
    }
    update() {
        this.y += this.speedY;
        this.x += Math.sin(this.swing) * 0.3;
        this.swing += this.swingSpeed;

        if (this.direction === 'rose' && this.y > canvas.height) {
            this.y = -20; this.x = Math.random() * canvas.width;
        }
        if (this.direction === 'heart' && this.y < -20) {
            this.y = canvas.height + 20; this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.save();
        ctx.beginPath();
        if (this.direction === 'rose') {
            // Soft Rose Petals Pink/Red style
            ctx.fillStyle = '#ff7675';
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Little Romantic Floating Hearts
            ctx.fillStyle = '#d63031';
            let d = this.size;
            ctx.translate(this.x, this.y);
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-d/2, -d, -d, -d/3, 0, d);
            ctx.bezierCurveTo(d, -d/3, d/2, -d, 0, 0);
            ctx.fill();
        }
        ctx.restore();
    }
}

function runEngine() {
    if (!animationActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(runEngine);
}

// Orchestrated Core Sequence Timelines
function startSequence() {
    const giftSection = document.getElementById('giftSection');
    const giftBox = document.getElementById('giftBox');
    const countdownScreen = document.getElementById('countdownScreen');
    const countdownNumber = document.getElementById('countdownNumber');
    const bdayScreen = document.getElementById('bdayGreetingScreen');
    const templateSec = document.getElementById('templateSection');
    const messageSec = document.getElementById('messageSection');
    const audio = document.getElementById('countdownAudio');

    // Step 1: Click makes the Box Shake
    giftBox.classList.add('shake');

    setTimeout(() => {
        giftSection.classList.add('hidden');
        countdownScreen.classList.remove('hidden');
        
        // Play countdown sound asset
        audio.play().catch(err => console.log("Audio waiting for user click interaction: ", err));

        // Step 2: Running Countdown 3 -> 2 -> 1
        let ticks = 3;
        let timer = setInterval(() => {
            ticks--;
            if (ticks > 0) {
                countdownNumber.innerText = ticks;
            } else {
                clearInterval(timer);
                countdownScreen.classList.add('hidden');

                // Step 3: Flash HAPPY BIRTHDAY Text on Screen
                bdayScreen.classList.remove('hidden');

                setTimeout(() => {
                    bdayScreen.classList.add('hidden');

                    // Step 4: Fade in Template Image beautifully
                    templateSec.classList.remove('hidden');
                    setTimeout(() => { templateSec.style.opacity = '1'; }, 50);

                    // Trigger falling rose petals & rising hearts
                    animationActive = true;
                    for (let i = 0; i < 25; i++) particles.push(new DualParticle('rose'));
                    for (let i = 0; i < 20; i++) particles.push(new DualParticle('heart'));
                    runEngine();

                    // Step 5: Wait precisely 15 seconds with template, then fade out smoothly
                    setTimeout(() => {
                        templateSec.classList.add('fade-out-effect');

                        // Step 6: Reveal the scroll letter box with sketch watermark
                        setTimeout(() => {
                            templateSec.classList.add('hidden');
                            messageSec.classList.remove('hidden');
                        }, 2000); // 2 seconds fade out buffer time

                    }, 15000); // 15 Seconds Display Timer

                }, 2500); // 2.5 seconds stay for Happy Birthday text
            }
        }, 1000);

    }, 1200); // Box shaking time limit duration
}
