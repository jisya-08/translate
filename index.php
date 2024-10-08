<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>音声会話翻訳アプリ</title>
    <!-- Tailwind CSSのリンクを追加 -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 class="text-2xl font-bold text-center text-blue-500 mb-6">音声会話翻訳アプリ</h1>

        <!-- 言語選択ボックス -->
        <div class="flex justify-between mb-4">
            <div class="w-1/2 pr-2">
                <label for="inputLang" class="block text-gray-700 font-bold mb-2">入力言語</label>
                <select id="inputLang" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="ja">日本語</option>
                    <option value="en">英語</option>
                    <option value="zh-CN">中国語（簡体字）</option>
                    <option value="zh-TW">中国語（繁体字）</option>
                    <option value="ko">韓国語</option>
                    <option value="vi">ベトナム語</option>
                    <option value="th">タイ語</option>
                    <option value="ms">マレー語</option>
                    <option value="id">インドネシア語</option>
                    <option value="hi">ヒンディー語</option>
                    <option value="bn">ベンガル語</option>
                    <option value="ta">タミル語</option>
                    <option value="ur">ウルドゥー語</option>
                </select>
            </div>
            <div class="w-1/2 pl-2">
                <label for="outputLang" class="block text-gray-700 font-bold mb-2">翻訳先言語</label>
                <select id="outputLang" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="en">英語</option>
                    <option value="ja">日本語</option>
                    <option value="zh-CN">中国語（簡体字）</option>
                    <option value="zh-TW">中国語（繁体字）</option>
                    <option value="ko">韓国語</option>
                    <option value="vi">ベトナム語</option>
                    <option value="th">タイ語</option>
                    <option value="ms">マレー語</option>
                    <option value="id">インドネシア語</option>
                    <option value="hi">ヒンディー語</option>
                    <option value="bn">ベンガル語</option>
                    <option value="ta">タミル語</option>
                    <option value="ur">ウルドゥー語</option>
                </select>
            </div>
        </div>

        <!-- 音声入力ボタン -->
        <button class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-4" onclick="startRecognition()">
            音声入力開始
        </button>

        <!-- 入力テキストボックス -->
        <div class="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4">
            <p id="inputText" class="text-gray-600">ここに音声が表示されます</p>
        </div>
        
        <!-- 翻訳結果ボックス -->
        <div class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <p id="outputText" class="text-gray-600">翻訳結果がここに表示されます</p>
        </div>
    </div>

    <script src="js/app.js"></script>
</body>
</html>
