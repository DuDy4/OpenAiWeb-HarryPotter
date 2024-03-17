import React, {useContext} from 'react';
import {ConversationContext} from "../Providers/ConversationProvider";


export default function QuestionPromptLine(){
    const {sendQuestion} = useContext(ConversationContext)

    return (
        <div className="prompt-line">
            <textarea className="prompt-text"
                   placeholder="Type a message..."
                   onKeyDown={(e) => {
                       if (!(e.shiftKey && e.key === 'Enter') && e.key === 'Enter') {
                           sendQuestion(e.target.value);
                           e.target.value = '';
                       }
                   }}/>
        </div>
    );
};