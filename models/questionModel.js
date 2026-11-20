import { pool } from './db.js';

export async function getQuestionsByTopic(topic) {
    const result = await pool.query(
        `SELECT questions.*
         FROM questions
         JOIN topics ON questions.topic_id = topics.id
         WHERE topics.name = $1
         ORDER BY questions.id`,
        [topic]
    );

    return result.rows;
}

export async function getRandomQuestion() {
    const result = await pool.query(
        'SELECT * FROM questions ORDER BY RANDOM() LIMIT 1'
    );

    return result.rows[0];
}

export async function checkAnswer(questionId, answer) {
    const result = await pool.query(
        'SELECT answer FROM questions WHERE id = $1',
        [questionId]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0].answer.toLowerCase() === answer.toLowerCase();
}

export async function addQuestion(topic, question, answer, difficulty) {
    const result = await pool.query(
        `INSERT INTO questions (topic_id, question, answer, difficulty)
         SELECT id, $2, $3, $4
         FROM topics
         WHERE name = $1
         RETURNING *`,
        [topic, question, answer, difficulty]
    );

    return result.rows[0];
}