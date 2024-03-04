import {useContext, useEffect, useState} from 'react'
import {ConversationContext} from "../Providers/ConversationProvider";
import QuestionAndAnswer from "../Comps/QuestionAndAnswer";
import ChatBox from "../Comps/chatBox";
import ConversationList from "../Comps/ConversationList";

export default function Conversation(){
    const {conversation} = useContext(ConversationContext);
    console.log(conversation)
    const [, setTriggerRerender] = useState({}); // Dummy state to trigger re-render
    let conversationId = 0;

    function getId(){
        conversationId++;
        return conversationId - 1;
    }


    useEffect(() => {
        setTriggerRerender({}); // Update dummy state to trigger re-render
    }, [conversation]);

    return (
        <div>
            <ConversationList>
                {conversation.map((questionAndAnswer) =>
                    <QuestionAndAnswer key={getId()}
                                       question={questionAndAnswer.question}
                                       answer={questionAndAnswer.answer}/>)}
            </ConversationList>
            <ChatBox/>
        </div>
    )
}