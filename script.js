document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('effectCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationActive = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class DualParticle {
        constructor(direction) {
            this.direction = direction;
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * 10 + 6;
            this.speedY = direction === 'rose' ? (Math.random() * 1.2 + 0.5) : -(Math.random() * 1.2 + 0.5);
            this.y = direction === 'rose' ? -20 : canvas.height + 20;
            this.swing = Math.random() * 2;
            this.swingSpeed = Math.random() * 0.02;
        }
        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.swing) * 0.3;
            this.swing += this.swingSpeed;
            if (this.direction === 'rose' && this.y > canvas.height) { this.y = -20; this.x = Math.random() * canvas.width; }
            if (this.direction === 'heart' && this.y < -20) { this.y = canvas.height + 20; this.x = Math.random() * canvas.width; }
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
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(runEngine);
    }

    // Direct Secure Click Handler
    const giftBox = document.getElementById('giftBox');
    if (giftBox) {
        giftBox.addEventListener('click', () => {
            giftBox.classList.add('shake');

            setTimeout(() => {
                document.getElementById('giftSection').classList.add('hidden');
                const countdownScreen = document.getElementById('countdownScreen');
                countdownScreen.classList.remove('hidden');
                
                const countdownAudio = document.getElementById('countdownAudio');
                if (countdownAudio) countdownAudio.play().catch(e => console.log(e));

                let ticks = 3;
                let timer = setInterval(() => {
                    ticks--;
                    if (ticks > 0) {
                        document.getElementById('countdownNumber').innerText = ticks;
                    } else {
                        clearInterval(timer);
                        countdownScreen.classList.add('hidden');

                        const bdayScreen = document.getElementById('bdayGreetingScreen');
                        bdayScreen.classList.remove('hidden');
                        
                        const bgMusic = document.getElementById('bgMusic');
                        if (bgMusic) bgMusic.play().catch(e => console.log(e));

                        setTimeout(() => {
                            bdayScreen.classList.add('hidden');
                            const templateSec = document.getElementById('templateSection');
                            templateSec.classList.remove('hidden');
                            setTimeout(() => { templateSec.style.opacity = '1'; }, 50);

                            // Trigger Hearts & Roses Engine
                            animationActive = true;
                            for (let i = 0; i < 25; i++) particles.push(new DualParticle('rose'));
                            for (let i = 0; i < 20; i++) particles.push(new DualParticle('heart'));
                            runEngine();

                            // 15 Sec Template Screen Duration
                            setTimeout(() => {
                                templateSec.classList.add('fade-out-effect');

                                setTimeout(() => {
                                    templateSec.classList.add('hidden');
                                    const messageSec = document.getElementById('messageSection');
                                    messageSec.classList.remove('hidden');
                                    
                                    setTimeout(() => {
                                        messageSec.classList.add('show-message');
                                    }, 100);
                                    
                                    setTimeout(() => {
                                        typeWriterEffect();
                                    }, 1500);
                                }, 2000);
                            }, 15000);
                        }, 2500);
                    }
                }, 1000);
            }, 1200);
        });
    }

    // Typewriter Engine with New Formatted Text
    async function typeWriterEffect() {
        const targetDiv = document.getElementById("typewriterText");
        const scrollBox = document.querySelector(".scroll-letter");
        if (!targetDiv) return;

        const letterData = [
            { type: 'h3', text: 'HAPPY BIRTHDAY GUNGUN ❤️' },
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
                element.innerHTML += rawText.charAt(i);
                if (scrollBox) scrollBox.scrollTop = scrollBox.scrollHeight;
                await new Promise(res => setTimeout(res, 45)); // Smooth Speed
            }
            await new Promise(res => setTimeout(res, 600));
        }
    }
});
                    
