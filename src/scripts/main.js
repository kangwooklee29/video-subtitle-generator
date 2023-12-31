let API =  (navigator.userAgent.indexOf("Firefox") != -1) ? browser : chrome;

const languageDict = {
    "sq": {"English": "Albanian", "Native": "Shqip", "bcp-47": "sq-AL"},
    "ar": {"English": "Arabic", "Native": "العربية", "bcp-47": "ar-EG"},
    "hy": {"English": "Armenian", "Native": "Հայերեն", "bcp-47": "hy-AM"},
    "eu": {"English": "Basque", "Native": "Euskara", "bcp-47": "eu-ES"},
    "bn": {"English": "Bengali", "Native": "বাংলা", "bcp-47": "bn-IN"},
    "bg": {"English": "Bulgarian", "Native": "български", "bcp-47": "bg-BG"},
    "ca": {"English": "Catalan", "Native": "Català", "bcp-47": "ca-ES"},
    "zh": {"English": "Chinese (Mandarin)", "Native": "普通话", "bcp-47": "zh-CN"},
    "hr": {"English": "Croatian", "Native": "Hrvatski", "bcp-47": "hr-HR"},
    "cs": {"English": "Czech", "Native": "Čeština", "bcp-47": "cs-CZ"},
    "en": {"English": "English", "Native": "English", "bcp-47": "en-GB"},
    "et": {"English": "Estonian", "Native": "Eesti", "bcp-47": "et-EE"},
    "fi": {"English": "Finnish", "Native": "Suomi", "bcp-47": "fi-FI"},
    "fr": {"English": "French", "Native": "Français", "bcp-47": "fr-FR"},
    "ka": {"English": "Georgian", "Native": "ქართული", "bcp-47": "ka-GE"},
    "de": {"English": "German", "Native": "Deutsch", "bcp-47": "de-DE"},
    "el": {"English": "Greek", "Native": "Ελληνικά", "bcp-47": "el-GR"},
    "gu": {"English": "Gujarati", "Native": "ગુજરાતી", "bcp-47": "gu-IN"},
    "hi": {"English": "Hindi", "Native": "हिन्दी", "bcp-47": "hi-IN"},
    "hu": {"English": "Hungarian", "Native": "Magyar", "bcp-47": "hu-HU"},
    "id": {"English": "Indonesian", "Native": "Bahasa Indonesia", "bcp-47": "id-ID"},
    "ga": {"English": "Irish", "Native": "Gaeilge", "bcp-47": "ga-IE"},
    "it": {"English": "Italian", "Native": "Italiano", "bcp-47": "it-IT"},
    "ja": {"English": "Japanese", "Native": "日本語", "bcp-47": "ja-JP"},
    "jv": {"English": "Javanese", "Native": "Basa Jawa", "bcp-47": "jv-ID"},
    "ko": {"English": "Korean", "Native": "한국어", "bcp-47": "ko-KR"},
    "lv": {"English": "Latvian", "Native": "Latviešu", "bcp-47": "lv-LV"},
    "lt": {"English": "Lithuanian", "Native": "Lietuvių", "bcp-47": "lt-LT"},
    "mk": {"English": "Macedonian", "Native": "Македонски", "bcp-47": "mk-MK"},
    "ms": {"English": "Malay", "Native": "Bahasa Melayu", "bcp-47": "ms-MY"},
    "mt": {"English": "Maltese", "Native": "Malti", "bcp-47": "mt-MT"},
    "mr": {"English": "Marathi", "Native": "मराठी", "bcp-47": "mr-IN"},
    "mn": {"English": "Mongolian", "Native": "Монгол", "bcp-47": "mn-MN"},
    "ne": {"English": "Nepali", "Native": "नेपाली", "bcp-47": "ne-NP"},
    "no": {"English": "Norwegian", "Native": "Norsk", "bcp-47": "no-NO"},
    "fa": {"English": "Persian", "Native": "فارسی", "bcp-47": "fa-IR"},
    "pl": {"English": "Polish", "Native": "Polski", "bcp-47": "pl-PL"},
    "pt": {"English": "Portuguese", "Native": "Português", "bcp-47": "pt-PT"},
    "pa": {"English": "Punjabi", "Native": "ਪੰਜਾਬੀ", "bcp-47": "pa-IN"},
    "ro": {"English": "Romanian", "Native": "Română", "bcp-47": "ro-RO"},
    "ru": {"English": "Russian", "Native": "Русский", "bcp-47": "ru-RU"},
    "sr": {"English": "Serbian", "Native": "Српски", "bcp-47": "sr-RS"},
    "sk": {"English": "Slovak", "Native": "Slovenčina", "bcp-47": "sk-SK"},
    "sl": {"English": "Slovenian", "Native": "Slovenščina", "bcp-47": "sl-SI"},
    "es": {"English": "Spanish", "Native": "Español", "bcp-47": "es-ES"},
    "sw": {"English": "Swahili", "Native": "Kiswahili", "bcp-47": "sw-KE"},
    "sv": {"English": "Swedish", "Native": "Svenska", "bcp-47": "sv-SE"},
    "ta": {"English": "Tamil", "Native": "தமிழ்", "bcp-47": "ta-IN"},
    "tt": {"English": "Tatar", "Native": "татар теле", "bcp-47": "tt-RU"},
    "te": {"English": "Telugu", "Native": "తెలుగు", "bcp-47": "te-IN"},
    "th": {"English": "Thai", "Native": "ไทย", "bcp-47": "th-TH"},
    "tr": {"English": "Turkish", "Native": "Türkçe", "bcp-47": "tr-TR"},
    "uk": {"English": "Ukrainian", "Native": "Українська", "bcp-47": "uk-UA"},
    "ur": {"English": "Urdu", "Native": "اردو", "bcp-47": "ur-PK"},
    "uz": {"English": "Uzbek", "Native": "O‘zbek", "bcp-47": "uz-UZ"},
    "vi": {"English": "Vietnamese", "Native": "Tiếng Việt", "bcp-47": "vi-VN"},
    "cy": {"English": "Welsh", "Native": "Cymraeg", "bcp-47": "cy-GB"}
};

