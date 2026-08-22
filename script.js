document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const giftSection = document.getElementById("giftSection");
    const mainLink = document.getElementById("mainLink");
    const giftBox = document.getElementById("giftBox");
    const loadingBox = document.getElementById("loadingBox");
    const countdownScreen = document.getElementById("countdownScreen");
    const countdownNumber = document.getElementById("countdownNumber");
    const bdayGreetingScreen = document.getElementById("bdayGreetingScreen");
    const templateSection = document.getElementById("templateSection");
    const messageSection = document.getElementById("messageSection");
    const lastMsgScreen = document.getElementById("lastMsgScreen");
    const posterSection = document.getElementById("posterSection");
    
    // Audio Elements
    const bgMusic = document.getElementById("bgMusic");
    const hbdVoice = document.getElementById("hbdVoice");
    const countdownAudio = document.getElementById("countdownAudio");
    const devaMusic = document.getElementById("devaMusic");
    
    const rainContainer = document.getElementById("rainContainer");
    const effectCanvas = document.getElementById("effectCanvas");

    let isTriggered = false;

    // STEP 1: LOADING -> GIFT BOX TRANSITION (FIXED)
    setTimeout(() => {
        const loadingText = document.getElementById("loadingText");
        const loadingBox = document.getElementById("loadingBox");
        
        // 1. Text fade out
        if (loadingText) {
            loadingText.style.transition = "opacity 1.5s ease";
            loadingText.style.opacity = "0";
        }

        // 2. Text gayab hone ke baad Gift Box ko FORCED DISPLAY dena
        setTimeout(() => {
            if (loadingText) loadingText.style.display = "none";
            if (loadingBox) loadingBox.style.display = "none";
            
            // giftSection aur mainLink DONO se 'hidden' class hata kar FORCED DISPLAY dena
            if (giftSection) {
                giftSection.classList.remove("hidden");
                giftSection.style.display = "flex";
                giftSection.style.flexDirection = "column";
                giftSection.style.alignItems = "center";
                giftSection.style.justifyContent = "center";
                giftSection.style.opacity = "0";
                giftSection.style.transition = "opacity 2s ease";
            }

            if (mainLink) {
                mainLink.classList.remove("hidden");
                mainLink.style.display = "flex";
            }

            // 3. Fade in Gift Box
            setTimeout(() => { 
                if (giftSection) giftSection.style.opacity = "1"; 
            }, 100);

        }, 3000);
    }, 5000);

    // Audio Unlocker for Mobile
    function unlockAudio(audioEl) {
        if (!audioEl) return;
        audioEl.play().then(() => {
            audioEl.pause();
            audioEl.currentTime = 0;
        }).catch(() => {});
    }

    // STEP 2: Gift Box Click Handler (Sirf Gift Box Click Par Chalega)
    function handleLinkClick(e) {
        if (e) e.stopPropagation(); // Event bleed-through stop karega
        if (isTriggered) return;
        isTriggered = true;

        unlockAudio(bgMusic);
        unlockAudio(hbdVoice);
        unlockAudio(devaMusic);

        if (giftBox) giftBox.classList.add("shake-active");

        startMagicalRain();

        // Smooth Fade Out of Gift Section
        setTimeout(() => {
            if (giftSection) {
                giftSection.style.transition = "opacity 1s ease";
                giftSection.style.opacity = "0";
                setTimeout(() => {
                    giftSection.style.display = "none";
                    if (countdownScreen) {
                        countdownScreen.classList.remove("hidden");
                        countdownScreen.style.display = "flex";
                        startCountdownTimer(); 
                    } else {
                        showBirthdayGreeting();
                    }
                }, 1000);
            }
        }, 1200);
    }

    // Event Listener (Sirf Gift Box aur Link par trigger hoga)
    if (mainLink) mainLink.addEventListener("click", handleLinkClick);
    if (giftBox) giftBox.addEventListener("click", handleLinkClick);
    

    // STEP 3: Countdown Timer (11:59:50 -> 12:00:00)
    function startCountdownTimer() {
        let seconds = 50;
        if (countdownNumber) countdownNumber.textContent = "11:59:50";

        if (countdownAudio) {
            try {
                countdownAudio.currentTime = 0;
                countdownAudio.play().catch(() => {});
            } catch(e) {}
        }

        const timer = setInterval(() => {
            if (seconds < 60) {
                seconds++;
                if (countdownAudio) {
                    try {
                        countdownAudio.currentTime = 0;
                        countdownAudio.play().catch(() => {});
                    } catch(e) {}
                }
                if (seconds === 60) {
                    if (countdownNumber) countdownNumber.textContent = "12:00:00";
                } else {
                    if (countdownNumber) countdownNumber.textContent = `11:59:${seconds.toString().padStart(2, '0')}`;
                }
            } else {
                clearInterval(timer);
                
                if (countdownAudio) {
                    try {
                        countdownAudio.pause();
                        countdownAudio.currentTime = 0;
                    } catch(e) {}
                }

                setTimeout(() => {
                    if (countdownScreen) countdownScreen.style.display = "none";
                    showBirthdayGreeting();
                }, 1000);
            }
        }, 1000);
    }

    // STEP 4: Happy Birthday Screen
    function showBirthdayGreeting() {
        if (bdayGreetingScreen) {
            bdayGreetingScreen.classList.remove("hidden");
            bdayGreetingScreen.style.display = "flex";
        }

        if (hbdVoice) {
            try {
                hbdVoice.currentTime = 0;
                hbdVoice.play().catch(() => {});
            } catch(e) {}
        }

        if (bgMusic) {
            try {
                bgMusic.currentTime = 0;
                bgMusic.play().catch(() => {});
            } catch(e) {}
        }

        initConfetti();

        setTimeout(() => {
            if (bdayGreetingScreen) bdayGreetingScreen.style.display = "none";
            
            if (templateSection) {
                templateSection.classList.remove("hidden");
                templateSection.style.display = "flex";
                setTimeout(() => templateSection.classList.add("active"), 100);
                
                setTimeout(() => {
                    templateSection.classList.remove("active");
                    setTimeout(() => {
                        templateSection.style.display = "none";
                        showLetterPage();
                    }, 1500); 
                }, 15000); 
            } else {
                showLetterPage();
            }
        }, 3500);
    }

    // STEP 5: Notebook Letter Page
    function showLetterPage() {
        if (messageSection) {
            messageSection.classList.remove("hidden");
            messageSection.style.display = "block";
            setTimeout(() => {
                messageSection.classList.add("active");
                typeWriterEffect();
            }, 100);
        }
    }

    // Typewriter Engine
    async function typeWriterEffect() {
        const targetDiv = document.getElementById("typewriterText");
        if (!targetDiv) {
            handleMusicEndTransition();
            return;
        }

        const letterData = [
            { type: 'h3', text: 'SPECIAL WISHES FOR GUNGUN 🦋' },
            { type: 'p', text: 'Gungun, main bas yehi dua kerta hu ki tum humesha khush rho. Tumhare chahre ki muskan kabhi kam naa ho kyuki tum sachme her ek khushi deserve kerti ho.' },
            { type: 'p', text: 'Humehsa aise hi muskurati rehna, aur apne sapno ko pura kerna or life me aage badhte rehna 🩺👩‍⚕️🩺' },
            { type: 'p', text: 'Once again happy birthday 🎊✨' },
            { type: 'p', text: 'Take care of yourself. 🌸✨', alignRight: true },
            { type: 'p', text: '- MANAV', alignRight: true }
        ];

        targetDiv.innerHTML = ""; 

        for (const data of letterData) {
            const element = document.createElement(data.type);
            if (data.alignRight) {
                element.style.textAlign = "right";
                element.style.marginTop = "10px";
            }
            targetDiv.appendChild(element);

            let rawText = data.text;
            for (let i = 0; i < rawText.length; i++) {
                const oldCursor = element.querySelector('.heart-cursor');
                if (oldCursor) oldCursor.remove();

                element.innerHTML += rawText.charAt(i);
                element.innerHTML += '<span class="heart-cursor">❤️</span>';
                if (targetDiv) targetDiv.scrollTop = targetDiv.scrollHeight;
                
                await new Promise(res => setTimeout(res, 45)); 
            }
            const finalCursor = element.querySelector('.heart-cursor');
            if (finalCursor) finalCursor.remove();
            await new Promise(res => setTimeout(res, 350));
        }

        handleMusicEndTransition();
    }

    // STEP 6: Music End Transition
    function handleMusicEndTransition() {
        let hasTransitioned = false;

        const triggerNext = () => {
            if (hasTransitioned) return;
            hasTransitioned = true;
            setTimeout(() => {
                if (messageSection) messageSection.classList.remove("active");
                setTimeout(() => {
                    if (messageSection) messageSection.style.display = "none";
                    showLastMessageScreen();
                }, 1500);
            }, 4000);
        };

        if (bgMusic && !bgMusic.paused) {
            bgMusic.onended = triggerNext;
        } else {
            setTimeout(triggerNext, 4000);
        }
    }

    // STEP 7: Last Message Screen & Deva Music
    function showLastMessageScreen() {
        if (lastMsgScreen) {
            lastMsgScreen.classList.remove("hidden");
            lastMsgScreen.style.display = "flex";
            setTimeout(() => lastMsgScreen.classList.add("active"), 100);
        }

        if (devaMusic) {
            try {
                devaMusic.currentTime = 0;
                devaMusic.play().catch(() => {});
            } catch(e) {}
        }

        setTimeout(() => {
            if (lastMsgScreen) lastMsgScreen.classList.remove("active");
            setTimeout(() => {
                if (lastMsgScreen) lastMsgScreen.style.display = "none";
                showFinalPoster();
            }, 1500);
        }, 8000);
    }

    // STEP 8: Final Poster Screen (mg.png)
    function showFinalPoster() {
        if (posterSection) {
            posterSection.classList.remove("hidden");
            posterSection.style.display = "flex";
            posterSection.style.opacity = "0";
            posterSection.style.transition = "opacity 2.5s ease";
            setTimeout(() => { posterSection.style.opacity = "1"; }, 100);

            setTimeout(() => {
                posterSection.style.opacity = "0";
                setTimeout(() => {
                    posterSection.style.display = "none";
                    showCreditsSequence();
                }, 2500);
            }, 140000); 
        } else {
            showCreditsSequence();
        }
    }

    // STEP 9: Clean Credits & "THE END" Sequence (SINGLE & FIX)
    function showCreditsSequence() {
        const creditsContainer = document.createElement("div");
        creditsContainer.id = "creditsSequence";
        creditsContainer.style.position = "fixed";
        creditsContainer.style.top = "0";
        creditsContainer.style.left = "0";
        creditsContainer.style.width = "100vw";
        creditsContainer.style.height = "100vh";
        creditsContainer.style.display = "flex";
        creditsContainer.style.flexDirection = "column";
        creditsContainer.style.justifyContent = "center";
        creditsContainer.style.alignItems = "center";
        creditsContainer.style.zIndex = "999";
        creditsContainer.style.color = "#ffffff";
        creditsContainer.style.textAlign = "center";
        creditsContainer.style.fontFamily = "sans-serif";
        creditsContainer.style.opacity = "0";
        creditsContainer.style.transition = "opacity 1.5s ease";

        document.body.appendChild(creditsContainer);

        // Poster fade out ke 3 Sec baad Clean Credits
        setTimeout(() => {
            creditsContainer.innerHTML = `
                <h2 style="font-size: 1.2rem; margin-bottom: 8px; letter-spacing: 2px; color: #f1f1f1;">IMAGINED & CREATED BY</h2>
                <h1 style="font-size: 2.2rem; margin-bottom: 12px; color: #ffffff; letter-spacing: 3px;">MANAV</h1>
                <p style="font-size: 1.2rem; color: #ff8fa3; font-style: italic;">SPECIALLY FOR GUNGUN...</p>
            `;
            creditsContainer.style.opacity = "1";

            // 5 Sec baad Fade Out & THE END
            setTimeout(() => {
                creditsContainer.style.opacity = "0";
                
                setTimeout(() => {
                    creditsContainer.innerHTML = `
                        <h1 style="font-size: 3rem; letter-spacing: 5px; color: #ffffff; text-shadow: 0 0 15px rgba(255,255,255,0.8);">THE END</h1>
                    `;
                    creditsContainer.style.opacity = "1";
                }, 1500);
            }, 5000);
        }, 3000);
    }

    // Rain Particle Generator
    function startMagicalRain() {
        if (!rainContainer) return;
        const items = ['✨', '♥️', '✨','♥️','🎈','🌟', '🌟','🎈'];
        setInterval(() => {
            const element = document.createElement('div');
            element.classList.add('rain-item');
            element.innerText = items[Math.floor(Math.random() * items.length)];
            element.style.left = Math.random() * 100 + 'vw';
            const size = Math.random() * 14 + 16; 
            element.style.fontSize = size + 'px';
            const fallDuration = Math.random() * 3 + 4; 
            element.style.animationDuration = fallDuration + 's';
            
            rainContainer.appendChild(element);
            setTimeout(() => { element.remove(); }, fallDuration * 1000);
        }, 250); 
    }

    // Confetti System
    function initConfetti() {
        if (!effectCanvas) return;
        const ctx = effectCanvas.getContext("2d");
        let width = (effectCanvas.width = window.innerWidth);
        let height = (effectCanvas.height = window.innerHeight);
        const particles = [];
        const colors = ["#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1", "#fff"];

        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height - height,
                r: Math.random() * 4 + 2,
                d: Math.random() * 50 + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 10 - 5,
                tiltAngleIncremental: Math.random() * 0.07 + 0.02,
                tiltAngle: 0
            });
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p, idx) => {
                p.tiltAngle += p.tiltAngleIncremental;
                p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
                p.x += Math.sin(p.tiltAngle);
                p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;
                ctx.beginPath();
                ctx.lineWidth = p.r;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
                ctx.stroke();
            });
            particles.forEach((p) => { if (p.y > height) { p.y = -20; p.x = Math.random() * width; } });
            requestAnimationFrame(draw);
        }
        draw();
    }
});
                    
