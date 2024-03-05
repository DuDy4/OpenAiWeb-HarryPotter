
export default function QuestionAndAnswer({question, answer}){

    return(
        <div className="QAndA">
            <div className="QuestionBubbleContainer">
                <div className="QuestionBubble">
                    <div className="Question">Question: {question}</div>
                </div>
            </div>
            <div className="AnswerBubbleContainer">
                <div className="AnswerBubble">
                    <div className="Answer">Answer: {answer}</div>
                </div>
            </div>
        </div>
    )
}