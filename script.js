const canvas = document.getElementById('effectCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationActive = false;

function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class DualParticle {
    constructor(direction) {
        this.direction = direction;
        this.x = Math.random() * (canvas.width || window.innerWidth);
        this.size = Math.random() * 10 + 6;
        this.speedY = direction === 'rose' ? (Math.random() * 1.2 + 0.5) : -(Math.random() * 1.2 + 0.5);
        this.y = direction === 'rose' ? -20 : (canvas.height || window.innerHeight) + 20;
        this.swing = Math.random() * 2;
        this.swingSpeed = Math.random() * 0.02;
    }
    update() {
        this.y += this.speedY;
        this.x += Math.sin(this.swing) * 0.3;
        this.swing += this.swingSpeed;

        if (this.direction === 'rose' && this.y > canvas.height) {
            this.y = -20; this.x = Math.random() * canvas.width;
        }
        if (this.direction === 'heart' && this.y < -20) {
            this.y = canvas.height + 20; this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.save();
        ctx.beginPath();
        if (this.direction === 'rose') {
            ctx.fillStyle = '#ff7675';
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillStyle = '#d63031';
            let d = this.size;
            ctx.translate(this.x, this.y);
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-d/2, -d, -d, -d/3, 0, d);
            ctx.bezierCurveTo(d, -d/3, d/2, -d, 0, 0);
            ctx.fill();
        }
        ctx.restore();
    }
}

function runEngine() {
    if (!animationActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(runEngine);
}

function startSequence() {
    const giftSection = document.getElementById('giftSection');
    const giftBox = document.getElementById('giftBox');
    const countdownScreen = document.getElementById('countdownScreen');
    const countdownNumber = document.getElementById('countdownNumber');
    const bdayScreen = document.getElementById('bdayGreetingScreen');
    const templateSec = document.getElementById('templateSection');
    const messageSec = document.getElementById('messageSection');
    const countdownAudio = document.getElementById('countdownAudio');
    const bgMusic = document.getElementById('bgMusic');

    // Safe Check: Agar giftBox mil gaya toh hi shake lagao
    if (giftBox) {
        giftBox.classList.add('shake');
    }

    setTimeout(() => {
        if (giftSection) giftSection.classList.add('hidden');
        if (countdownScreen) countdownScreen.classList.remove('hidden');
        
        // Countdown sound shuru (Safe execution)
        if (countdownAudio) {
            countdownAudio.play().catch(err => console.log("Audio play blocked initially", err));
        }

        // Ticking 3 -> 2 -> 1
        let ticks = 3;
        let timer = setInterval(() => {
            ticks--;
            if (ticks > 0) {
                if (countdownNumber) countdownNumber.innerText = ticks;
            } else {
                clearInterval(timer);
                if (countdownScreen) countdownScreen.classList.add('hidden');

                // Happy Birthday Screen + Romantic Music Start!
                if (bdayScreen) bdayScreen.classList.remove('hidden');
                if (bgMusic) {
                    bgMusic.play().catch(err => console.log("Background music blocked", err));
                }

                setTimeout(() => {
                    if (bdayScreen) bdayScreen.classList.add('hidden');

                    // Template Smooth Fade In
                    if (templateSec) {
                        templateSec.classList.remove('hidden');
                        setTimeout(() => { templateSec.style.opacity = '1'; }, 50);
                    }

                    // Falling Roses & Rising Hearts
                    animationActive = true;
                    for (let i = 0; i < 25; i++) particles.push(new DualParticle('rose'));
                    for (let i = 0; i < 20; i++) particles.push(new DualParticle('heart'));
                    runEngine();

                    // 15 Seconds Template View Time
                    setTimeout(() => {
                        if (templateSec) templateSec.classList.add('fade-out-effect');

                        // Final Message Reveal (Watermark + Scroll)
                        setTimeout(() => {
                            if (templateSec) templateSec.classList.add('hidden');
                            if (messageSec) {
                                messageSec.classList.remove('hidden');
                                setTimeout(() => {
                                    messageSec.classList.add('show-message');
                                }, 100);
                                
                                // Typewriter start call
                                setTimeout(() => {
                                    typeWriterEffect();
                                }, 1500);
                            }
                        }, 2000);

                    }, 15000);

                }, 2500); // Happy Birthday Screen stay duration
            }
        }, 1000);

    }, 1200); // Shaking box delay
}

// Fixed Premium Typewriter Effect with Auto-Scroll
async function typeWriterEffect() {
    const targetDiv = document.getElementById("typewriterText");
    const scrollBox = document.querySelector(".scroll-letter");
    if (!targetDiv) return;

    // Manav ka message array format mein
    const letterData = [
        { type: 'h3', text: 'Gungun, ❤️' },
        { type: 'p', text: 'Main bas yehi dua karta hu ki tum hamesha khush raho...' },
        { type: 'p', text: 'Kyuki tum sach me happiness deserve karti ho. ❤️' },
        { type: 'p', text: 'Chahe waqt badal gaya hu...<br>Chahe humari rahein alag ho gayi ho...' },
        { type: 'p', text: 'Lekin tum hamesha meri life ka ek bahut special part rahogi.' },
        { type: 'p', text: 'Main bas itna chahta hu ki tum apni life me bahut aage badho,<br>khub haso,<br>khush raho,<br>aur apne har sapne ko pura karo. ✨' },
        { type: 'p', text: 'Tumhari smile hamesha aise hi bani rahe...<br>Aur tumhari zindagi me sirf khushiyan hi khushiyan aaye.' },
        { type: 'p', text: 'May God bless you with endless happiness, success and love. 🌸' },
        { type: 'p', text: 'Happy Birthday Gungun 🎂❤️', className: 'highlight-bday' },
        { type: 'p', text: 'Take care... Always.' },
        { type: 'p', text: '— MANAV ❤️', className: 'signature' }
    ];

    for (const data of letterData) {
        const element = document.createElement(data.type);
        if (data.className) {
            element.classList.add(data.className);
        }
        targetDiv.appendChild(element);

        let rawText = data.text;
        let parts = rawText.split(/(<br>)/g); 

        for (const part of parts) {
            if (part === "<br>") {
                element.innerHTML += "<br>";
                continue;
            }
            
            for (let i = 0; i < part.length; i++) {
                element.innerHTML += part.charAt(i);
                if (scrollBox) {
                    scrollBox.scrollTop = scrollBox.scrollHeight;
                }
                await new Promise(resolve => setTimeout(resolve, 35));
            }
        }
        await new Promise(resolve => setTimeout(resolve, 700));
    }
}

window.onerror = function(message, source, line, col, error) {
    console.log("JS Error: " + message + " (Line: " + line + ")");
};
