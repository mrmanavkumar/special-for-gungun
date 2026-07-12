function openGift(){

    document.getElementById("giftScreen").style.display="none";

    const countdownScreen=document.getElementById("countdownScreen");
    const countdownText=document.getElementById("countdownText");

    countdownScreen.style.display="flex";

    let count=3;

    countdownText.innerHTML=count;

    const timer=setInterval(()=>{

        count--;

        if(count>0){

            countdownText.innerHTML=count;

        }else{

            clearInterval(timer);

            countdownText.innerHTML="🎉 Happy Birthday 🎉";

            setTimeout(()=>{

                countdownScreen.style.display="none";

                document.getElementById("surprise").style.display="flex";

                startHearts();

                startRoses();

                setTimeout(()=>{

                    document.getElementById("surprise").style.display="none";

                    document.getElementById("finalMessage").style.display="flex";

                    typeMessage();

                },5000);

            },2000);

        }

    },1000);
  function typeMessage(){

const text=`Gungun,

Main bas yehi dua karta hu ki tum hamesha khush raho...

Kyuki tum sach me happiness deserve karti ho. ❤️

Chahe waqt badal gaya ho...
Chahe humari rahein alag ho gayi ho...

Lekin tum hamesha meri life ka ek bahut special part rahogi.

Main bas itna chahta hu ki tum apni life me bahut aage badho,
khub haso,
khush raho,
aur apne har sapne ko pura karo. ✨

Happy Birthday Gungun 🎂❤️

— MANAV`;

const box=document.getElementById("messageText");

box.innerHTML="";

let i=0;

const typing=setInterval(()=>{

box.innerHTML+=text.charAt(i);

i++;

if(i>=text.length){

clearInterval(typing);

}

},45);

}

function startHearts(){

setInterval(()=>{

const heart=document.createElement("div");

heart.innerHTML="❤️";

heart.style.position="fixed";

heart.style.left=Math.random()*100+"vw";

heart.style.bottom="-20px";

heart.style.fontSize=(18+Math.random()*18)+"px";

heart.style.transition="6s linear";

heart.style.zIndex="999";

document.body.appendChild(heart);

setTimeout(()=>{

heart.style.transform="translateY(-110vh)";

heart.style.opacity="0";

},100);

setTimeout(()=>{

heart.remove();

},6000);

},1800);

}

}
function startRoses(){

setInterval(()=>{

const rose=document.createElement("div");

rose.className="rose";

rose.innerHTML="🌹";

rose.style.left=Math.random()*100+"vw";

rose.style.animationDuration=(8+Math.random()*3)+"s";

document.body.appendChild(rose);

setTimeout(()=>{

rose.remove();

},11000);

},3500);

}

// ✨ Stars Animation

const stars=document.querySelector(".stars");

let opacity=0.15;

setInterval(()=>{

opacity=opacity===0.15?0.25:0.15;

stars.style.opacity=opacity;

},3000);

// Gift Hover Effect

const gift=document.querySelector(".gift-box img");

gift.addEventListener("touchstart",()=>{

gift.style.transform="scale(1.05)";

});

gift.addEventListener("touchend",()=>{

gift.style.transform="scale(1)";

});

// Scroll Letter Smooth

const letter=document.querySelector(".letter");

letter.style.scrollBehavior="smooth";
