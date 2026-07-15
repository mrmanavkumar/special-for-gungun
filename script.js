document.addEventListener("DOMContentLoaded", () => {
    // Sabhi HTML elements ko safely target kiya gaya hai
    const giftBox = document.getElementById("giftBox");
    const giftSection = document.getElementById("giftSection");
    const countdownScreen = document.getElementById("countdownScreen");
    const countdownNumber = document.getElementById("countdownNumber");
    const bdayGreetingScreen = document.getElementById("bdayGreetingScreen");
    const templateSection = document.getElementById("templateSection"); 
    const messageSection = document.getElementById("messageSection"); 

    // Floating Hearts Background System (Auto Create)
    function createFloatingHearts() {
        // Alag alag designs ke hearts float karenge
        const heartIcons = ['❤️', '💖', '💝', '💕'];
        
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('bg-heart');
            
            // Randomly choose heart character
            heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            
            // Screen par random left positioning
            heart.style.left = Math.random() * 100 + 'vw';
            
            // Random sizes for depth feel
            const randomSize = Math.random() * 15 + 15; // 15px to 30px
            heart.style.fontSize = randomSize + 'px';
            
            // Random speed duration
            const duration = Math.random() * 4 + 4; // 4s to 8s
            heart.style.animationDuration = duration + 's';
            
            document.body.appendChild(heart);

            // Task complete hone par screen se remove karein taaki lag na ho
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
            
        }, 350); // Har 350ms me ek naya dil niklega
    }

    // Floating hearts ko page load hote hi background me chalane ke liye trigger karein
    createFloatingHearts();

    // 1. Gift Box Click event handler
    if (giftBox) {
        giftBox.addEventListener("click", () => {
            if (giftSection) giftSection.classList.add("hidden");
            if (countdownScreen) {
                countdownScreen.classList.remove("hidden");
                startCountdownTimer();
            } else {
                showBirthdayGreeting();
            }
        });
    }

    // 2. Countdown Engine
    function startCountdownTimer() {
        let count = 3;
        if (countdownNumber) countdownNumber.textContent = count;

        const countdownAudio = document.getElementById("countdownAudio");
        if (countdownAudio) {
            countdownAudio.play().catch(err => console.log("Audio play blocked", err));
        }

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

    // 3. Sequential Transition (Happy Birthday -> Template Image -> Romantic Letter)
    function showBirthdayGreeting() {
        if (bdayGreetingScreen) {
            bdayGreetingScreen.classList.remove("hidden");
        }

        const bgMusic = document.getElementById("bgMusic");
        if (bgMusic) {
            bgMusic.play().catch(err => console.log("BG Music play blocked", err));
        }

        // 3 seconds tak "HAPPY BIRTHDAY" screen fir hide hokar template unhide hoga
        setTimeout(() => {
            if (bdayGreetingScreen) bdayGreetingScreen.classList.add("hidden");
            
            if (templateSection) {
                templateSection.classList.remove("hidden"); // Display template image
                
                // 3 seconds baad template band karke letter section khulega
                setTimeout(() => {
                    templateSection.classList.add("hidden"); 
                    
                    if (messageSection) {
                        messageSection.classList.remove("hidden");
                        setTimeout(() => {
                            messageSection.classList.add("active");
                            typeWriterEffect();
                        }, 100);
                    }
                }, 3000);
            } else {
                // Agar template wrapper nahi milta toh direct letter box
                if (messageSection) {
                    messageSection.classList.remove("hidden");
                    setTimeout(() => {
                        messageSection.classList.add("active");
                        typeWriterEffect();
                    }, 100);
                }
            }
        }, 3000);
    }

    // 4. Romantic Typewriter with Centered Heading & Heart Cursor
    async function typeWriterEffect() {
        const targetDiv = document.getElementById("typewriterText");
        const scrollBox = document.getElementById("messageSection");
        if (!targetDiv) return;

        const letterData = [
            { type: 'h3', text: 'HAPPY BIRTHDAY GUNGUN ❤️' }, // Yeh heading style CSS se center align hogi
            { type: 'p', text: 'Gungun, main bas yehi dua karta hu ki tum hamesha khush raho. Tumhare chehre ki smile kabhi kam na ho, kyuki tum sach me har ek happiness deserve karti ho.' },
            { type: 'p', text: 'Hamesha aise hi muskurati rehna, apne sapno ko poora karna aur life me aage badhte rehna.' },
            { type: 'p', text: 'Aur ek baat... tum hamesha mere liye bahut special aur important rahogi. ❤️' },
            { type: 'p', text: 'Once again, Happy Birthday Gungun! 🥳🎂', className: 'highlight-bday' },
            { type: 'p', text: 'Take care of yourself. ✨', className: 'signature' }
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

                if (scrollBox) {
                    scrollBox.scrollTop = scrollBox.scrollHeight;
                }
                
                await new Promise(res => setTimeout(res, 45));
            }

            const finalCursor = element.querySelector('.heart-cursor');
            if (finalCursor) finalCursor.remove();

            await new Promise(res => setTimeout(res, 600));
        }
    }
});
                            
