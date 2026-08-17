document.addEventListener('DOMContentLoaded', () => {
    // 1. Rain Effect
    const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const drops = []; 
    function draw() { 
        ctx.clearRect(0,0,canvas.width,canvas.height); 
        ctx.fillStyle = 'white'; 
        drops.forEach(d => { ctx.fillText('🌸', d.x, d.y); d.y += d.s; if(d.y > canvas.height) d.y = 0; }); 
        requestAnimationFrame(draw); 
    }
    for(let i=0; i<30; i++) drops.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, s: 1+Math.random()*2});
    draw();

    // 2. Logic
    const screens = document.querySelectorAll('.screen');
    function show(id) {
        screens.forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }

    // Loading 5s
    setTimeout(() => show('screen-2'), 5000);

    // Gift Click
    document.getElementById('giftBox').onclick = () => {
        show('screen-3');
        let sec = 50;
        const tikAudio = document.getElementById('tikTokAudio');
        
        const interval = setInterval(() => {
            tikAudio.currentTime = 0; 
            tikAudio.play().catch(()=>{});
            document.getElementById('timer').innerText = `11:59:${sec < 10 ? '0'+sec : sec}`;
            
            if(sec == 59) {
                clearInterval(interval);
                document.getElementById('timer').innerText = "12:00:00";
                
                setTimeout(() => {
                    show('screen-4'); // Happy Birthday
                    document.getElementById('hbAudio').play();
                    document.getElementById('bgMusic').play();
                    
                    setTimeout(() => {
                        show('screen-5'); // Template
                        setTimeout(() => {
                            show('screen-6'); // Letter
                            const text = "Gungun, main bas yehi dua kerta hu ki tum humesha khush raho tumhare chahre ki muskan kabhi kam naa ho kyuki tum sachme her ek khushi deserve kerti ho.\nHumesha ese hi muskurati rehna, aur apne sapno ko pura kerna aur life me bohot age badna 🩺👩‍⚕️🩺\n\nTackcare of yourself 🌸\n-MANAV";
                            document.getElementById('letter-text').innerText = text;
                        }, 15000);
                    }, 3000);
                }, 1500);
            }
            sec++;
        }, 1000);
    };
});
