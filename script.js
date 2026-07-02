// ================= 🎵 MUSIC =================
function startMusic() {
    const music = document.getElementById("bgMusic");
    music.volume = 0.8;

    music.play().catch(() => {
        // wait for first interaction
        document.addEventListener("click", () => {
            music.play();
        }, { once: true });
    });
}

// ================= SECTION 1 =================
window.onload = () => {

    // 🎵 try play music immediately
    startMusic();

    document.querySelector(".paper").classList.add("slide-paper");

    setTimeout(() => {
        document.querySelector(".polaroid").classList.add("slide-polaroid");
    }, 400);

    setTimeout(startTyping, 1200);
};

// greeting
const text = "Happy Birthday\nMahal Ko ";

let index = 0;

function startTyping() {
    const el = document.getElementById("typing");

    el.textContent = "";
    index = 0;

    typeWriter();
}

function typeWriter() {
    const el = document.getElementById("typing");

    if (index < text.length) {
        el.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// ================= SECTION 2 =================
const text2 = "The Most Special Day\nTo Celebrate!";
let i2 = 0;

function typeText2() {
    const el = document.getElementById("typing2");

    if (i2 < text2.length) {
        el.textContent += text2.charAt(i2);
        i2++;
        setTimeout(typeText2, 80);
    } else {
        document.querySelector(".numbers").classList.add("showNumbers");
    }
}

let section2Typed = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting && !section2Typed) {
            section2Typed = true;

            document.getElementById("typing2").textContent = "";
            i2 = 0;
            typeText2();
        }

    });
}, {
    threshold: 0.5
});

observer.observe(document.querySelector(".section2"));


// ================= SECTION 3 =================
const text3 = "Make a wish muna my love 💙";
let i3 = 0;
let section3Started = false;
let cakeBlown = false;

function typeText3() {
    const el = document.getElementById("cakeText");

    if (i3 < text3.length) {
        el.textContent += text3.charAt(i3);
        i3++;
        setTimeout(typeText3, 90);
    } else {
        showCake();
    }
}

function showCake() {
    document.getElementById("cakeWrapper").classList.add("show");

    // start mic AFTER cake appears
    startMic();
}

const observer3 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting && !section3Started) {
            section3Started = true;

            document.getElementById("cakeText").textContent = "";
            i3 = 0;

            setTimeout(typeText3, 500);
        }

    });
}, {
    threshold: 0.5
});

observer3.observe(document.querySelector(".section3"));


// ================= 🎤 MIC =================
let audioContext;
let analyser;
let microphone;
let dataArray;

function startMic() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();

            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);

            analyser.fftSize = 512;
            dataArray = new Uint8Array(analyser.frequencyBinCount);

            detectBlow();
        })
        .catch(err => console.log("Mic error:", err));
}

function detectBlow() {
    analyser.getByteFrequencyData(dataArray);

    let volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

    if (volume > 35 && !cakeBlown) {
        cakeBlown = true;
        blowCake();
    }

    requestAnimationFrame(detectBlow);
}


// ================= 🎂 BLOW + CONFETTI =================
function blowCake() {
    document.getElementById("cake").style.filter = "brightness(0.4)";

    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 70,
            origin: { x: 0 }
        });
    }, 200);

    setTimeout(() => {
        confetti({
            particleCount: 100,
            angle: 120,
            spread: 70,
            origin: { x: 1 }
        });
    }, 400);
}

let section4Started = false;

const observer4 = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting && !section4Started){

            section4Started = true;

            document.querySelector(".flower").classList.add("show-flower");
            document.querySelector(".letter").classList.add("show-letter");

            setTimeout(typeLetter, 900);
        }

    });

},{
    threshold:0.5
});

observer4.observe(document.querySelector(".section4"));

observer4.observe(document.querySelector(".section4"));
const letterText = `Happy birthday Mahal Ko ❤️

Flowers for you my handsome boy.

First, I want to say I can’t put into words how proud I am of you and the incredible person you’ve become.

I pray that every dream you have and every wish in your heart comes true. May you be blessed with a long, happy, healthy life filled with love, joy, and no regrets.

I know you always say that your birthday isn’t anything special, but to me, it’s one of the most meaningful days because it’s the day the person who makes me the happiest was born.

Thank you for always believing in me, supporting me in everything I do, and being my safe place.

I’m so grateful to be your partner, to stand beside you through every high and low, and to continue growing together as we become better versions of ourselves.

No matter what life brings, I’ll always be cheering you on.

I love you so much, and I appreciate everything about you.

Mahal na mahal kita asawa ko ❤️`;

let letterIndex = 0;

function typeLetter() {

    const el = document.getElementById("letterTyping");

    if(letterIndex < letterText.length){

        el.textContent += letterText.charAt(letterIndex);
        letterIndex++;

        // Auto-scroll as it types
        el.parentElement.scrollTop = el.parentElement.scrollHeight;

        setTimeout(typeLetter, 28);
    }

}