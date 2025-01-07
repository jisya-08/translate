CREATE TABLE conversation_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    input_text TEXT NOT NULL,
    translated_text TEXT NOT NULL,
    input_lang VARCHAR(10) NOT NULL,
    output_lang VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

