const textEL = document.getElementById('text');
const speakEL = document.getElementById('speak');
const speechEl = document.getElementById('speech');
const startEl = document.getElementById('start');
const stopEl = document.getElementById('stop');

let recognition;

speakEL.addEventListener('click', speakText);
function speakText() {
    // stop any speaking in progress
    window.speechSynthesis.cancel();

    const text = textEL.value;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        console.log('Speech recognition started');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        speechEl.value += transcript;
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event);
    };

    recognition.onend = () => {
        console.log('Speech recognition ended');
    };
}

startEl.addEventListener('click', () => {
    if (recognition) {
        speechEl.value = ''; // Clear the textarea before starting
        recognition.start();
    }
});

stopEl.addEventListener('click', () => {
    if (recognition) {
        recognition.stop();
    }
});