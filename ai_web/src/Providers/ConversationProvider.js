    import {createContext, useState} from "react";

    export const ConversationContext = createContext(null);

    export function ConversationProvider({children}) {
        const [conversation, setConversation] = useState([])



        const addConversation = (questionAndAnswer) => {
            setConversation(prevConversation => [...prevConversation, questionAndAnswer]);
            console.log(conversation)
        }

        const value ={conversation, addConversation}

        return (
            <ConversationContext.Provider value={value}>
                {children}
            </ConversationContext.Provider>
        )

    }