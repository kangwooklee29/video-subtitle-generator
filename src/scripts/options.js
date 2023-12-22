import { languageDict } from './common.js';

const API = (typeof browser === "undefined") ? chrome : browser;
let user_lang = navigator.language || navigator.userLanguage;
user_lang = user_lang.split('-')[0];

// Restore options from storage
async function restoreOptions() {
    const items = await API.storage.sync.get(null);
    if (items.openai_api_key)
        document.querySelector("#openai_api_key").value = items.openai_api_key;

    document.querySelector("#target_language").value = items.targetLanguage ? items.targetLanguage : user_lang;
}

// Initialize event listeners
function initializeEventListeners() {
    document.addEventListener('click', e => {
        if (e.target === document.querySelector("#openai_api_key_button"))
            API.storage.sync.set({ openai_api_key: document.querySelector("#openai_api_key").value });
    });
    document.querySelector("#target_language").addEventListener("change", e => {
        API.storage.sync.set({ targetLanguage: e.target.value });
    });
}

// Set internationalization text content
function setI18nText() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = API.i18n.getMessage(el.getAttribute('data-i18n'));
    });
}

// Initialization on content loaded
document.addEventListener('DOMContentLoaded', () => {
    const targetLangElem = document.getElementById('target_language');

    for (const [key, value] of Object.entries(languageDict)) {
        const targetLangOption = document.createElement('option');

        targetLangOption.value = key;
        targetLangOption.text = `${value.Native} (${value.English})`;

        targetLangElem.appendChild(targetLangOption);
    }

    restoreOptions();
    setI18nText();
    initializeEventListeners();
});
