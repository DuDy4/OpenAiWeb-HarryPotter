import React, { useState } from 'react';
import axios from 'axios';
import {useForm} from "react-hook-form";


const ChatWindow = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const { register, handleSubmit, formState, reset } = useForm();

    const apiKey = process.env.REACT_APP_API_KEY;
    const handleChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleQuestion = async (data) => {
        const prompt = data.question
        console.log(prompt);
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo', // Or any other model you prefer
                    messages: [{"role": "user", "content": `${prompt}`}],
                    temperature: 0.7
                    // prompt: question,
                    // max_tokens: 150
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + apiKey
                    }
                }
            );
            console.log(response.data)
            setResponse(response.data.choices[0].message.content.trim());
            console.log(response)
        } catch (error) {
            console.error('Error fetching response:', error);
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
        }
    };

    return (
        <div className="chat-window">
            <form onSubmit={handleSubmit(handleQuestion)}>
                <input
                    type="text"
                    id="question"
                    placeholder="Ask a question..."
                    {...register("question")}
                />
                <button type="submit">Ask</button>
            </form>
            {response && <div className="response">{response}</div>}
        </div>
    );
};

export default ChatWindow;
