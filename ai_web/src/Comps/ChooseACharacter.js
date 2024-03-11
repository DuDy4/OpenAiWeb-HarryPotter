import {useContext} from "react";
import {ConversationContext} from "../Providers/ConversationProvider";
import axios from "axios";


export default function ChooseACharacter(){
    const {handleCharacterIntro, addConversation, cleanConversation,
        character, handleCharacter, characterResponse} = useContext(ConversationContext);
    const apiKey = process.env.REACT_APP_API_KEY;

    const emptyConversation = () => {
        handleCharacter("");
        handleCharacterIntro(undefined)
        cleanConversation();
    }

    const sendCharacter = async (character) => {
        try {
            const question = `Can you please have a chat with me as if you are ${character} from Harry Potter Series?` +
                ` and can your response to this message be: '${characterResponse[character]}'. Thanks in advance`;
            // console.log(question);
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo', // Or any other model you prefer
                    messages: [{ role: 'user',
                        content: question}],
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
            console.log(response)
            const answer = response.data.choices[0].message.content.trim();
            console.log(answer)
            await handleCharacterIntro({question: question, answer: answer});
            await handleCharacter(character);

        } catch (error) {
            console.error('Error fetching response:', error);
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
        }
    };

    return (
        <div className="Characters-links">
            <ul>
                <button className="button" onClick={() => {
                    emptyConversation()
                    sendCharacter('Hagrid')}}
                    >Hagrid</button>
                <button className="button" onClick={() => {
                    emptyConversation();
                    sendCharacter('Dumbledore')}}>Dumbledore</button>
            </ul>
        </div>
    )
}