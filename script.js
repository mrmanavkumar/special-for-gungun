const canvas = document.getElementById('effectCanvas');
const ctx = canvas.getContext('2d');
let animationActive = false;
let particles = [];

// Resize Canvas
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width; this.y = -20;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 1 + 0.5;
        this.type = Math.random() > 0.5 ? 'petal' : 'heart';
    }
    update() { this.y += this.speedY; if (this.y > canvas.height) this.y = -20; }
    draw() {
        ctx.fillStyle = this.type === 'petal' ? '#ff7675' : '#d63031';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

function startSequence() {
    const giftBox = document.getElementById('giftBox');
    const countdown = document.getElementById('countdownScreen');
    const num = document.getElementById('countdownNumber');
    const template = document.getElementById('templateImg');
    const messageBox = document.getElementById('messageBox');
    const audio = document.getElementById('countdownAudio');

    // 1. Shake
    giftBox.classList.add('shake-anim');
    setTimeout(() => {
        giftBox.classList.add('hidden');
        countdown.classList.remove('hidden');
        audio.play();

        // 2. Countdown
        let count = 3;
        let timer = setInterval(() => {
            count--;
            if (count > 0) num.innerText = count;
            else {
                clearInterval(timer);
                countdown.classList.add('hidden');
                
                // 3. Template Fade In
                template.classList.remove('hidden');
                setTimeout(() => template.classList.add('fade-in'), 100);
                
                // Start Roses
                animationActive = true;
                setInterval(() => { if(animationActive) particles.push(new Particle()); }, 200);
                function render() {
                    if(!animationActive) return;
                    ctx.clearRect(0,0, canvas.width, canvas.height);
                    particles.forEach(p => { p.update(); p.draw(); });
                    requestAnimationFrame(render);
                }
                render();

                // 4. Fade Out Template, Show Message
                setTimeout(() => {
                    template.classList.add('fade-out');
                    setTimeout(() => {
                        template.classList.add('hidden');
                        messageBox.classList.remove('hidden');
                    }, 2000);
                }, 5000); // 5 seconds template rahega
            }
        }, 1000);
    }, 2000); // Shake 2 sec
                            }
