import React, {useContext} from 'react';
import axios from 'axios';
import {useForm} from "react-hook-form";
import {ConversationContext} from "../Providers/ConversationProvider";


const ChatWindow = () => {
    const { register, handleSubmit, reset } = useForm();
    const {addConversation, conversation} = useContext(ConversationContext)

    const apiKey = process.env.REACT_APP_API_KEY;

    const prepareMessage = (newQuestion) => {
        const message = [];
        conversation.forEach((msg) => {
            message.push({ role: 'user', content: msg.question }, { role: 'assistant', content: msg.answer })
        })
        message.push({role: "user", content: newQuestion})
        return message;
    }

    const handleQuestion = async (data) => {
        const prompt = data.question
        // console.log(prompt);
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo', // Or any other model you prefer
                    messages: prepareMessage(prompt),
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
            // console.log(response.data)
            const answer = response.data.choices[0].message.content.trim()
            await addConversation({question: prompt, answer: answer})
            console.log(conversation)
            // console.log(response)

        } catch (error) {
            console.error('Error fetching response:', error);
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
        }
        reset()
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
            <br/>
            {/*{response && <div className="response">Answer: {response}</div>}*/}
        </div>
    );
};

export default ChatWindow;
