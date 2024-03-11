import {useContext} from "react";
import {ConversationContext} from "../Providers/ConversationProvider";
import axios from "axios";


export default function ChooseACharacter(){
    const {handleCharacterIntro, cleanConversation,
        character, handleCharacter, characterResponse} = useContext(ConversationContext);
    const apiKey = process.env.REACT_APP_API_KEY;

    const emptyConversation = () => {
        handleCharacter("");
        handleCharacterIntro(undefined)
        cleanConversation();
    }

    const startCharacter = (character) => {
        try {
            const question = `Can you please have a chat with me as if you are ${character} from Harry Potter Series?` +
                ` and can your response to this message be: '${characterResponse[character]}'. Thanks in advance`;
            handleCharacterIntro({question: question, answer: characterResponse[character]});
            handleCharacter(character);

        } catch (error) {
            console.error('Error fetching response:', error);
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
        }
    };

    return (
        <div className="characters-links">

            {!character && <ul className="characters-choose-container">
                <button className="characters-choose-links-bubble Hagrid" onClick={() => {
                    emptyConversation()
                    startCharacter('Hagrid')}}
                    >
                </button>
                <button className="characters-choose-links-bubble" onClick={() => {
                    emptyConversation();
                    startCharacter('Dumbledore')}}>Dumbledore</button>
            </ul>}
            {character && <button className="button" onClick={emptyConversation}>Change Character</button> }
        </div>
    )
}