const canvas = document.getElementById('effectCanvas');
const ctx = canvas.getContext('2d');
let animationActive = false;
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 12 + 8;
        this.speedY = Math.random() * 1.5 + 0.8; // Slow falling speed as requested
        this.speedX = Math.sin(Math.random() * 2) * 0.5;
        this.type = Math.random() > 0.4 ? 'petal' : 'heart';
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 1 - 0.5;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height) {
            this.y = -20;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        if (this.type === 'petal') {
            ctx.fillStyle = '#ff7675';
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size / 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillStyle = '#d63031';
            ctx.beginPath();
            ctx.moveTo(0, 0 - this.size / 4);
            ctx.bezierCurveTo(0 - this.size / 2, 0 - this.size, 0 - this.size, 0 - this.size / 4, 0, 0 + this.size / 1.5);
            ctx.bezierCurveTo(0 + this.size, 0 - this.size / 4, 0 + this.size / 2, 0 - this.size, 0, 0 - this.size / 4);
            ctx.fill();
        }
        ctx.restore();
    }
}

function animate() {
    if (!animationActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// Full Orchestrated Sequence
function startGiftSequence() {
    const giftBox = document.getElementById('giftBox');
    const countdownScreen = document.getElementById('countdownScreen');
    const countdownNumber = document.getElementById('countdownNumber');
    const magicalContent = document.getElementById('magicalContent');

    // 1. Box shakes first
    giftBox.classList.add('shake');

    setTimeout(() => {
        // Hide box, show countdown
        giftBox.classList.add('hidden');
        countdownScreen.classList.remove('hidden');

        // 2. Start Countdown Timer (3, 2, 1)
        let count = 3;
        let counterInterval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownNumber.innerText = count;
            } else {
                clearInterval(counterInterval);
                countdownScreen.classList.add('hidden');

                // 3. Start Rose Petals Falling (Will run continuously)
                animationActive = true;
                for (let i = 0; i < 40; i++) {
                    particles.push(new Particle());
                }
                animate();

                // 4. Wait for 15 seconds while roses fall, then show Letter + Sketch Watermark
                setTimeout(() => {
                    magicalContent.classList.remove('hidden');
                }, 15000); // 15 Seconds Delay
            }
        }, 1000);

    }, 600); // Shake duration before disappearance
}
