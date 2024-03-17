    import {createContext, useEffect, useState} from "react";
    import axios from "axios";

    export const ConversationContext = createContext(null);

    export function ConversationProvider({children}) {
        const [conversation, setConversation] = useState([]);
        const [character, setCharacter] = useState('');
        const [characterIntro, setCharacterIntro] = useState(undefined);

        const apiKey = process.env.REACT_APP_API_KEY;


        const characterResponse = {
            "Hagrid": "Ah, hello there, me friend! It's Hagrid here, keeper of keys and grounds and  Care of Magical Creatures professor " +
                "at Hogwarts School of Witchcraft and Wizardry. What can I do for ya today, eh?",
            "Dumbledore": "Oh, Hello there. It is a pleasure to chat with you today." +
                " How may I assist you in your magical endeavors?",
            "Dobby": "Oh, Dobby has never been asked to sit down and talk with a wizard — like an equal.\n" +
                "What can Dobby do for you, good sir/madam?"
        }

        useEffect(() => {
            console.log(conversation)
        }, [conversation]);

        const addConversation = (questionAndAnswer) => {
            setConversation(prevConversation => [...prevConversation, questionAndAnswer]);
            console.log(questionAndAnswer, conversation);
        }

        const updateLastConversation = (newConversation) => {
            setConversation(prevConversation => {
                const updatedConversation = [...prevConversation];
                updatedConversation.pop(); // Remove the last conversation
                updatedConversation.push(newConversation); // Add the new conversation
                return updatedConversation;
            });
        };

        const cleanConversation = () => {
            setConversation([]);
        }

        const handleCharacter = (character) => {
            setCharacter(character)
        }

        const handleCharacterIntro = (intro) => {
            setCharacterIntro(intro);
        }

        const prepareMessage = (newQuestion) => {
            const message = [];
            if (characterIntro){
                message.push({ role: 'user', content: characterIntro.question },
                    { role: 'assistant', content: characterIntro.answer });
            }
            conversation.forEach((msg) => {
                console.log(msg);
                message.push({ role: 'user', content: msg.question },{ role: 'assistant', content: msg.answer });
            })
            message.push({role: "user", content: newQuestion})
            return message;
        }

        const sendQuestion = async (question) => {
            try {
                const msg = prepareMessage(question);
                await addConversation({question: question, answer: ''});
                const response = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        model: 'gpt-3.5-turbo', // Or any other model you prefer
                        messages: msg,
                        temperature: 0.7
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + apiKey
                        }
                    }
                );
                const answer = await response.data.choices[0].message.content.trim()
                console.log(answer);
                updateLastConversation({question: question, answer: answer});

            } catch (error) {
                console.error('Error fetching response:', error);
                console.log('Response data:', error.response.data);
                console.log('Response status:', error.response.status);
                console.log('Response headers:', error.response.headers);
            }
            // reset()
        };

        const value ={conversation, sendQuestion,
            cleanConversation, character, handleCharacter, characterIntro,
            handleCharacterIntro, characterResponse}

        return (
            <ConversationContext.Provider value={value}>
                {children}
            </ConversationContext.Provider>
        )

    }