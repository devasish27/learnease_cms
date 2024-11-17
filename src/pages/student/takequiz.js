import React, { useState, useEffect } from "react";
import { Button, Card, Box, Typography } from "@mui/material";
import axios from "axios";

const TakeQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(null);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        const response = await axios.get("/quizzes");
        setQuizzes(response.data);
    };

    const handleStartQuiz = (quiz) => {
        setCurrentQuiz(quiz);
        setAnswers(Array(quiz.question.length).fill(null));
    };

    const submitQuiz = async () => {
        const calculatedScore = answers.reduce((acc, answer, idx) => {
            return acc + (answer === currentQuiz.question[idx].correctOption ? 1 : 0);
        }, 0);
        setScore(calculatedScore);
        await axios.post("/submit-quiz", {
            studentId: 1, // Replace with actual logged-in student ID
            quizId: currentQuiz.id,
            score: calculatedScore,
        });
    };

    return (
        <Box p={3}>
            {currentQuiz ? (
                <Box>
                    <Typography variant="h5">{currentQuiz.test_name}</Typography>
                    {currentQuiz.question.map((q, idx) => (
                        <Box key={idx} mb={2}>
                            <Typography>{q.question}</Typography>
                            {q.options.map((opt, optIdx) => (
                                <Button
                                    key={optIdx}
                                    variant={answers[idx] === optIdx ? "contained" : "outlined"}
                                    onClick={() => {
                                        const updatedAnswers = [...answers];
                                        updatedAnswers[idx] = optIdx;
                                        setAnswers(updatedAnswers);
                                    }}
                                >
                                    {opt}
                                </Button>
                            ))}
                        </Box>
                    ))}
                    <Button variant="contained" onClick={submitQuiz}>
                        Submit
                    </Button>
                    {score !== null && <Typography>Your Score: {score}</Typography>}
                </Box>
            ) : (
                <Box>
                    <Typography variant="h6">Available Quizzes</Typography>
                    {quizzes.map((quiz) => (
                        <Card key={quiz.id} onClick={() => handleStartQuiz(quiz)} style={{ margin: "10px" }}>
                            <Box p={2}>
                                <Typography>{quiz.test_name}</Typography>
                            </Box>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default TakeQuiz;