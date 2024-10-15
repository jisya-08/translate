// Web Speech APIを使用した音声認識の設定
function startRecognition() {
    // ブラウザがWeb Speech APIをサポートしているか確認
    if (!('webkitSpeechRecognition' in window)) {
        alert("お使いのブラウザは音声認識をサポートしていません。");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = document.getElementById("inputLang").value; // 入力言語を選択
    recognition.interimResults = false;
    recognition.continuous = false;

    // 音声認識結果を取得
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('inputText').textContent = transcript; // 取得した音声テキストを表示

        // ここで、翻訳機能などに transcript を渡すことも可能
        // 例: translateText(transcript);
    };

    recognition.onerror = function(event) {
        alert("音声認識に失敗しました: " + event.error);
    };

    recognition.start(); // 音声認識開始
}
