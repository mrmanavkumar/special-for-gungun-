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

    Let isTriggered = false;

    // STEP 1: INITIAL CLEANUP -> 4.5 SEC BLANK DELAY -> TYPEWRITER LOADING -> 6 SEC HOLD -> FADE OUT
    Const initialLoadingText = document.getElementById("loadingText");
    If (initialLoadingText) {
        InitialLoadingText.innerHTML = ""; // Initial HTML Text clear
        InitialLoadingText.style.color = "#ffffff"; // Force White Color
        InitialLoadingText.style.opacity = "0"; // Blank setup
    }

    SetTimeout(() => {
        If (initialLoadingText) {
            InitialLoadingText.style.opacity = "1";
            Const loadingTextStr = "Something is loading for Gungun...";
            
            // Typewriter effect with Heart Cursor
            TypewriterWithHeart(initialLoadingText, loadingTextStr, () => {
                
                // Typing complete hone ke baad 6 SECONDS HOLD
                SetTimeout(() => {
                    // Dhere-dhere Fade Out (1.8s)
                    InitialLoadingText.style.transition = "opacity 1.8s ease";
                    InitialLoadingText.style.opacity = "0";

                    SetTimeout(() => {
                        If (loadingBox) loadingBox.style.display = "none";
                        
                        If (mainLink) {
                            MainLink.style.display = "flex";
                            MainLink.style.opacity = "0";
                            Void mainLink.offsetWidth; // Force Reflow
                            
                            // Smooth Gift Box Reveal (2.5s)
                            MainLink.style.transition = "opacity 2.5s ease-in-out";
                            MainLink.style.opacity = "1";
                        }
                    }, 1800);
                }, 6000); // 6 Seconds Hold Time
            });
        }
    }, 4500); // 4.5 Seconds Wait Before Typing Starts

    // Audio Unlocker for Mobile Browsers
    Function unlockAudio(audioEl) {
        If (!audioEl) return;
        AudioEl.play().then(() => {
            AudioEl.pause();
            AudioEl.currentTime = 0;
        }).catch(() => {});
    }

    // STEP 2: Gift Box Click Handler
    Function handleLinkClick(e) {
        If (e) e.stopPropagation();
        If (isTriggered) return;
        IsTriggered = true;

        UnlockAudio(bgMusic);
        UnlockAudio(hbdVoice);
        UnlockAudio(devaMusic);

        If (giftBox) giftBox.classList.add("shake-active");

        StartMagicalRain();

        // Smooth Fade Out of Gift Section
        SetTimeout(() => {
            If (giftSection) {
                GiftSection.style.transition = "opacity 1s ease";
                GiftSection.style.opacity = "0";
                SetTimeout(() => {
                    GiftSection.style.display = "none";
                    If (countdownScreen) {
                        CountdownScreen.classList.remove("hidden");
                        StartCountdownTimer(); 
                    } else {
                        ShowBirthdayGreeting();
                    }
                }, 1000);
            }
        }, 1200);
    }

    If (mainLink) mainLink.addEventListener("click", handleLinkClick);
    If (giftBox) giftBox.addEventListener("click", handleLinkClick);

    // STEP 3: Countdown Timer (11:59:50 -> 12:00:00)
    Function startCountdownTimer() {
        Let seconds = 50;
        If (countdownNumber) countdownNumber.textContent = "11:59:50";

        If (countdownAudio) {
            Try {
                CountdownAudio.currentTime = 0;
                CountdownAudio.play().catch(() => {});
            } catch(e) {}
        }

        Const timer = setInterval(() => {
            If (seconds < 60) {
                Seconds++;
                If (countdownAudio) {
                    Try {
                        CountdownAudio.currentTime = 0;
                        CountdownAudio.play().catch(() => {});
                    } catch(e) {}
                }
                If (seconds === 60) {
                    If (countdownNumber) countdownNumber.textContent = "12:00:00";
                } else {
                    If (countdownNumber) countdownNumber.textContent = `11:59:${seconds.toString().padStart(2, '0')}`;
                }
            } else {
                ClearInterval(timer);
                
                If (countdownAudio) {
                    Try {
                        CountdownAudio.pause();
                        CountdownAudio.currentTime = 0;
                    } catch(e) {}
                }

                SetTimeout(() => {
                    If (countdownScreen) countdownScreen.classList.add("hidden");
                    ShowBirthdayGreeting();
                }, 1000);
            }
        }, 1000);
    }

    // STEP 4: Happy Birthday Screen
    Function showBirthdayGreeting() {
        If (bdayGreetingScreen) {
            BdayGreetingScreen.classList.remove("hidden");
        }

        If (hbdVoice) {
            Try {
                HbdVoice.currentTime = 0;
                HbdVoice.play().catch(() => {});
            } catch(e) {}
        }

        If (bgMusic) {
            Try {
                BgMusic.currentTime = 0;
                BgMusic.play().catch(() => {});
            } catch(e) {}
        }

        InitConfetti();

        SetTimeout(() => {
            If (bdayGreetingScreen) bdayGreetingScreen.classList.add("hidden");
            
            If (templateSection) {
                TemplateSection.classList.remove("hidden");
                SetTimeout(() => templateSection.classList.add("active"), 100);
                
                // 20 SECONDS FOR TEMPLATE
                SetTimeout(() => {
                    TemplateSection.classList.remove("active");
                    SetTimeout(() => {
                        TemplateSection.classList.add("hidden");
                        ShowLetterPage();
                    }, 1500); 
                }, 20000); 
            } else {
                ShowLetterPage();
            }
        }, 3500);
    }

    // STEP 5: Notebook Letter Page (1 Minute Total Hold)
    Function showLetterPage() {
        If (messageSection) {
            MessageSection.classList.remove("hidden");
            SetTimeout(() => {
                MessageSection.classList.add("active");
                TypeWriterEffect();
            }, 100);
        }
    }

    // Typewriter Engine for Letter
    Async function typeWriterEffect() {
        Const targetDiv = document.getElementById("typewriterText");
        If (!targetDiv) {
            HandleMusicEndTransition();
            Return;
        }

        TargetDiv.style.overflowY = "auto";
        TargetDiv.style.webkitOverflowScrolling = "touch";

        Const letterData = [
            { type: 'p', text: 'Gungun, tumhare birthday par main dil se dua karta hoon ki tumhari zindagi hamesha khushiyon se bhari rahe.' },
            { type: 'p', text: 'Tum hamesha muskurati raho, aur tumhare chehre ki ye muskaan kabhi kam na ho, kyunki tum sach mein har ek khushi deserve karti ho.' },
            { type: 'p', text: 'Tumne jo bhi sapne dekhe hain, woh saare sach ho, aur tum life mein hamesha aage badhti raho🩺👩‍⚕️🩺' },
            { type: 'p', text: 'Tumhe zindagi mein woh sab mile jo tum dil se chahti ho.' },
            { type: 'p', text: 'Bas itni si dua hai meri—tum jahan bhi raho, hamesha khush raho😊' },
            { type: 'p', text: 'Take care of yourself. 🌸✨', alignRight: true },
            { type: 'p', text: '- MANAV', alignRight: true }
        ];

        TargetDiv.innerHTML = ""; 

        Const startTime = Date.now(); // Screen start time capture

        For (const data of letterData) {
            Const element = document.createElement(data.type);
            If (data.alignRight) {
                Element.style.textAlign = "right";
                Element.style.marginTop = "10px";
            }
            TargetDiv.appendChild(element);

            Let rawText = data.text;
            For (let i = 0; i < rawText.length; i++) {
                Const oldCursor = element.querySelector('.heart-cursor');
                If (oldCursor) oldCursor.remove();

                Element.innerHTML += rawText.charAt(i);
                Element.innerHTML += '<span class="heart-cursor">❤️</span>';
                
                TargetDiv.scrollTop = targetDiv.scrollHeight;
                
                Await new Promise(res => setTimeout(res, 45)); // Comfortable reading speed
            }
            Const finalCursor = element.querySelector('.heart-cursor');
            If (finalCursor) finalCursor.remove();
            
            Await new Promise(res => setTimeout(res, 300));
        }

        // Exact 30 second ( 30000 ms) Hold Calculation
        Const elapsedTime = Date.now() - startTime;
        Const remainingTime = Math.max(0, 30000 - elapsedTime); 

        SetTimeout(() => {
            HandleMusicEndTransition();
        }, remainingTime);
    }
    
    // STEP 6: Letter End -> Stop BG Music -> 5 Sec Blank Delay
    Function handleMusicEndTransition() {
        Let hasTransitioned = false;

        Const triggerNext = () => {
            If (hasTransitioned) return;
            HasTransitioned = true;
            
            If (messageSection) messageSection.classList.remove("active");
            If (bgMusic) {
                Try {
                    BgMusic.pause();
                    BgMusic.currentTime = 0;
                } catch(e) {}
            }

            SetTimeout(() => {
                If (messageSection) messageSection.classList.add("hidden");
                
                // EXACT 5 SECONDS BLANK SCREEN DELAY
                SetTimeout(() => {
                    ShowLastMessageScreen();
                }, 5000);
            }, 1500);
        };

        If (bgMusic && !bgMusic.paused) {
            BgMusic.onended = triggerNext;
        } else {
            SetTimeout(triggerNext, 2000);
        }
    }

    // STEP 7: Transition Message Screen with Heart Cursor & Deva Music Play
    Function showLastMessageScreen() {
        If (lastMsgScreen) {
            LastMsgScreen.classList.remove("hidden");
            SetTimeout(() => lastMsgScreen.classList.add("active"), 100);
        }

        If (devaMusic) {
            Try {
                DevaMusic.currentTime = 0;
                DevaMusic.play().catch(() => {});
            } catch(e) {}
        }

        Let targetEl = document.querySelector(".last-msg-text");
        If (!targetEl && lastMsgScreen) {
            TargetEl = lastMsgScreen;
        }

        If (targetEl) {
            TargetEl.style.color = "#d4af37"; // Golden Yellow Accent
        }

        Const textToType = "In my eyes, who you truly are…\nlet me show you.";

        // Typewriter Engine with Heart Cursor ♥️
        TypewriterWithHeart(targetEl, textToType, () => {
            // Typing completion -> HOLD FOR EXACT 8 SECONDS
            SetTimeout(() => {
                If (lastMsgScreen) lastMsgScreen.classList.remove("active");
                
                SetTimeout(() => {
                    If (lastMsgScreen) lastMsgScreen.classList.add("hidden");
                    
                    // 3 SECONDS PAUSE BEFORE POSTER REVEAL
                    SetTimeout(() => {
                        ShowFinalPoster();
                    }, 3000);
                }, 1500);
            }, 8000);
        });
    }

    // Typewriter Engine with Heart Cursor ♥️
    Function typewriterWithHeart(element, text, callback) {
        If (!element) {
            If (callback) callback();
            Return;
        }
        Element.innerHTML = "";
        Let index = 0;

        Const cursor = document.createElement("span");
        Cursor.className = "heart-cursor";
        Cursor.innerHTML = "♥️";
        Element.appendChild(cursor);

        Function type() {
            If (index < text.length) {
                Let char = text.charAt(index);
                If (char === "\n") {
                    Element.insertBefore(document.createElement("br"), cursor);
                } else {
                    Let charNode = document.createTextNode(char);
                    Element.insertBefore(charNode, cursor);
                }
                Index++;
                SetTimeout(type, 85);
            } else {
                If (callback) callback();
            }
        }

        Type();
    }

    // STEP 8: Final Poster Screen (mg.png)
    Function showFinalPoster() {
        If (posterSection) {
            PosterSection.classList.remove("hidden");
            
            // Poster active state & timing
            SetTimeout(() => posterSection.classList.add("active"), 100);

            SetTimeout(() => {
                PosterSection.classList.remove("active");
                SetTimeout(() => {
                    PosterSection.classList.add("hidden");
                    ShowCreditsSequence();
                }, 2500);
            }, 140000); 
        } else {
            ShowCreditsSequence();
        }
    }
    

    // STEP 9: Cinematic Fade Sequence (4s Delay -> Wish 6s -> Credits 5s -> THE END)
    Function showCreditsSequence() {
        Const creditsContainer = document.createElement("div");
        CreditsContainer.id = "creditsSequence";
        CreditsContainer.style.position = "fixed";
        CreditsContainer.style.top = "0";
        CreditsContainer.style.left = "0";
        CreditsContainer.style.width = "100vw";
        CreditsContainer.style.height = "100vh";
        CreditsContainer.style.display = "flex";
        CreditsContainer.style.flexDirection = "column";
        CreditsContainer.style.justifyContent = "center";
        CreditsContainer.style.alignItems = "center";
        CreditsContainer.style.zIndex = "9999";
        CreditsContainer.style.color = "#ffffff";
        CreditsContainer.style.textAlign = "center";
        CreditsContainer.style.fontFamily = "'Georgia', serif";
        CreditsContainer.style.opacity = "0";
        CreditsContainer.style.transition = "opacity 2s ease";
        CreditsContainer.style.padding = "20px";

        Document.body.appendChild(creditsContainer);

        SetTimeout(() => {
            CreditsContainer.innerHTML = `
                <h1 style="font-size: 1.8rem; line-height: 1.5; color: #d4af37; letter-spacing: 1.5px; font-weight: normal;">
                    Once again, a very Happy Birthday to you! ✨
                </h1>
            `;
            CreditsContainer.style.opacity = "1";

            SetTimeout(() => {
                CreditsContainer.style.opacity = "0";

                SetTimeout(() => {
                    CreditsContainer.innerHTML = `
                        <h2 style="font-size: 1.1rem; margin-bottom: 10px; letter-spacing: 3px; color: #cccccc; font-weight: 300;">CONCEPT, DESIGN & CREATION BY</h2>
                        <h1 style="font-size: 2.2rem; margin-bottom: 12px; color: #d4af37; letter-spacing: 4px;">MANAV</h1>
                        <p style="font-size: 1.2rem; color: #ffffff; font-style: italic; letter-spacing: 1px;">SPECIALLY FOR GUNGUN</p>
                    `;
                    CreditsContainer.style.opacity = "1";

                    SetTimeout(() => {
                        CreditsContainer.style.opacity = "0";

                        SetTimeout(() => {
                            CreditsContainer.innerHTML = `
                                <h1 style="font-size: 2.5rem; letter-spacing: 6px; color: #ffffff; text-shadow: 0 0 15px rgba(212, 175, 55, 0.6); font-weight: 300;">— THE END —</h1>
                            `;
                            CreditsContainer.style.opacity = "1";
                        }, 2000);

                    }, 5000);

                }, 2000);

            }, 6000);

        }, 4000);
    }

    // Rain Particle Generator
    Function startMagicalRain() {
        If (!rainContainer) return;
        Const items = ['✨', '♥️', '✨','♥️','🎈','🌟', '🌟','🎈'];
        SetInterval(() => {
            Const element = document.createElement('div');
            Element.classList.add('rain-item');
            Element.innerText = items[Math.floor(Math.random() * items.length)];
            Element.style.left = Math.random() * 100 + 'vw';
            Const size = Math.random() * 14 + 16; 
            Element.style.fontSize = size + 'px';
            Const fallDuration = Math.random() * 3 + 4; 
            Element.style.animationDuration = fallDuration + 's';
            
            RainContainer.appendChild(element);
            SetTimeout(() => { element.remove(); }, fallDuration * 1000);
        }, 250); 
    }

    // Confetti System
    Function initConfetti() {
        If (!effectCanvas) return;
        Const ctx = effectCanvas.getContext("2d");
        Let width = (effectCanvas.width = window.innerWidth);
        Let height = (effectCanvas.height = window.innerHeight);
        Const particles = [];
        Const colors = ["#ff4d6d", "#ff758f", "#ff8fa3", "#ffb3c1", "#fff"];

        For (let i = 0; i < 100; i++) {
            Particles.push({
                X: Math.random() * width,
                Y: Math.random() * height - height,
                R: Math.random() * 4 + 2,
                D: Math.random() * 50 + 10,
                Color: colors[Math.floor(Math.random() * colors.length)],
                Tilt: Math.random() * 10 - 5,
                TiltAngleIncremental: Math.random() * 0.07 + 0.02,
                TiltAngle: 0
            });
        }

        Function draw() {
            Ctx.clearRect(0, 0, width, height);
            Particles.forEach((p, idx) => {
                P.tiltAngle += p.tiltAngleIncremental;
                P.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
                P.x += Math.sin(p.tiltAngle);
                P.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;
                Ctx.beginPath();
                Ctx.lineWidth = p.r;
                Ctx.strokeStyle = p.color;
                Ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
                Ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
                Ctx.stroke();
            });
            Particles.forEach((p) => { if (p.y > height) { p.y = -20; p.x = Math.random() * width; } });
            RequestAnimationFrame(draw);
        }
        Draw();
    }
});
        
