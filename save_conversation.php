<?php
require 'config.php'; // データベース接続設定を読み込む

// POSTリクエストを受け取る
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // JSONデータを取得
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // 必要なフィールドが存在するか確認
    if (isset($data['input_text'], $data['translated_text'], $data['input_lang'], $data['output_lang'])) {
        $inputText = $data['input_text'];
        $translatedText = $data['translated_text'];
        $inputLang = $data['input_lang'];
        $outputLang = $data['output_lang'];

        // データベースに保存
        try {
            $stmt = $pdo->prepare("
                INSERT INTO conversation_history (input_text, translated_text, input_lang, output_lang)
                VALUES (:input_text, :translated_text, :input_lang, :output_lang)
            ");
            $stmt->execute([
                ':input_text' => $inputText,
                ':translated_text' => $translatedText,
                ':input_lang' => $inputLang,
                ':output_lang' => $outputLang,
            ]);
            echo json_encode(['status' => 'success']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}
?>
