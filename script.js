const textEL = document.getElementById('text');
const speakEL = document.getElementById('speak');
const speechEl = document.getElementById('speech');
const startEl = document.getElementById('start');
const stopEl = document.getElementById('stop');
const languageEL = document.getElementById('language');
const recognitionLanguageEL = document.getElementById('recognition-language');
const searchTextEl = document.getElementById('searchText');
const searchSpeechEl = document.getElementById('searchSpeech');

let recognition;
let finalTranscript = '';

speakEL.addEventListener('click', speakText);

function speakText() {
    // stop any speaking in progress
    window.speechSynthesis.cancel();

    const text = textEL.value;
    const language = languageEL.value;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
}

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
        console.log('Speech recognition started');
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }
        speechEl.value = finalTranscript + interimTranscript;
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
        finalTranscript = '';
        speechEl.value = ''; // Clear the textarea before starting
        recognition.lang = recognitionLanguageEL.value; // Set language based on selection
        recognition.start();
    }
});

stopEl.addEventListener('click', () => {
    if (recognition) {
        recognition.stop();
    }
});

searchTextEl.addEventListener('click', () => {
    const query = textEL.value;
    if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
});

searchSpeechEl.addEventListener('click', () => {
    const query = speechEl.value;
    if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
});
