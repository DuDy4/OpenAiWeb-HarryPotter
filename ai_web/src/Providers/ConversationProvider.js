    import {createContext, useState} from "react";
    import axios from "axios";

    /**
     * This is the conversation provider.
     * all communication with OpenAi's API is going through here, and saved to Context.
     *
     * The messages to the API are built with two elements:
     * 1. characterIntro: {question, answer} object that contain the very first prompt
     * that asked the Chat to talk as if he is the character - and the first answer I want from him.
     * 2. conversation: [{question, answer}, {question, answer}...] Array contains all object of
     * questions and answers.
     *
     *
     */

    export const ConversationContext = createContext(null);

    export function ConversationProvider({children}) {
        //character state is used in the message to the API, as well as to control the
        //components of page "Conversation"
        const [character, setCharacter] = useState('');

        //This is a state that accompany the conversation after choosing a character.
        //It contains the first question and first answer that will to the API everytime.
        const [characterIntro, setCharacterIntro] = useState(undefined);
        const [conversation, setConversation] = useState([]);

        const apiKey = process.env.REACT_APP_API_KEY;

        //This object contains the first answer of each character - depending on the character (key).
        //This will be saved to CharacterIntro.answer (in startCharacter() in ChooseACharacter component)
        const characterResponse = {
            "Hagrid": "Ah, hello there, me friend! It's Hagrid here, keeper of keys and grounds and  Care of Magical Creatures professor " +
                "at Hogwarts School of Witchcraft and Wizardry. What can I do for ya today, eh?",
            "Dumbledore": "Oh, Hello there. It is a pleasure to chat with you today." +
                " How may I assist you in your magical endeavors?",
            "Dobby": "Oh, Dobby has never been asked to sit down and talk with a wizard — like an equal.\n" +
                "What can Dobby do for you, good sir/madam?"
        }

        const addConversation = (questionAndAnswer) => {
            setConversation(prevConversation => [...prevConversation, questionAndAnswer]);
        }

        const cleanConversation = () => {
            setConversation([]);
        }

        const handleCharacter = (character) => {
            setCharacter(character)
        }

        const handleCharacterIntro = (intro) => {
            setCharacterIntro(intro);
        }

        /**
         * This is a "Functional Update",
         * that removes the last conversation and adds the new one.
         *
         * The last conversation in this case is an object with only question (from user input-textarea)
         * and then we replace it with an object contain the same question, and it's answer.
         *
         * @param newQuestionAndAnswer - {question, answer}
         */
        const updateLastConversation = (newQuestionAndAnswer) => {
            setConversation(prevConversation => {
                const updatedConversation = [...prevConversation];
                updatedConversation.pop(); // Remove the conversation with the empty answer.
                updatedConversation.push(newQuestionAndAnswer); // Add the new conversation (question and answer)
                return updatedConversation;
            });
        };

        /**
         * This function prepare a message array that will be sent to the API,
         * containing all history needed for it to conclude an answer.
         *
         * The content will be somewhat like this:
         * [{characterIntro}, {question, answer}, {question, answer}, ...]
         * (*characterIntro is itself: {question: answer})
         *
         * @param newQuestion
         * @returns {[{question, answer}]}
         */
        const prepareMessage = (newQuestion) => {
            const message = [];
            if (characterIntro){
                message.push({ role: 'user', content: characterIntro.question },
                    { role: 'assistant', content: characterIntro.answer });
            }
            conversation.forEach((msg) => {
                message.push({ role: 'user', content: msg.question },{ role: 'assistant', content: msg.answer });
            })
            message.push({role: "user", content: newQuestion})
            return message;
        }


        const sendQuestion = async (question) => {
            try {
                //Building the msg with all previous messages
                const msg = prepareMessage(question);

                //This will temporarily add the question to the conversation, with no answer.
                //This will be shown in the conversation page (QuestionAndAnswer component)
                //as soon as the input was sent, and add "loading" animation until
                //the response arrive
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

                //This will replace the {question: question, answer: ''} object with
                //{question: question, answer: answer}, replacing the "loading" animation
                //with the answer from the API
                updateLastConversation({question: question, answer: answer});

            } catch (error) {
                console.error('Error fetching response:', error);
                console.log('Response data:', error.response.data);
                console.log('Response status:', error.response.status);
                console.log('Response headers:', error.response.headers);
            }
        };

        const value ={conversation, character, characterIntro, characterResponse,
            sendQuestion, cleanConversation,
            handleCharacter, handleCharacterIntro}

        return (
            <ConversationContext.Provider value={value}>
                {children}
            </ConversationContext.Provider>
        )

    }