import { getAllTopics } from '../models/topicModel.js';

export async function getTopics(req, res) {
    try {
        const topics = await getAllTopics();
        res.json(topics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve topics' });
    }
}