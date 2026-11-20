
import { pool } from './db.js';

export async function setupDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS topics (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS questions (
      id SERIAL PRIMARY KEY,
      topic_id INTEGER REFERENCES topics(id),
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      difficulty TEXT NOT NULL CHECK (
        difficulty IN ('easy', 'medium', 'hard')
      )
    );
  `);

  await pool.query(`
    INSERT INTO topics (name)
    VALUES ('science'), ('geography')
    ON CONFLICT (name) DO NOTHING;
  `);


  await pool.query(`
    INSERT INTO questions (topic_id, question, answer, difficulty)
    SELECT t.id, q.question, q.answer, q.difficulty
    FROM topics t
    CROSS JOIN (
      VALUES
        ('science', 'What planet is known as the Red Planet?', 'Mars', 'easy'),
        ('science', 'What is the chemical symbol for gold?', 'Au', 'medium'),
        ('science', 'What is the powerhouse of the cell?', 'Mitochondria', 'easy'),
        ('geography', 'What is the capital of Australia?', 'Canberra', 'medium'),
        ('geography', 'Which river flows through Cairo?', 'The Nile', 'easy')
    ) AS q(topic, question, answer, difficulty)
    WHERE t.name = q.topic
    AND NOT EXISTS (
      SELECT 1
      FROM questions existing
      WHERE existing.topic_id = t.id
      AND existing.question = q.question
    );
  `);

  console.log('Seed data added successfully!');
  console.log('Database tables created successfully!');

}
