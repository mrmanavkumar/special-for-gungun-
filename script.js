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

            music.play().catch(()=>{});

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
