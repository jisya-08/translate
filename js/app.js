const fromLangSelect = document.getElementById('inputLang');
const toLangSelect = document.getElementById('outputLang');

console.log(TRANSLATION_URI)

// Web Speech APIを使用した音声認識
function startRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("お使いのブラウザは音声認識をサポートしていません。");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = fromLangSelect.value;
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = function (event) {
        const text = event.results[0][0].transcript;
        document.getElementById('inputText').value = text;
        const fromLang = fromLangSelect.value;
        const toLang = toLangSelect.value;
        translate(text, fromLang, toLang);
    };

    recognition.onerror = function (event) {
        alert("音声認識に失敗しました: " + event.error);
    };

    recognition.start();
}

// テキスト翻訳
const onTranslate = async () => {
    const text = document.getElementById('inputText').value;
    const fromLang = fromLangSelect.value;
    const toLang = toLangSelect.value;
    const translatedText = await translate(text, fromLang, toLang);

    if (translatedText) {
        const translationHistory = document.getElementById('translationHistory');

        // 自分の発言
        const userItem = document.createElement('li');
        userItem.innerHTML = text;
        translationHistory.appendChild(userItem);

        // 翻訳された発言
        const translatedItem = document.createElement('li');
        translatedItem.innerHTML = `(${translatedText})`;
        translationHistory.appendChild(translatedItem);
    }
}

// 翻訳機能
const translate = async (text, fromLang, toLang) => {
    console.log(text, fromLang, toLang);
    try {
        const response = await fetch(TRANSLATION_URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                origin: text,
                fromLang: fromLang,
                toLang: toLang
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const translatedText = data.translate ? data.translate : "Translation error.";
        document.getElementById('outputText').innerHTML = translatedText;

        // 翻訳結果を読み上げる
        speakText(translatedText, toLangSelect.value);

        return translatedText;
    } catch (error) {
        console.error('Fetch error:', error);
        alert("翻訳に失敗しました。エラー内容：" + error.message);
        return null;
    }
};

// テキストを読み上げる機能
const speakText = (text, lang) => {
    console.log("speak", text, lang)
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; // 翻訳先の言語で読み上げ
    synth.speak(utterance);
};

// 再生ボタンのクリックで読み上げる機能
const playTranslation = () => {
    const translatedText = document.getElementById('outputText').textContent;
    const toLang = toLangSelect.value;
    speakText(translatedText, toLang);
}

// 会話保存機能 (追加実装が必要)
const saveConversation = async () => {
    // 翻訳前のテキスト
    const inputText = document.getElementById('inputText').value;
    const inputLang = fromLangSelect.value;

    // 翻訳後のテキスト
    const translatedText = document.getElementById('outputText').textContent;
    const outputLang = toLangSelect.value;

    if (!inputText || !translatedText) {
        alert("保存する会話がありません。");
        return;
    }

    try {
        const response = await fetch('save_conversation.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input_text: inputText,
                translated_text: translatedText,
                input_lang: inputLang,
                output_lang: outputLang,
            }),
        });

        const result = await response.json();
        if (result.status === 'success') {
            alert("会話が保存されました！");
        } else {
            alert("保存に失敗しました: " + result.message);
        }
    } catch (error) {
        console.error('保存エラー:', error);
        alert("エラーが発生しました。保存できませんでした。");
    }
};
