import { Router } from 'express';
import {
    getQuestions,
    getRandom,
    answerQuestion,
    createQuestion
} from '../controllers/questionController.js';

const router = Router();

router.get('/random', getRandom);
router.get('/:topic', getQuestions);

router.post('/answer', answerQuestion);
router.post('/question/add', createQuestion);

export default router;