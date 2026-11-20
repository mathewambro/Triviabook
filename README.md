# Triviabook
Assignment 6: Express.js CRUD App

Triviabook is an Express.js API that allows users to retrieve trivia topics, view questions by topic, get random questions, check answers, and add new questions.

Technologies Used:
    Node.js
    Express.js
    PostgreSQL  
    Neon Database
    Render

API Endpoints:
    GET /triviabook/topics – Retrieve all topics
    GET /triviabook/topic/:topic – Retrieve questions by topic
    GET /triviabook/random – Get a random question
    POST /triviabook/answer – Check an answer
    POST /triviabook/question/add – Add a new question

Deployment:
    The application is deployed using Render and uses a Neon PostgreSQL database.

Live API: https://triviabook-6yr7.onrender.com/triviabook/topics