document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const loadingBox = document.getElementById("loadingBox");
    const mainLink = document.getElementById("mainLink");
    const giftBox = document.getElementById("giftBox");
    const giftSection = document.getElementById("giftSection");
    
    const countdownScreen = document.getElementById("countdownScreen");
    const countdownNumber = document.getElementById("countdownNumber");
    
    const bdayGreetingScreen = document.getElementById("bdayGreetingScreen");
    const templateSection = document.getElementById("templateSection");
    const messageSection = document.getElementById("messageSection");
    const typewriterText = document.getElementById("typewriterText");
    const lastMsgScreen = document.getElementById("lastMsgScreen");
    const posterSection = document.getElementById("posterSection");
    const rainContainer = document.getElementById("rainContainer");

    // Audio Elements
    const countdownAudio = document.getElementById("countdownAudio");
    const hbdVoice = document.getElementById("hbdVoice");
    const bgMusic = document.getElementById("bgMusic");
    const devaMusic = document.getElementById("devaMusic");

    // Letter Content Setup
    const letterHeading = "Dearest Gungun,";
    const letterBody = [
        "Happy Birthday! 💖",
        "On this special day, I wanted to create something truly magical just for you. Every single moment shared with you holds a very special place in my heart.",
        "May your year ahead be filled with infinite joy, laughter, success, and all the happiness you deserve in this world. Keep shining bright as always!"
    ];

    // Colors Array for Multi-Color Balloons
    const balloonColors = ['#ff4f81', '#ff6b6b', '#ffd166', '#4dabf7', '#b197fc', '#69db7c', '#ff922b'];

    // 1. Initial Loading Simulation
    setTimeout(() => {
        loadingBox.style.display = "none";
        mainLink.style.display = "flex";
        setTimeout(() => {
            mainLink.style.opacity = "1";
            mainLink.classList.add("gift-fade-init", "show-fade");
        }, 50);
    }, 2000);

    // 2. Gift Box Click Event
    mainLink.addEventListener("click", () => {
        giftBox.classList.add("shake-active");
        
        setTimeout(() => {
            giftSection.style.opacity = "0";
            setTimeout(() => {
                giftSection.classList.add("hidden");
                startCountdownSequence();
            }, 1000);
        }, 1200);
    });

    // 3. Countdown Timer Sequence
    function startCountdownSequence() {
        countdownScreen.classList.remove("hidden");
        let secondsLeft = 10;
        
        if(countdownAudio) {
            countdownAudio.play().catch(e => console.log("Audio play error:", e));
        }

        const countdownInterval = setInterval(() => {
            secondsLeft--;
            if (secondsLeft >= 0) {
                countdownNumber.innerText = `11:59:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`;
            } else {
                clearInterval(countdownInterval);
                countdownScreen.classList.add("hidden");
                triggerBirthdayGreeting();
            }
        }, 1000);
    }

    // 4. Happy Birthday Greeting & Audio Trigger
    function triggerBirthdayGreeting() {
        bdayGreetingScreen.classList.remove("hidden");
        
        if (hbdVoice) hbdVoice.play().catch(e => console.log(e));
        if (bgMusic) bgMusic.play().catch(e => console.log(e));

        // Start Balloon Rain
        startBalloonRain();

        setTimeout(() => {
            bdayGreetingScreen.classList.add("hidden");
            showTemplateSection();
        }, 3500);
    }

    // 5. Template Image Display
    function showTemplateSection() {
        templateSection.classList.remove("hidden");
        setTimeout(() => {
            templateSection.classList.add("active");
        }, 100);

        setTimeout(() => {
            templateSection.classList.remove("active");
            setTimeout(() => {
                templateSection.classList.add("hidden");
                showNotebookLetter();
            }, 1000);
        }, 4000);
    }

    // 6. Notebook Letter Typewriter Engine
    function showNotebookLetter() {
        messageSection.classList.remove("hidden");
        setTimeout(() => messageSection.classList.add("active"), 100);

        let h3 = document.createElement("h3");
        typewriterText.appendChild(h3);
        
        let cursor = document.createElement("span");
        cursor.className = "heart-cursor";
        cursor.innerHTML = "💖";

        // Type Heading
        typeWriterEffect(h3, letterHeading, 0, () => {
            let paragraphIndex = 0;
            
            function typeNextParagraph() {
                if (paragraphIndex < letterBody.length) {
                    let p = document.createElement("p");
                    typewriterText.appendChild(p);
                    p.appendChild(cursor);
                    
                    typeWriterEffect(p, letterBody[paragraphIndex], 0, () => {
                        paragraphIndex++;
                        setTimeout(typeNextParagraph, 500);
                    }, cursor);
                } else {
                    // Typewriting Complete -> Transition to next screen
                    setTimeout(() => {
                        messageSection.classList.remove("active");
                        setTimeout(() => {
                            messageSection.classList.add("hidden");
                            showLastMsgScreen();
                        }, 1000);
                    }, 4000);
                }
            }
            
            typeNextParagraph();
        });
    }

    function typeWriterEffect(element, text, index, callback, cursorElement = null) {
        if (index < text.length) {
            if (cursorElement) {
                element.insertBefore(document.createTextNode(text.charAt(index)), cursorElement);
            } else {
                element.innerHTML += text.charAt(index);
            }
            setTimeout(() => typeWriterEffect(element, text, index + 1, callback, cursorElement), 50);
        } else if (callback) {
            callback();
        }
    }

    // 7. Transition Message
    function showLastMsgScreen() {
        lastMsgScreen.classList.remove("hidden");
        setTimeout(() => lastMsgScreen.classList.add("active"), 100);

        setTimeout(() => {
            lastMsgScreen.classList.remove("active");
            setTimeout(() => {
                lastMsgScreen.classList.add("hidden");
                showFinalPoster();
            }, 1000);
        }, 4000);
    }

    // 8. Final Poster Screen & Music Switch
    function showFinalPoster() {
        if (bgMusic) {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }
        if (devaMusic) devaMusic.play().catch(e => console.log(e));

        posterSection.classList.remove("hidden");
        setTimeout(() => posterSection.classList.add("active"), 100);
    }

    // Multi-color Balloon Generator Engine
    function startBalloonRain() {
        setInterval(() => {
            createBalloon();
        }, 300);
    }

    function createBalloon() {
        const balloon = document.createElement("div");
        balloon.classList.add("falling-balloon");

        // Random horizontal position
        balloon.style.left = Math.random() * 100 + "vw";

        // Random background color selection
        const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.backgroundColor = randomColor;

        // Random fall duration (8s to 13s)
        const duration = Math.random() * 5 + 8;
        balloon.style.animationDuration = duration + "s";

        rainContainer.appendChild(balloon);

        // Auto remove element after animation completes
        setTimeout(() => {
            balloon.remove();
        }, duration * 1000);
    }
});
            
