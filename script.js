const canvas = document.getElementById('effectCanvas');
const ctx = canvas.getContext('2d');

let animationActive = false;
let particles = [];

// Handle Canvas Resize
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle Class for Rose Petals & Hearts
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 15 + 10;
        this.speedY = Math.random() * 2 + 1;
        this.speedX = Math.sin(Math.random() * 2) * 1;
        this.type = Math.random() > 0.5 ? 'petal' : 'heart';
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.y = -20;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);

        if (this.type === 'petal') {
            // Draw Rose Petal
            ctx.fillStyle = '#ff7675';
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size, this.size / 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Draw Heart
            ctx.fillStyle = '#d63031';
            ctx.beginPath();
            ctx.moveTo(0, 0 - this.size / 4);
            ctx.bezierCurveTo(0 - this.size / 2, 0 - this.size, 0 - this.size, 0 - this.size / 4, 0, 0 + this.size / 1.5);
            ctx.bezierCurveTo(0 + this.size, 0 - this.size / 4, 0 + this.size / 2, 0 - this.size, 0, 0 - this.size / 4);
            ctx.fill();
        }
        ctx.restore();
    }
}

// Function to open gift and trigger everything
function openGift() {
    document.getElementById('giftBox').classList.add('hidden');
    document.getElementById('magicalContent').classList.remove('hidden');
    
    // Start Rose Petals and Hearts Animation
    animationActive = true;
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    animate();
}

function animate() {
    if (!animationActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    requestAnimationFrame(animate);
}
