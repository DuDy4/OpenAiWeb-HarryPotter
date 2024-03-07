
export default function QuestionAndAnswer({question, answer}){

    return(
        <div className="QAndA">
            {question && <div className="QuestionBubbleContainer">
                <div className="QuestionBubble">
                    <div className="Question">{question}</div>
                </div>
            </div>}
            {answer && <div className="AnswerBubbleContainer">
                <div className="AnswerBubble">
                    <div className="Answer">{answer}</div>
                </div>
            </div>}
        </div>
    )
}