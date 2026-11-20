import {
    getQuestionsByTopic,
    getRandomQuestion,
    checkAnswer,
    addQuestion
} from '../models/questionModel.js';

export async function getQuestions(req, res) {
    try {
        const topic = req.params.topic;
        const questions = await getQuestionsByTopic(topic);

        res.json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve questions' });
    }
}

export async function getRandom(req, res) {
    try {
        const question = await getRandomQuestion();

        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve random question' });
    }
}

export async function answerQuestion(req, res) {
    try {
        const { questionId, answer } = req.body;

        const isCorrect = await checkAnswer(questionId, answer);

        if (isCorrect === null) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json({ correct: isCorrect });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to check answer' });
    }
}

export async function createQuestion(req, res) {
    try {
        const { topic, question, answer, difficulty } = req.body;

        const newQuestion = await addQuestion(
            topic,
            question,
            answer,
            difficulty
        );

        if (!newQuestion) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        res.status(201).json(newQuestion);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add question' });
    }
}