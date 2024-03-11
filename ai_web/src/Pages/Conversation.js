import {useContext, useEffect, useState} from 'react'
import {ConversationContext} from "../Providers/ConversationProvider";
import QuestionAndAnswer from "../Comps/QuestionAndAnswer";
import ChatBox from "../Comps/QuestionForm";
import ConversationList from "../Comps/ConversationList";
import ConversationBox from "../Comps/ConversationBox";
import ChooseACharacter from "../Comps/ChooseACharacter";
import ChatWindow from "../Comps/QuestionForm";

export default function Conversation(){
    const {conversation, characterIntro} = useContext(ConversationContext);
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
            <div className="prompt-container">
                <ChatWindow/>
            </div>
        </div>
    )
}