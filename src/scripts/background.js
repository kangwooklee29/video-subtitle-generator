let API = (navigator.userAgent.indexOf("Firefox") != -1) ? browser : chrome;
let user_lang = navigator.language || navigator.userLanguage;
user_lang = user_lang.split('-')[0];

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

async function generateSubtitle(file) {
    let api_url = "https://api.openai.com/v1/audio/transcriptions";
    const items = await API.storage.sync.get(["openai_api_key"]);
    console.log(file)

    var formData = new FormData();
    formData.append('model', 'whisper-1');
    formData.append('file', file);

    const abortController = new AbortController();
    const param = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${items.openai_api_key}`
        },
        body: formData,
        signal: abortController.signal
    };
    let error_global;
    for (let i = 0; i < 5; i++) {
        try {
            const response = await fetch(api_url, param);
            if (response.ok)
                return await response.json();
            throw new Error(response.status);
        } catch (error) {
            error_global = error;
            console.log(error.message);
        }
    }
    console.log(error_global.message);
    return {text: ""};
}

async function generateSubtitleUsingGoogleSTT(base64Data) {
    const requestBody = {
        config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 44100,
            enableWordTimeOffsets: true,
            languageCode: 'en-US',
            diarizationConfig: {
                enableSpeakerDiarization: true
            }
        },
        audio: {
            content: base64Data
        }
    };

    const items = await API.storage.sync.get(["google_api_key"]);
    const response = await fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${items.google_api_key}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
}

async function chatgptApi(messages, model) {
    let api_url = "https://api.openai.com/v1/chat/completions";
    const items = await API.storage.sync.get(["openai_api_key"]);
    const abortController = new AbortController();
    const param = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${items.openai_api_key}`,
            "type": "json_object"
        },
        body: JSON.stringify({model, messages}),
        signal: abortController.signal
    };
    let error_global;
    for (let i = 0; i < 5; i++) {
        try {
            const response = await fetch(api_url, param);
            if (response.ok)
                return await response.json();
            throw new Error(response.status);
        } catch (error) {
            error_global = error;
            console.log(error.message);
        }
    }
    console.log(error_global.message);
    return {text: ""};
}

function findPropertyValue(jsonString, propertyName="translated_result") {
    var match = new RegExp('"' + propertyName + '"\\s*:\\s*"([^"]*)"').exec(jsonString);
    return match ? match[1] : "";
}

API.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    if (request.greeting === "generateSubtitle") {
        (async base64data => {
            const res = await fetch(base64data);
            const blob = await res.blob();
            const subtitle = await generateSubtitle(new File([blob], "audio.webm", { type: "audio/webm;" }));
            sendResponse({ farewell: true, subtitle });
        })(request.base64data);
    }
    if (request.greeting === "generateSubtitleUsingGoogleSTT") {
        (async base64data => {
            const subtitle = await generateSubtitleUsingGoogleSTT(base64data);
            sendResponse({ farewell: true, subtitle });
        })(request.base64data);
    }
    if (request.greeting === "translateSubtitle") {
        (async text => {
            const items = await API.storage.sync.get(["targetLanguage"]);
            const targetLanguage = items.targetLanguage ? items.targetLanguage : user_lang;
            let prompt = [{role: "user", content: ""}];
            prompt.push({role: "user", content: `Text: "${text}" // Translate this text into ${languageDict[targetLanguage].English} and write the result to a JSON message which has a single attribute named 'translated_result'. If it is already translated, return an empty message.`});
            const response = await chatgptApi(prompt, "gpt-3.5-turbo-1106");
            const result = response.choices ? findPropertyValue(response.choices[0].message.content) : "Couldn't get the result.";
            sendResponse({ farewell: true, result });
        })(request.text);
    }
    return true;
});
