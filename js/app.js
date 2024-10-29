const fromLangSelect = document.getElementById('inputLang');
const toLangSelect = document.getElementById('outputLang');

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
    console.log(text, fromLang, toLang)
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
        return translatedText;
    } catch (error) {
        console.error('Fetch error:', error);
        alert("翻訳に失敗しました。エラー内容：" + error.message);
        return null;
    }
};

// 会話保存機能 (追加実装が必要)
const saveConversation = () => {
    alert("会話が保存されました！（保存機能はサーバー側での実装が必要です）");
}
