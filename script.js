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

    if (giftBox) {
        giftBox.classList.add('shake');
    }

    setTimeout(() => {
        if (giftSection) giftSection.classList.add('hidden');
        if (countdownScreen) countdownScreen.classList.remove('hidden');
        
        if (countdownAudio) {
            countdownAudio.play().catch(err => console.log("Audio play blocked", err));
        }

        let ticks = 3;
        let timer = setInterval(() => {
            ticks--;
            if (ticks > 0) {
                if (countdownNumber) countdownNumber.innerText = ticks;
            } else {
                clearInterval(timer);
                if (countdownScreen) countdownScreen.classList.add('hidden');

                if (bdayScreen) bdayScreen.classList.remove('hidden');
                if (bgMusic) {
                    bgMusic.play().catch(err => console.log("Music blocked", err));
                }

                setTimeout(() => {
                    if (bdayScreen) bdayScreen.classList.add('hidden');

                    if (templateSec) {
                        templateSec.classList.remove('hidden');
                        setTimeout(() => { templateSec.style.opacity = '1'; }, 50);
                    }

                    animationActive = true;
                    for (let i = 0; i < 25; i++) particles.push(new DualParticle('rose'));
                    for (let i = 0; i < 20; i++) particles.push(new DualParticle('heart'));
                    runEngine();

                    // 15 Seconds Template Screen Time
                    setTimeout(() => {
                        if (templateSec) templateSec.classList.add('fade-out-effect');

                        // Smooth Template Fade-Out to Letter Transition
                        setTimeout(() => {
                            if (templateSec) templateSec.classList.add('hidden');
                            if (messageSec) {
                                messageSec.classList.remove('hidden');
                                setTimeout(() => {
                                    messageSec.classList.add('show-message');
                                }, 100);
                                
                                // 1.5 second pause after letter appears, then start typewriter
                                setTimeout(() => {
                                    typeWriterEffect();
                                }, 1500);
                            }
                        }, 2000);

                    }, 15000);

                }, 2500); 
            }
        }, 1000);

    }, 1200); 
}

// Fixed Premium Typewriter Effect with Auto-Scroll & Custom Text
async function typeWriterEffect() {
    const targetDiv = document.getElementById("typewriterText");
    const scrollBox = document.querySelector(".scroll-letter");
    if (!targetDiv) return;

    // Aapka naya text perfectly configured array format me
    const letterData = [
        { type: 'h3', text: 'Gungun, ❤️' },
        { type: 'p', text: 'Main bas yehi dua karta hu ki tum hamesha khush raho. Tumhare chehre ki smile kabhi kam na ho, kyuki tum sach me har ek happiness deserve karti ho.' },
        { type: 'p', text: 'Hamesha aise hi muskurati rehna, apne sapno ko poora karna aur life me aage badhte rehna.' },
        { type: 'p', text: 'Aur ek baat... tum hamesha mere liye bahut special aur important rahogi. ❤️' },
        { type: 'p', text: 'Once again, Happy Birthday Gungun! 🥳🎂', className: 'highlight-bday' },
        { type: 'p', text: 'Take care of yourself. ✨', className: 'signature' }
    ];

    targetDiv.innerHTML = ""; // Clear initial state safely

    for (const data of letterData) {
        const element = document.createElement(data.type);
        if (data.className) {
            element.classList.add(data.className);
        }
        targetDiv.appendChild(element);

        let rawText = data.text;
        
        // Character by Character loop for real typewriter effect
        for (let i = 0; i < rawText.length; i++) {
            element.innerHTML += rawText.charAt(i);
            
            // Real-time smooth scrolling calculation
            if (scrollBox) {
                scrollBox.scrollTop = scrollBox.scrollHeight;
            }
            
            // Typing Speed: 40ms per letter for smooth reading
            await new Promise(resolve => setTimeout(resolve, 40));
        }
        
        // Paragraph break pause (700ms)
        await new Promise(resolve => setTimeout(resolve, 700));
    }
}

window.onerror = function(message, source, line, col, error) {
    console.log("JS Error: " + message + " (Line: " + line + ")");
};
