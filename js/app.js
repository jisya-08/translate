// 音声入力と翻訳処理をシミュレーション
function startRecognition() {
    const inputLang = document.getElementById('inputLang').value;
    const outputLang = document.getElementById('outputLang').value;

    // 音声入力のシミュレーション
    const inputText = "これは音声入力のテストです"; // 仮の音声入力データ
    document.getElementById('inputText').textContent = inputText;

    // 翻訳処理のシミュレーション
    const outputText = "This is a test of voice input"; // 仮の翻訳データ
    document.getElementById('outputText').textContent = outputText;

    // 履歴を保存
    saveHistory(inputText, outputText);
}

// 会話履歴をローカルストレージに保存
function saveHistory(inputText, outputText) {
    const history = JSON.parse(localStorage.getItem('conversationHistory')) || [];
    history.push({ input: inputText, output: outputText });
    localStorage.setItem('conversationHistory', JSON.stringify(history));
    renderHistory();
}

// 保存された会話履歴を表示
function renderHistory() {
    const history = JSON.parse(localStorage.getItem('conversationHistory')) || [];
    const historyList = document.getElementById('history');
    historyList.innerHTML = '';
    
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `入力: ${item.input} | 翻訳: ${item.output}`;
        historyList.appendChild(li);
    });
}

// ページ読み込み時に履歴を表示
window.onload = function() {
    renderHistory();
};
