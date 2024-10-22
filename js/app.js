const fromLangSelect = document.getElementById('inputLang');
const toLangSelect = document.getElementById('outputLang');

// Web Speech APIを使用した音声認識
function startRecognition() {
    // ブラウザがWeb Speech APIをサポートしているか確認
    if (!('webkitSpeechRecognition' in window)) {
        alert("お使いのブラウザは音声認識をサポートしていません。");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = fromLangSelect.value; // 入力言語を選択
    recognition.interimResults = false;
    recognition.continuous = false;

    // 音声認識結果を取得
    recognition.onresult = function (event) {
        const text = event.results[0][0].transcript;
        document.getElementById('inputText').textContent = text; // 取得した音声テキストを表示

        // 翻訳
        const fromLang = fromLangSelect.value
        const toLang = toLangSelect.value
        translate(text, fromLang, toLang);
    };

    recognition.onerror = function (event) {
        alert("音声認識に失敗しました: " + event.error);
    };

    recognition.start(); // 音声認識開始
}

/**
 * 翻訳機能
 * api/ai_translate.php に、翻訳前のテキスト、翻訳前の言語、翻訳後の言語を送信して
 * 翻訳されたテキストを取得し、ブラウザに表示
 * */ 
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
        document.getElementById('outputText').innerHTML = data.translate ? data.translate : "Translation error.";
    } catch (error) {
        console.error('Fetch error:', error);
        alert("翻訳に失敗しました。エラー内容：" + error.message);
    }
};
