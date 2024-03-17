import {useContext} from 'react'
import {ConversationContext} from "../Providers/ConversationProvider";
import QuestionAndAnswer from "../Comps/QuestionAndAnswer";
import ConversationList from "../Comps/ConversationList";
import ChooseACharacter from "../Comps/ChooseACharacter";
import QuestionPromptLine from "../Comps/QuestionPromptLine";

export default function Conversation(){
    const {conversation, characterIntro, character} = useContext(ConversationContext);
    let conversationId = 0;

    function getId(){ //This will ensure a unique id(key) for each child in the unordered list
        conversationId++;
        return conversationId - 1;
    }

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