Document.addEventListener("DOMContentLoaded", () => {
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

    // STEP 1: INITIAL CLEANUP -> 4.5 SEC BLANK DELAY -> TYPEWRITER LOADING -> 6 SEC HOLD -> FADE OUT
    const initialLoadingText = document.getElementById("loadingText");
    if (initialLoadingText) {
        initialLoadingText.innerHTML = ""; // Initial HTML Text clear (Blank Screen Keep-up)
        initialLoadingText.style.color = "#ffffff"; // Force White Color
        initialLoadingText.style.opacity = "0"; // Blank setup
    }

    setTimeout(() => {
        if (initialLoadingText) {
            initialLoadingText.style.opacity = "1";
            const loadingTextStr = "Somthing is loading for Gungun...";
            
            // Typewriter effect with Heart Cursor
            typewriterWithHeart(initialLoadingText, loadingTextStr, () => {
                
                // Typing complete hone ke baad 6 SECONDS HOLD
                setTimeout(() => {
                    // Dhere-dhere Fade Out (1.8s)
                    initialLoadingText.style.transition = "opacity 1.8s ease";
                    initialLoadingText.style.opacity = "0";

                    setTimeout(() => {
                        if (loadingBox) loadingBox.style.display = "none";
                        
                        if (mainLink) {
                            mainLink.style.display = "flex";
                            mainLink.style.opacity = "0";
                            void mainLink.offsetWidth; // Force Reflow
                            
                            // Smooth Gift Box Reveal (2.5s)
                            mainLink.style.transition = "opacity 2.5s ease-in-out";
                            mainLink.style.opacity = "1";
                        }
                    }, 1800);
                }, 6000); // 6 Seconds Hold Time
            });
        }
    }, 4500); // 4.5 Seconds Wait Before Typing Starts

    // Audio Unlocker for Mobile Browsers
    function unlockAudio(audioEl) {
        if (!audioEl) return;
        audioEl.play().then(() => {
            audioEl.pause();
            audioEl.currentTime = 0;
        }).catch(() => {});
    }

    // STEP 2: Gift Box Click Handler
    function handleLinkClick(e) {
        if (e) e.stopPropagation();
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
                        startCountdownTimer(); 
                    } else {
                        showBirthdayGreeting();
                    }
                }, 1000);
            }
        }, 1200);
    }

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
                    if (countdownScreen) countdownScreen.classList.add("hidden");
                    showBirthdayGreeting();
                }, 1000);
            }
        }, 1000);
    }

    // STEP 4: Happy Birthday Screen
    function showBirthdayGreeting() {
        if (bdayGreetingScreen) {
            bdayGreetingScreen.classList.remove("hidden");
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
            if (bdayGreetingScreen) bdayGreetingScreen.classList.add("hidden");
            
            if (templateSection) {
                templateSection.classList.remove("hidden");
                setTimeout(() => templateSection.classList.add("active"), 100);
                
                setTimeout(() => {
                    templateSection.classList.remove("active");
                    setTimeout(() => {
                        templateSection.classList.add("hidden");
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
            setTimeout(() => {
                messageSection.classList.add("active");
                typeWriterEffect();
            }, 100);
        }
    }

    // Typewriter Engine for Letter
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

    // STEP 6: Letter End -> Stop BG Music -> 5 Sec Blank Delay
    function handleMusicEndTransition() {
        let hasTransitioned = false;

        const triggerNext = () => {
            if (hasTransitioned) return;
            hasTransitioned = true;
            
            if (messageSection) messageSection.classList.remove("active");
            if (bgMusic) {
                try {
                    bgMusic.pause();
                    bgMusic.currentTime = 0;
                } catch(e) {}
            }

            setTimeout(() => {
                if (messageSection) messageSection.classList.add("hidden");
                
                // EXACT 5 SECONDS BLANK SCREEN DELAY
                setTimeout(() => {
                    showLastMessageScreen();
                }, 5000);
            }, 1500);
        };

        if (bgMusic && !bgMusic.paused) {
            bgMusic.onended = triggerNext;
        } else {
            setTimeout(triggerNext, 2000);
        }
    }

    // STEP 7: Transition Message Screen with Heart Cursor & Deva Music Play
    function showLastMessageScreen() {
        if (lastMsgScreen) {
            lastMsgScreen.classList.remove("hidden");
            setTimeout(() => lastMsgScreen.classList.add("active"), 100);
        }

        if (devaMusic) {
            try {
                devaMusic.currentTime = 0;
                devaMusic.play().catch(() => {});
            } catch(e) {}
        }

        let targetEl = document.querySelector(".last-msg-text");
        if (!targetEl && lastMsgScreen) {
            targetEl = lastMsgScreen;
        }

        if (targetEl) {
            targetEl.style.color = "#ffffff"; // Force White Color
        }

        const textToType = "In my eyes, who you truly are…\nlet me show you.";

        // Typewriter Engine with Heart Cursor ♥️
        typewriterWithHeart(targetEl, textToType, () => {
            // Typing completion -> HOLD FOR EXACT 8 SECONDS
            setTimeout(() => {
                if (lastMsgScreen) lastMsgScreen.classList.remove("active");
                
                setTimeout(() => {
                    if (lastMsgScreen) lastMsgScreen.classList.add("hidden");
                    
                    // 3 SECONDS PAUSE BEFORE POSTER REVEAL
                    setTimeout(() => {
                        showFinalPoster();
                    }, 3000);
                }, 1500);
            }, 8000);
        });
    }

    // Typewriter Engine with Heart Cursor ♥️
    function typewriterWithHeart(element, text, callback) {
        if (!element) {
            if (callback) callback();
            return;
        }
        element.innerHTML = "";
        let index = 0;

        const cursor = document.createElement("span");
        cursor.className = "heart-cursor";
        cursor.innerHTML = "♥️";
        element.appendChild(cursor);

        function type() {
            if (index < text.length) {
                let char = text.charAt(index);
                if (char === "\n") {
                    element.insertBefore(document.createElement("br"), cursor);
                } else {
                    let charNode = document.createTextNode(char);
                    element.insertBefore(charNode, cursor);
                }
                index++;
                setTimeout(type, 85);
            } else {
                if (callback) callback();
            }
        }

        type();
    }

    // STEP 8: Final Poster Screen (mg.png)
    function showFinalPoster() {
        if (posterSection) {
            posterSection.classList.remove("hidden");
            setTimeout(() => posterSection.classList.add("active"), 100);

            setTimeout(() => {
                posterSection.classList.remove("active");
                setTimeout(() => {
                    posterSection.classList.add("hidden");
                    showCreditsSequence();
                }, 2500);
            }, 140000); 
        } else {
            showCreditsSequence();
        }
    }

    // STEP 9: Cinematic Fade Sequence (4s Delay -> Wish 6s -> Credits 5s -> THE END)
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
        creditsContainer.style.zIndex = "9999";
        creditsContainer.style.color = "#ffffff";
        creditsContainer.style.textAlign = "center";
        creditsContainer.style.fontFamily = "'Georgia', serif";
        creditsContainer.style.opacity = "0";
        creditsContainer.style.transition = "opacity 2s ease";
        creditsContainer.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
        creditsContainer.style.padding = "20px";

        document.body.appendChild(creditsContainer);

        setTimeout(() => {
            creditsContainer.innerHTML = `
                <h1 style="font-size: 1.8rem; line-height: 1.5; color: #d4af37; letter-spacing: 1.5px; font-weight: normal;">
                    Once again, a very Happy Birthday to you! ✨
                </h1>
            `;
            creditsContainer.style.opacity = "1";

            setTimeout(() => {
                creditsContainer.style.opacity = "0";

                setTimeout(() => {
                    creditsContainer.innerHTML = `
                        <h2 style="font-size: 1.1rem; margin-bottom: 10px; letter-spacing: 3px; color: #cccccc; font-weight: 300;">IMAGINED AND CREATED BY</h2>
                        <h1 style="font-size: 2.2rem; margin-bottom: 12px; color: #d4af37; letter-spacing: 4px;">MANAV</h1>
                        <p style="font-size: 1.2rem; color: #ffffff; font-style: italic; letter-spacing: 1px;">SPECIALLY FOR GUNGUN</p>
                    `;
                    creditsContainer.style.opacity = "1";

                    setTimeout(() => {
                        creditsContainer.style.opacity = "0";

                        setTimeout(() => {
                            creditsContainer.innerHTML = `
                                <h1 style="font-size: 2.5rem; letter-spacing: 6px; color: #ffffff; text-shadow: 0 0 15px rgba(212, 175, 55, 0.6); font-weight: 300;">— THE END —</h1>
                            `;
                            creditsContainer.style.opacity = "1";
                        }, 2000);

                    }, 5000);

                }, 2000);

            }, 6000);

        }, 4000);
    }

    // MULTI-COLORED BALLOONS GENERATOR (UPDATED)
    function startMagicalRain() {
        if (!rainContainer) return;

        const balloonColors = [
            "#ff4f81", // pink
            "#ff6b6b", // red
            "#ffd166", // yellow
            "#4dabf7", // blue
            "#b197fc", // purple
            "#69db7c", // green
            "#ff922b"  // orange
        ];

        function createBalloon() {
            const balloon = document.createElement("div");
            balloon.className = "falling-balloon";

            const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];

            balloon.style.left = Math.random() * 100 + "vw";
            balloon.style.background = color;
            balloon.style.animationDuration = (8 + Math.random() * 6) + "s";
            balloon.style.animationDelay = Math.random() * 3 + "s";

            rainContainer.appendChild(balloon);

            setTimeout(() => {
                balloon.remove();
            }, 16000);
        }

        setInterval(createBalloon, 900);
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
             
