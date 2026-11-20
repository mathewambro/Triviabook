
import { pool } from './db.js';

export async function getAllTopics() {
    const result = await pool.query('SELECT * FROM topics ORDER BY id');
    return result.rows;
}