let recorder = null;
let buttonTimer = null;
let prevUrl = window.location.href;
let debounceTimer = {};
const domWatchObj = {};

const emptyMessage = '<svg class="message-close" viewBox="0 0 30 30"><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></svg>';
var messageDiv = document.createElement('div');
messageDiv.className = 'script-box';
emptyMessageContent();

function emptyMessageContent() {
    messageDiv.innerHTML = emptyMessage;
    messageDiv.querySelector("svg.message-close").addEventListener("click", () => {
        document.body.removeChild(messageDiv);
    });
}

function appendMessage(content) {
    var contentNode = document.createElement("p");
    contentNode.innerText = content;
    messageDiv.appendChild(contentNode);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = parseInt(seconds) % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

async function convertToLinear16(blob) {
    const audioContext = new AudioContext();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const pcmData = audioBuffer.getChannelData(0);
    const linear16Data = new Int16Array(pcmData.length);

    for (let i = 0; i < pcmData.length; i++) {
        linear16Data[i] = Math.max(-1, Math.min(1, pcmData[i])) * 0x7FFF;
    }

    return linear16Data.buffer;
}


async function extractAudioFromFetchedVideo(button, el, domWatchThreadId) {
    button.textContent = 'Waiting...';

    fetch(el.src)
    .then(response => {
      if (response.ok) {
        return response.blob();
      }
      throw new Error('Network response was not ok.');
    })
    .then(async responseBlob => {
        document.body.appendChild(messageDiv);
        const blob = new Blob([responseBlob], { type: 'audio/webm' });
        const blobChunks = [];
        const chunkSize = 25 * 1024 * 1024;
        for (let i = 0; i < blob.size; i += chunkSize)
            blobChunks.push(blob.slice(i, Math.min(i + chunkSize, blob.size)));
        for (const elem of blobChunks) {
            await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const messageResponse = await API.runtime.sendMessage({ greeting: "generateSubtitle", base64data: reader.result }); 
                    appendMessage(messageResponse.subtitle.text);
                    const translateResponse = await API.runtime.sendMessage({ greeting: "translateSubtitle", text: messageResponse.subtitle.text }); 
                    console.log(translateResponse);
                    appendMessage(translateResponse.result);
                    resolve();
                };
                reader.readAsDataURL(elem);
            });
        }
        if (window.location.href.includes("twitter.com")) {
            button.textContent = 'Reload';
        } else {
            button.textContent = 'Ask Subs';
            domWatchObj[domWatchThreadId] = false;
        }
    })
    .catch(error => {
        console.log('Fetch error:', error);
        console.log(el.src);
    });
}

