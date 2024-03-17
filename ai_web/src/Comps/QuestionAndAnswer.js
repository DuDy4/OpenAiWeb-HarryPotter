import {useContext, useEffect, useState} from "react";
import {ConversationContext} from "../Providers/ConversationProvider";

export default function QuestionAndAnswer({question, answer}){

    const [hasAnswer, setHasAnswer] = useState(false);

    useEffect(() => {
        setHasAnswer(!hasAnswer);
    }, [question, answer]);

    const {character} = useContext(ConversationContext);

    return(
        <div className="QAndA">
            {question && <div className="QuestionBubbleContainer">
                <div className="QuestionBubble">
                    <div className="Question">{question}</div>
                </div>
            </div>}


            {
                //The next section will build either an answer, or a loading animation.
                //While after the user sent a question, and until the API returns an answer,
                //The loading animation will play.
                //After the response arrived, the animation will be replaced by the answer

            }
            {answer ?
                <div className="AnswerBubbleContainer">
                    <div className="AnswerBubble">
                        <div className={"Answer " + character}>{answer}</div>
                    </div>
                </div>
                :
                <div className="spinner-border"
                             style={{width: '3rem', height: '3rem',}}
                             role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
        </div>
    )
}