const canvas = document.getElementById('effectCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

class Particle {
    constructor(type) {
        this.type = type; // 'rose' or 'heart'
        this.x = Math.random() * canvas.width;
        this.y = type === 'rose' ? -20 : canvas.height + 20;
        this.size = Math.random() * 10 + 5;
        this.speedY = type === 'rose' ? (Math.random() * 1 + 0.5) : -(Math.random() * 1 + 0.5);
    }
    update() {
        this.y += this.speedY;
        if (this.type === 'rose' && this.y > canvas.height) this.y = -20;
        if (this.type === 'heart' && this.y < -20) this.y = canvas.height + 20;
    }
    draw() {
        ctx.fillStyle = this.type === 'rose' ? '#ff7675' : '#d63031';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

function startSequence() {
    const gift = document.getElementById('giftBox');
    const greet = document.getElementById('greetingSection');
    const countNum = document.getElementById('countdownNumber');
    const bdayText = document.getElementById('bdayText');
    const template = document.getElementById('templateImg');
    const msg = document.getElementById('messageSection');
    const audio = document.getElementById('countdownAudio');

    gift.classList.add('shake');
    setTimeout(() => {
        gift.parentElement.classList.add('hidden');
        greet.classList.remove('hidden');
        audio.play();
        
        let c = 3;
        let timer = setInterval(() => {
            c--;
            if(c > 0) countNum.innerText = c;
            else {
                clearInterval(timer);
                countNum.classList.add('hidden');
                bdayText.classList.remove('hidden');
                
                setTimeout(() => {
                    greet.classList.add('hidden');
                    template.classList.remove('hidden');
                    setTimeout(() => template.classList.add('fade-in'), 100);
                    
                    // Particles
                    setInterval(() => {
                        particles.push(new Particle('rose'));
                        particles.push(new Particle('heart'));
                    }, 500);
                    function animate() {
                        ctx.clearRect(0,0, canvas.width, canvas.height);
                        particles.forEach(p => { p.update(); p.draw(); });
                        requestAnimationFrame(animate);
                    } animate();

                    // Fade out after 15s
                    setTimeout(() => {
                        template.style.opacity = 0;
                        setTimeout(() => {
                            template.classList.add('hidden');
                            msg.classList.remove('hidden');
                        }, 2000);
                    }, 15000);
                }, 2000);
            }
        }, 1000);
    }, 2000);
}
