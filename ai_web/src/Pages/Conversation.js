import {useContext, useEffect, useState} from 'react'
import {ConversationContext} from "../Providers/ConversationProvider";
import QuestionAndAnswer from "../Comps/QuestionAndAnswer";
import ConversationList from "../Comps/ConversationList";
import ChooseACharacter from "../Comps/ChooseACharacter";
import ChatWindow from "../Comps/QuestionPromptLine";
import QuestionPromptLine from "../Comps/QuestionPromptLine";

export default function Conversation(){
    const {conversation, characterIntro, character} = useContext(ConversationContext);
    const [, setTriggerRerender] = useState({}); // Dummy state to trigger re-render
    let conversationId = 0;



    function getId(){
        conversationId++;
        return conversationId - 1;
    }


    useEffect(() => {
        setTriggerRerender({});
    }, [conversation]);

    return (
        <div className="conversation">
            <ChooseACharacter/>
            <ConversationList>
                {characterIntro && <QuestionAndAnswer key={getId()}
                    answer={characterIntro.answer}/>}
                {conversation.map((questionAndAnswer) =>
                    <QuestionAndAnswer key={getId()}
                                       question={questionAndAnswer.question}
                                       answer={questionAndAnswer.answer}/>)}
            </ConversationList>
            {character && <div className="prompt-container">
                <QuestionPromptLine/>
            </div>}
        </div>
    )
}