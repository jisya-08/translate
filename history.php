<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>会話履歴</title>
    <!-- Tailwind CSSのリンクを追加 -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 class="text-2xl font-bold text-center text-blue-500 mb-6">会話履歴</h1>

        <!-- 会話履歴表示 -->
        <div class="overflow-y-auto max-h-96">
            <table class="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th class="px-4 py-2 border text-gray-600">#</th>
                        <th class="px-4 py-2 border text-gray-600">入力言語</th>
                        <th class="px-4 py-2 border text-gray-600">入力テキスト</th>
                        <th class="px-4 py-2 border text-gray-600">翻訳先言語</th>
                        <th class="px-4 py-2 border text-gray-600">翻訳結果</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        // サンプルデータ（通常はデータベースから取得します）
                        $conversations = [
                            ['inputLang' => '日本語', 'inputText' => 'こんにちは', 'outputLang' => '英語', 'outputText' => 'Hello'],
                            ['inputLang' => '英語', 'inputText' => 'How are you?', 'outputLang' => '日本語', 'outputText' => 'お元気ですか？'],
                            ['inputLang' => '中国語（簡体字）', 'inputText' => '你好', 'outputLang' => '日本語', 'outputText' => 'こんにちは'],
                            // 他の履歴をここに追加
                        ];

                        // 履歴をテーブルで表示
                        foreach ($conversations as $index => $conversation) {
                            echo "<tr>";
                            echo "<td class='border px-4 py-2 text-center'>".($index + 1)."</td>";
                            echo "<td class='border px-4 py-2'>{$conversation['inputLang']}</td>";
                            echo "<td class='border px-4 py-2'>{$conversation['inputText']}</td>";
                            echo "<td class='border px-4 py-2'>{$conversation['outputLang']}</td>";
                            echo "<td class='border px-4 py-2'>{$conversation['outputText']}</td>";
                            echo "</tr>";
                        }
                    ?>
                </tbody>
            </table>
        </div>

        <!-- 戻るボタン -->
        <div class="mt-6">
            <a href="index.php" class="block text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">アプリに戻る</a>
        </div>
    </div>
</body>
</html>
