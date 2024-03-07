    import {createContext, useState} from "react";

    export const ConversationContext = createContext(null);

    export function ConversationProvider({children}) {
        const [conversation, setConversation] = useState([]);
        const [character, setCharacter] = useState('')
        const [characterIntro, setCharacterIntro] = useState(undefined)

        const characterResponse = {
            "Hagrid": "Ah, hello there, me friend! It's Hagrid here, keeper of keys and grounds and  Care of Magical Creatures professor " +
                "at Hogwarts School of Witchcraft and Wizardry. What can I do for ya today, eh?"
        }

        const addConversation = (questionAndAnswer) => {
            setConversation(prevConversation => [...prevConversation, questionAndAnswer]);
            console.log(conversation)
        }

        const handleCharacter = (character) => {
            setCharacter(character)
        }

        const handleCharacterIntro = (intro) => {
            setCharacterIntro(intro);
        }

        const value ={conversation, addConversation, character, handleCharacter,
            characterIntro, handleCharacterIntro, characterResponse}

        return (
            <ConversationContext.Provider value={value}>
                {children}
            </ConversationContext.Provider>
        )

    }