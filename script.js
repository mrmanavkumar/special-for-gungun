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

class DualParticle {
    constructor(direction) {
        this.direction = direction;
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
            ctx.fillStyle = '#ff7675';
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else {
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

function startSequence() {
    const giftSection = document.getElementById('giftSection');
    const giftBox = document.getElementById('giftBox');
    const countdownScreen = document.getElementById('countdownScreen');
    const countdownNumber = document.getElementById('countdownNumber');
    const bdayScreen = document.getElementById('bdayGreetingScreen');
    const templateSec = document.getElementById('templateSection');
    const messageSec = document.getElementById('messageSection');
    const countdownAudio = document.getElementById('countdownAudio');
    const bgMusic = document.getElementById('bgMusic');

    // Box Shake Animation
    giftBox.classList.add('shake');

    setTimeout(() => {
        giftSection.classList.add('hidden');
        countdownScreen.classList.remove('hidden');
        
        // Countdown sound shuru
        countdownAudio.play().catch(err => console.log("Audio play blocked initially", err));

        // Ticking 3 -> 2 -> 1
        let ticks = 3;
        let timer = setInterval(() => {
            ticks--;
            if (ticks > 0) {
                countdownNumber.innerText = ticks;
            } else {
                clearInterval(timer);
                countdownScreen.classList.add('hidden');

                // Happy Birthday Screen + Romantic Music Start!
                bdayScreen.classList.remove('hidden');
                bgMusic.play().catch(err => console.log("Background music blocked", err));

                setTimeout(() => {
                    bdayScreen.classList.add('hidden');

                    // Template Smooth Fade In
                    templateSec.classList.remove('hidden');
                    setTimeout(() => { templateSec.style.opacity = '1'; }, 50);

                    // Falling Roses & Rising Hearts
                    animationActive = true;
                    for (let i = 0; i < 25; i++) particles.push(new DualParticle('rose'));
                    for (let i = 0; i < 20; i++) particles.push(new DualParticle('heart'));
                    runEngine();

                    // 15 Seconds Template View Time
                    setTimeout(() => {
                        templateSec.classList.add('fade-out-effect');

                        // Final Message Reveal (Watermark + Scroll)
                        setTimeout(() => {
                            templateSec.classList.add('hidden');

messageSec.classList.remove('hidden');

setTimeout(()=>{
    messageSec.classList.add('show-message');},100);
    setTimeout(() => {
    typeWriterEffect();
}, 1500);

                        }, 2000);

                    }, 15000);

                }, 2500); // Happy Birthday Screen stay duration
            }
        }, 1000);

    }, 1200); // Shaking box delay
}
async function typeWriterEffect() {

    const scrollBox = document.querySelector(".scroll-letter");
    const items = document.querySelectorAll(".letter-text h3, .letter-text p");

    for (const item of items) {

        const text = item.innerHTML;
item.setAttribute("data-text", text);
item.innerHTML = "";

        for (let i = 0; i < text.length; i++) {

            item.innerHTML += text.charAt(i);

            scrollBox.scrollTo({
                top: scrollBox.scrollHeight,
                behavior: "smooth"
            });

            await new Promise(resolve => setTimeout(resolve, 35));
        }

        // Har paragraph ke baad rukega
        await new Promise(resolve => setTimeout(resolve, 1800));
    }

}
window.onerror = function(message, source, line, col, error) {
    alert("JS Error: " + message + " (Line: " + line + ")");
};
