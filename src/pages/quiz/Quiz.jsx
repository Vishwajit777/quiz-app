import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const Quiz = () => {
    const [questionNumber, setQuestionNumber] = useState(1)
    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState();
    const [option, setOption] = useState([])

    useEffect(() => {
        axios.get('https://opentdb.com/api.php?amount=20').then((res) => {
            setQuestions(res.data.results)
            setQuestion(res.data.results[0]?.question)
            setOption([...res.data.results[0]?.incorrect_answers, res.data.results[0]?.correct_answer])
        })

    }, [])

    useEffect(() => {
        questions.length > 0 && setOption([...questions[questionNumber]?.incorrect_answers, questions[questionNumber]?.correct_answer])
    }, [questions])

    const [options, setOptions] = useState({
        selectedOptions: [],
    });

    const handelNextQuestion = () => {
        setQuestionNumber((questionNumber) => questionNumber + 1)
        setOptions({ selectedOptions: [] })
        setOption([...questions[questionNumber]?.incorrect_answers, questions[questionNumber]?.correct_answer])
        setQuestion(questions[questionNumber]?.question)
    }

    const handelPrevQuestion = () => {
        setQuestionNumber((prev) => prev - 1)
        setQuestion(questions[questionNumber]?.question)
        setOption([...questions[questionNumber]?.incorrect_answers, questions[questionNumber]?.correct_answer])
    }

    const handleChange = (selected, correct, number) => {
        setSelectedAnswer(selected)
    }

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: '30px' }}>
                <b>
                    Question
                </b>
            </div>


            <div>
                <span style={{ textAlign: "start " }}> {questionNumber}/{questions.length}


                    {" "}</span>
                {question}
            </div>


            {option.length > 0 && (
                option.sort(() => Math.random() - 0.5).map((option, index) => {
                    return (
                        <button style={selectedAnswer === option ? { margin: '20px', background: "green" } : { margin: '20px', }}
                            onClick={(e) => handleChange(option, questions[questionNumber]?.correct_answer, questionNumber)}>{option}</button>
                    )
                })
            )}
            <div>
                <button
                    disabled={questionNumber + 1 === questions.length}
                    onClick={() => { handelNextQuestion() }}>Next Question</button>{" "}

                <button disabled={questionNumber < 1} onClick={() => { handelPrevQuestion() }}>Prev Question</button></div>

        </div>
    )
}

export default Quiz