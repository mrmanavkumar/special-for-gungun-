function openGift(){

    const gift=document.querySelector(".gift-box");

    gift.classList.add("shake");

    setTimeout(()=>{

        // Hide Gift
        document.querySelector(".gift-container").style.display="none";

        // Elements
        const countdown=document.getElementById("countdown");
        const music=document.getElementById("music");

        const countdownScreen=document.getElementById("countdownScreen");
        const countdownText=document.getElementById("countdownText");

        const surprise=document.getElementById("surprise");

        const finalMessage=document.getElementById("finalMessage");

        const message=document.getElementById("messageText");

        // Countdown Screen
        countdownScreen.style.display="flex";

        countdown.currentTime=0;

        countdown.play().catch(()=>{});

        countdownText.innerText="3";

        setTimeout(()=>{
            countdownText.innerText="2";
        },1000);

        setTimeout(()=>{
            countdownText.innerText="1";
        },2000);

        setTimeout(()=>{
            countdownText.innerHTML="🎉 Happy Birthday 🎉";
        },3000);

        // Countdown Finish
        countdown.onended=()=>{

            countdownScreen.style.display="none";

            surprise.classList.add("show");

            music.currentTime=0;

            music.play().then(()=>{
    console.log("Music Started");
}).catch((err)=>{
    alert("Music Blocked");
    console.log(err);

    // Agar music block ho jaye tab bhi letter dikhao
    setTimeout(()=>{
        surprise.style.opacity="0";

        setTimeout(()=>{
            surprise.style.visibility="hidden";
            finalMessage.classList.add("show");
            typeMessage(message);
        },2000);

    },5000);
});

            // Confetti
            const end=Date.now()+45000;

            (function frame(){

                confetti({
                    particleCount:2,
                    angle:60,
                    spread:55,
                    origin:{x:0}
                });

                confetti({
                    particleCount:2,
                    angle:120,
                    spread:55,
                    origin:{x:1}
                });

                if(Date.now()<end){

                    requestAnimationFrame(frame);

                }

            })();

            // Music End
            // Agar browser autoplay block kar de to bhi 45 sec baad letter dikha do
setTimeout(() => {

    surprise.style.opacity = "0";

    setTimeout(() => {

        surprise.style.visibility = "hidden";

        finalMessage.classList.add("show");

        typeMessage(message);

    }, 2000);

}, 45000);
            music.onended=()=>{

                surprise.style.opacity="0";

                setTimeout(()=>{

                    surprise.style.visibility="hidden";

                    finalMessage.classList.add("show");

                    typeMessage(message);

                },2000);

            };

        };

    },800);

}
function typeMessage(element){

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

let i=0;

element.innerHTML="";

const typing=setInterval(()=>{

element.innerHTML+=text.charAt(i);

i++;

if(i>=text.length){

clearInterval(typing);

}

},45);

}
// ❤️ Floating Hearts

setInterval(() => {

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-20px";
    heart.style.fontSize = (20 + Math.random() * 20) + "px";
    heart.style.opacity = "0.8";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";
    heart.style.transition = "transform 6s linear, opacity 6s linear";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.transform = "translateY(-110vh)";
        heart.style.opacity = "0";
    }, 100);

    setTimeout(() => {
        heart.remove();
    }, 6000);

}, 700);
