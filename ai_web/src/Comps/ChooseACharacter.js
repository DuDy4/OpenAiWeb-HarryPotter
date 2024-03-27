import {useContext} from "react";
import {ConversationContext} from "../Providers/ConversationProvider";
import HagridImage from "../Resorces/Hagrid.jpg"
import DumbledoreImage from "../Resorces/Dumbledore.jpg"
import ChangeCharacter from "../Resorces/Change-Character-Hogwarts.jpg"
import DobbyImage from "../Resorces/Dobby.jpg"


export default function ChooseACharacter(){
    const {handleCharacterIntro, cleanConversation,
        character, handleCharacter, characterResponse} = useContext(ConversationContext);

    const emptyConversation = () => {
        handleCharacter("");
        handleCharacterIntro(undefined)
        cleanConversation();
    }

    const startCharacter = (character) => {
        const question = `Can you please have a chat with me as if you are ${character} from Harry Potter Series?` +
            ` and can your response to this message be: '${characterResponse[character]}'. Thanks in advance`;
        handleCharacterIntro({question: question, answer: characterResponse[character]});
        handleCharacter(character);
    };


    //The component returns a <ul> of characters,
    //or if a character is chosen, a button to return the choosing menu.
    return (
        <div className="characters-links">
            {!character && <div>
                <p className="choose-character-title">Select a character you wish to speak with:</p> <br/>
                <ul className="characters-choose-container">
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

                    <button className="characters-choose-links-bubble" onClick={() => {
                        emptyConversation();
                        startCharacter('Dobby')}}>
                        <img className="image-link-character" src={DobbyImage} title="Dobby" alt="Dobby" height="100"/>
                    </button>
                </ul></div>}
            {character && <button className="remove-character-container" onClick={emptyConversation}>
                <img className="characters-choose-links-bubble change-character" src={ChangeCharacter} alt="Change Character"/>
            </button> }
        </div>
    )
}