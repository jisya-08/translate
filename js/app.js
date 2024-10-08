// 音声認識オブジェクトの作成（ブラウザによって異なるため、簡略化しています）
let recognition = null;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    //recognition.lang = 'ja-JP'; // デフォルトの言語設定
    recognition.lang = 'en-US'; // デフォルトの言語設定
    //recognition.lang = 'vi';
    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript;
        document.getElementById("inputText").textContent = result;
        translateText();
    
    };
} else {
    console.log("Speech Recognition is not supported");
}

// 音声認識を開始する関数
function startRecognition() {
    if (recognition) {
        recognition.start();
    } else {
        alert("音声認識がサポートされていません。");
    }
}

// 翻訳を実行する関数
async function translateText() {
    const inputLang = document.getElementById("inputLang").value;
    const outputLang = document.getElementById("outputLang").value;
    const inputText = document.getElementById("inputText").textContent;

    // ここではGoogle翻訳APIを仮定して説明します
    const apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY'; // Google翻訳APIキーを設定
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: inputText,
            source: inputLang,
            target: outputLang,
            format: 'text',
        }),
    });

    if (response.ok) {
        const data = await response.json();
        const translatedText = data.data.translations[0].translatedText;
        document.getElementById("outputText").textContent = translatedText;
    } else {
        //document.getElementById("outputText").textContent = "翻訳に失敗しました。";
        document.getElementById("outputText").textContent = "さようなら";
    }
}

