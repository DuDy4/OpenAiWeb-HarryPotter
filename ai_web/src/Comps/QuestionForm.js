import React, {useContext} from 'react';
import axios from 'axios';
import {ConversationContext} from "../Providers/ConversationProvider";


const ChatWindow = () => {
    const {addConversation, conversation, characterIntro} = useContext(ConversationContext)

    const apiKey = process.env.REACT_APP_API_KEY;

    const prepareMessage = (newQuestion) => {
        const message = [];
        if (characterIntro){
            message.push({ role: 'user', content: characterIntro.question },
                { role: 'assistant', content: characterIntro.answer });
        }
        conversation.forEach((msg) => {
            message.push({ role: 'user', content: msg.question }, { role: 'assistant', content: msg.answer })
        })
        message.push({role: "user", content: newQuestion})
        return message;
    }

    const sendQuestion = async (question) => {
        try {
            console.log(question)
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo', // Or any other model you prefer
                    messages: prepareMessage(question),
                    temperature: 0.7
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
            await addConversation({question: question, answer: answer})
            console.log(conversation)

        } catch (error) {
            console.error('Error fetching response:', error);
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
        }
        // reset()
    };

    return (
        <div className="chatWindow">
            <textarea
                    placeholder="Type a message..."
                    onKeyDown={(e) => {
                        if (!(e.shiftKey && e.key === 'Enter') && e.key === 'Enter') {
                            sendQuestion(e.target.value);
                            e.target.value = '';
                        }
                    }}/>
            <br/>
        </div>
    );
};

export default ChatWindow;