async function extractAudioFromVideo(button, el, destination, source, domWatchThreadId) {
    recorder = new MediaRecorder(destination.stream, { mimeType: 'audio/webm' });
    let chunks = [];

    source.connect(destination);
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.start();
    var recordingStartTime = el.currentTime;
    var currentTime = el.currentTime;
    button.textContent = `${formatTime(el.currentTime)} / ${formatTime(el.duration)}`;
    buttonTimer = setInterval( () => {
        button.textContent = `${formatTime(el.currentTime)} / ${formatTime(el.duration)}`;
        currentTime = el.currentTime;
    }, 1000);

    recorder.onstop = async () => {
        el.pause();
        document.body.appendChild(messageDiv);
        button.textContent = 'Waiting...';
        clearInterval(buttonTimer);

        const blob = new Blob(chunks, { type: 'audio/webm' });
/*
        const blobChunksGoogle = [];
        const chunkSizeGoogle = 10 * 1024 * 1024;
        for (let i = 0; i < blob.size; i += chunkSizeGoogle)
            blobChunksGoogle.push(blob.slice(i, Math.min(i + chunkSizeGoogle, blob.size)));
        for (const elem of blobChunksGoogle) {
            await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    let processed = reader.result;
                    if (reader.result.includes("base64,"))
                        processed = reader.result.split("base64,")[1];
                    const messageResponse = await API.runtime.sendMessage({ greeting: "generateSubtitleUsingGoogleSTT", base64data: processed }); 
                    appendMessage(`${formatTime(recordingStartTime)}-${formatTime(currentTime)}: ${JSON.stringify(messageResponse.subtitle)}`);
                    resolve();
                };
                reader.readAsDataURL(elem);
            });
        }
*/
        const blobChunks = [];
        const chunkSize = 25 * 1024 * 1024;
        for (let i = 0; i < blob.size; i += chunkSize)
            blobChunks.push(blob.slice(i, Math.min(i + chunkSize, blob.size)));
        for (const elem of blobChunks) {
            await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const messageResponse = await API.runtime.sendMessage({ greeting: "generateSubtitle", base64data: reader.result }); 
                    appendMessage(`${formatTime(recordingStartTime)}-${formatTime(currentTime)}: ${messageResponse.subtitle.text}`);
                    const translateResponse = await API.runtime.sendMessage({ greeting: "translateSubtitle", text: messageResponse.subtitle.text }); 
                    console.log(translateResponse);
                    appendMessage(translateResponse.result);
                    resolve();
                };
                reader.readAsDataURL(elem);
            });
        }
        if (window.location.href.includes("twitter.com")) {
            button.textContent = 'Reload';
        } else {
            button.textContent = 'Ask Subs';
            el.load();
            source.disconnect();
            domWatchObj[domWatchThreadId] = false;
        }
    }
}

function generateButton(el) {
    const button = document.createElement('button');
    button.classList.add('generate-subtitle');
    button.textContent = 'Ask Subs';
    button.style.position = 'absolute';
    button.setAttribute('data-src', el.src);

    var domWatchThreadId = Date.now();
    domWatchObj[domWatchThreadId] = true;
    button.id = domWatchThreadId;

    button.addEventListener("click", async () => {
        if (recorder && recorder.state === "recording") {
            recorder.stop();
        } else if (button.textContent !== "Reload" && button.textContent !== "Waiting...") {
            if (el.paused || el.ended) el.play();
            let audioContext = new AudioContext();
            let destination = audioContext.createMediaStreamDestination();
            let source = null;
            try {
                source = audioContext.createMediaElementSource(el);
                console.log("cool"); // sometimes it needs file download but i don't know when yet.
                extractAudioFromVideo(button, el, destination, source, domWatchThreadId);
            } catch (e) { // user clicked even though source.disconnect() was not run.
                window.location.href = window.location.href;
            }
        } else if (button.textContent === "Reload") {
            window.location.href = window.location.href;
        }
        else {
            alert(`Play the video before click.`);
        }
    });
    el.addEventListener("pause", () => {
        if (recorder && recorder.state === "recording")
            recorder.stop();
    });
    el.addEventListener("timeupdate", () => {
        if (recorder && recorder.state === "recording" && el.duration - el.currentTime < 0.3)
            recorder.stop();
    });
    videoObserver.observe(el, { attributes: true, attributeOldValue: true });

    document.body.appendChild(button);
    requestAnimationFrame(function checkPosition() {
        if (button.getAttribute('data-src') !== el.src) { // 현재 버튼의 data-src가 비디오 엘리먼트의 src와 달라진 상황. 일단 업데이트는 해준다.
            button.setAttribute('data-src', el.src);
            console.log(button);
            if (!document.body.contains(button))
                document.body.appendChild(button);
        }

        const button_selected = document.querySelector(`button[data-src='${el.src}']`); // 버튼 중복 검사 후 가장 먼저 발견되는 하나 빼고 다 제거 위함.
        if (!document.body.contains(el) || !domWatchObj[domWatchThreadId] || el.style.top === `-${el.style.height}` || el.offsetWidth == 0 || el.offsetHeight == 0 || button !== button_selected) {
            if (document.body.contains(button)) document.body.removeChild(button);
            if (!domWatchObj[domWatchThreadId]) return;
        } else {
            if (!document.body.contains(button)) document.body.appendChild(button);
            var currentPosition = el.getBoundingClientRect();
            var updatePositionLeft = `${currentPosition.right - button.offsetWidth}px`;
            var updatePositionTop = `${currentPosition.bottom + window.scrollY}px`;
            if (updatePositionLeft !== button.style.left || updatePositionTop !== button.style.top) {
                button.style.left = updatePositionLeft
                button.style.top = updatePositionTop
            }
        }
        new Promise(resolve => setTimeout(resolve, 500)).then(() => {
            requestAnimationFrame(checkPosition);
        });
    });
}

