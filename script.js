function openGift(){

const giftScreen=document.getElementById("giftScreen");
const countdownScreen=document.getElementById("countdownScreen");
const birthdayScreen=document.getElementById("birthdayScreen");
const letterScreen=document.getElementById("letterScreen");

const countText=document.getElementById("countText");

giftScreen.style.display="none";

countdownScreen.style.display="flex";

const countdownAudio=document.getElementById("countdownAudio");

countdownAudio.currentTime=0;

countdownAudio.play().catch(()=>{});

let count=3;

countText.innerHTML=count;

const timer=setInterval(()=>{

count--;

if(count>0){

countText.innerHTML=count;

}

else{

clearInterval(timer);

countText.innerHTML="🎉 Happy Birthday 🎉";

setTimeout(()=>{

countdownScreen.style.display="none";

birthdayScreen.style.display="flex";

startHearts();

startRoses();

setTimeout(()=>{

birthdayScreen.style.display="none";

letterScreen.style.display="flex";

typeMessage();

},5000);

},2000);

}

},1000);

}
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

Tumhari smile hamesha aise hi bani rahe...

Happy Birthday Gungun 🎂❤️

— MANAV ❤️`;

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

heart.className="heart";

heart.innerHTML="❤️";

heart.style.left=Math.random()*100+"vw";

heart.style.animationDuration=(6+Math.random()*2)+"s";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},8000);

},1800);

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

// ⭐ Stars Effect

const stars=document.getElementById("stars");

let glow=true;

setInterval(()=>{

if(glow){

stars.style.opacity="0.25";

}else{

stars.style.opacity="0.12";

}

glow=!glow;

},3000);

// 🎁 Gift Animation

const gift=document.getElementById("giftBox");

gift.addEventListener("touchstart",()=>{

gift.style.transform="scale(1.05)";

});

gift.addEventListener("touchend",()=>{

gift.style.transform="scale(1)";

});
// 📖 Letter Smooth Scroll

window.onload=()=>{

const message=document.getElementById("messageContainer");

if(message){

message.scrollTop=0;

message.style.scrollBehavior="smooth";

}

};

// ✨ Little Fade Effect

function fadeIn(element){

element.style.opacity="0";

element.style.display="flex";

let opacity=0;

const timer=setInterval(()=>{

opacity+=0.05;

element.style.opacity=opacity;

if(opacity>=1){

clearInterval(timer);

}

},30);

}

// 🌹 Small Welcome Effect

document.addEventListener("DOMContentLoaded",()=>{

const gift=document.getElementById("giftBox");

if(gift){

gift.style.transition=".4s";

}

});

// Prevent Double Click

let opened=false;

const oldOpenGift=openGift;

openGift=function(){

if(opened) return;

opened=true;

oldOpenGift();

};
