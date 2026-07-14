function startSequence() {
    // 1. Gift box ko hide karo aur countdown dikhao
    document.getElementById('giftSection').classList.add('hidden');
    
    const countdownScreen = document.getElementById('countdownScreen');
    const countdownNumber = document.getElementById('countdownNumber');
    const countdownAudio = document.getElementById('countdownAudio');
    const bgMusic = document.getElementById('bgMusic');
    
    countdownScreen.classList.remove('hidden');
    if(countdownAudio) countdownAudio.play();

    let count = 3;
    countdownNumber.innerText = count;

    // 2. Countdown Timer (3, 2, 1)
    let timer = setInterval(() => {
        count--;
        if (count > 0) {
            countdownNumber.innerText = count;
        } else {
            clearInterval(timer);
            countdownScreen.classList.add('hidden');
            
            // Birthday screen dikhao aur music chalao
            const bdayScreen = document.getElementById('bdayGreetingScreen');
            bdayScreen.classList.remove('hidden');
            if(bgMusic) bgMusic.play();

            // 3. 3 seconds baad Birthday screen hatao aur Template lao
            setTimeout(() => {
                bdayScreen.classList.add('hidden');
                
                const templateSection = document.getElementById('templateSection');
                templateSection.classList.remove('hidden');
                // Chhote se delay ke baad opacity 1 karo taaki smooth fade-in ho
                setTimeout(() => { templateSection.style.opacity = '1'; }, 50);

                // 4. 15 Seconds tak template dikhane ke baad FADE OUT shuru karo
                setTimeout(() => {
                    // Yahan photo dhundli aur gayab (fade out) hona shuru hogi
                    templateSection.classList.add('fade-out-effect');

                    // 5. Jaise hi photo poori tarah gayab ho (2 seconds baad), Letter ko FADE IN karo
                    setTimeout(() => {
                        templateSection.classList.add('hidden'); // Photo ko permanently hatao
                        
                        const messageSection = document.getElementById('messageSection');
                        messageSection.classList.remove('hidden'); // Letter ka box screen par lao
                        
                        // Ek chhota sa pause lekar letter ko smooth entry do
                        setTimeout(() => {
                            messageSection.classList.add('show-message'); // CSS se center lock aur fade-in trigger hoga
                            startTypewriter(); // Typewriter typing shuru karega
                        }, 100);

                    }, 2000); // 2 seconds ka fade out time

                }, 15000); // 15 seconds tak photo dikhegi

            }, 3000);
        }
    }, 1000);
}

// Typewriter Function (Jaisa aapka pehle chal raha tha)
function startTypewriter() {
    const textContainer = document.getElementById('typewriterText');
    // Agar aapka purana typing text code hai, toh use is function ke andar daal sakte hain.
    // Udaharan ke liye:
    const message = `<h3>Gungun, ❤️</h3><p>Main bas yehi dua karta hu ki tum hamesha khush raho... Kyuki tum sach me happiness deserve karti ho. 🥰</p><p class="highlight-bday">Happy Birthday! 🎂</p>`;
    
    let i = 0;
    textContainer.innerHTML = "";
    
    // Agar normal HTML text hai toh direct ya ek-ek akshar karke dikha sakte hain
    textContainer.innerHTML = message; 
}