const observer = new MutationObserver((mutationsList, observer) => {
    if (window.location.href !== prevUrl) {
        prevUrl = window.location.href;
        emptyMessageContent();
        if (document.body.contains(messageDiv))
            document.body.removeChild(messageDiv);    
    }
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(el => {
                if (el.nodeName === 'VIDEO') {
                    generateButton(el);
                } else if (el && el.querySelector && el.querySelector("video")) {
                    generateButton(el.querySelector("video"));
                }
            });

            mutation.removedNodes.forEach(node => {
                if (node.nodeName === 'VIDEO') {
                    document.querySelectorAll(`button[data-src='${node.src}']`).forEach(el => {
                        document.body.removeChild(el);
                        domWatchObj[el.id] = false;
                    });
                }
            });
        }
    }    
});

observer.observe(document, { childList: true, subtree: true });

const videoObserver = new MutationObserver((mutationsList, observer) => {
    for(var mutation of mutationsList) {
        if (mutation.type == 'attributes' && mutation.attributeName === 'src') {
            document.querySelectorAll(`button[data-src='${mutation.oldValue}']`).forEach(el => el.setAttribute('data-src', mutation.target.src));
        }
    }
});

google_stt_result_example = {"results":[{
    "alternatives":[{
        "transcript":"people floating raft that I made out of spray foam and then",
        "confidence":0.9005417,
        "words":[
            {"startTime":"0s","endTime":"0.300s","word":"people"},
            {"startTime":"0.300s","endTime":"0.700s","word":"floating"},
            {"startTime":"0.700s","endTime":"1.300s","word":"raft"},
            {"startTime":"1.300s","endTime":"1.400s","word":"that"},
            {"startTime":"1.400s","endTime":"1.500s","word":"I"},
            {"startTime":"1.500s","endTime":"1.800s","word":"made"},
            {"startTime":"1.800s","endTime":"1.800s","word":"out"},
            {"startTime":"1.800s","endTime":"2s","word":"of"},
            {"startTime":"2s","endTime":"2.300s","word":"spray"},
            {"startTime":"2.300s","endTime":"2.600s","word":"foam"},
            {"startTime":"2.600s","endTime":"3.100s","word":"and"},
            {"startTime":"3.100s","endTime":"3.300s","word":"then"}
        ]
    }],
    "resultEndTime":"3.870s","languageCode":"en-us"
},
{"alternatives":[{
    "words":[
        {"startTime":"0s","endTime":"0.300s","word":"people","speakerTag":2,"speakerLabel":"2"},
        {"startTime":"0.300s","endTime":"0.700s","word":"floating","speakerTag":2,"speakerLabel":"2"},
        {"startTime":"0.700s","endTime":"1.300s","word":"raft","speakerTag":2,"speakerLabel":"2"},
        {"startTime":"1.300s","endTime":"1.400s","word":"that","speakerTag":2,"speakerLabel":"2"},
        {"startTime":"1.400s","endTime":"1.500s","word":"I","speakerTag":2,"speakerLabel":"2"},
        {"startTime":"1.500s","endTime":"1.800s","word":"made","speakerTag":2,"speakerLabel":"2"},
        {"startTime":"1.800s","endTime":"1.800s","word":"out","speakerTag":2,"speakerLabel":"2"},
        {"startTime":"1.800s","endTime":"2s","word":"of","speakerTag":2,"speakerLabel":"2"},
        {"startTime":"2s","endTime":"2.300s","word":"spray","speakerTag":2,"speakerLabel":"2"},
        {"startTime":"2.300s","endTime":"2.600s","word":"foam","speakerTag":2,"speakerLabel":"2"},
        {"startTime":"2.600s","endTime":"3.100s","word":"and","speakerTag":1,"speakerLabel":"1"},
        {"startTime":"3.100s","endTime":"3.300s","word":"then","speakerTag":1,"speakerLabel":"1"}
    ]
}]
}],
"totalBilledTime":"4s",
"requestId":"2870577924026578583"
}
