<?php
// データベース接続情報
$host = 'localhost';
$dbname = 'translate';
$user = 'root';
$password = ''; // 適切なパスワードを入力してください

try {
    // PDOでデータベース接続
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // データ取得クエリ
    $stmt = $pdo->query("SELECT id, input_lang, input_text, output_lang, translated_text FROM conversation_history ORDER BY created_at DESC");
    $conversations = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("データベース接続に失敗しました: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>会話履歴</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 class="text-2xl font-bold text-center text-blue-500 mb-6">会話履歴</h1>

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
                    <?php if (empty($conversations)): ?>
                        <tr>
                            <td colspan="5" class="border px-4 py-2 text-center text-gray-500">履歴がありません</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($conversations as $conversation): ?>
                            <tr>
                                <td class="border px-4 py-2 text-center"><?= htmlspecialchars($conversation['id']) ?></td>
                                <td class="border px-4 py-2"><?= htmlspecialchars($conversation['input_lang']) ?></td>
                                <td class="border px-4 py-2"><?= htmlspecialchars($conversation['input_text']) ?></td>
                                <td class="border px-4 py-2"><?= htmlspecialchars($conversation['output_lang']) ?></td>
                                <td class="border px-4 py-2"><?= htmlspecialchars($conversation['translated_text']) ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>

        <div class="mt-6">
            <a href="index.php" class="block text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">アプリに戻る</a>
        </div>
    </div>
</body>
</html>
