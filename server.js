
import topicsRouter from './routes/topics.js';
import questionsRouter from './routes/questions.js';
import express from 'express';
import { setupDatabase } from './models/setup.js';

const app = express();

await setupDatabase();

app.use(express.json());

app.use('/triviabook/topics', topicsRouter);
app.use('/triviabook/topic', questionsRouter);
app.use('/triviabook', questionsRouter);

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
