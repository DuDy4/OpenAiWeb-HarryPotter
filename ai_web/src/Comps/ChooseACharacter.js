import {useContext} from "react";
import {ConversationContext} from "../Providers/ConversationProvider";
import HagridImage from "../Resorces/Hagrid.jpg"
import DumbledoreImage from "../Resorces/Dumbledore.jpg"
import ChangeCharacter from "../Resorces/Change-Character-Hogwarts.jpg"


export default function ChooseACharacter(){
    const {handleCharacterIntro, cleanConversation,
        character, handleCharacter, characterResponse} = useContext(ConversationContext);

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
                <button className="characters-choose-links-bubble" onClick={() => {
                    emptyConversation()
                    startCharacter('Hagrid')}}
                    >
                    <img className="image-link-character" src={HagridImage} title="Hagrid" alt="Hagrid" height="100"/>

                </button>
                <button className="characters-choose-links-bubble" onClick={() => {
                    emptyConversation();
                    startCharacter('Dumbledore')}}>
                    <img className="image-link-character" src={DumbledoreImage} title="Dumbledore" alt="Dumbledore" height="100"/>
                </button>
            </ul>}
            {character && <button  onClick={emptyConversation}>
                <img className="characters-choose-links-bubble" src={ChangeCharacter} alt="Change Character" height="200"/>
            </button> }
        </div>
    )
}