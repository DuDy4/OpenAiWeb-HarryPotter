
export default function QuestionAndAnswer({question, answer}){

    return(
        <div className="conversation">
            <div className="Question">Question: {question}</div>
            <div className="Answer">Answer: {answer}</div>
        </div>
    )
}