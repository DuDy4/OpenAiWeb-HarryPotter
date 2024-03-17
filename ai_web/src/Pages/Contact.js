import {useState} from "react";
import {useForm} from "react-hook-form";
import sendButton from "../Resorces/conact_us_button2.jpg"

export default function Contact() {
    const [complaint, setComplaint] = useState(true)
    const [idCounter, setIdCounter] = useState(0) // ID counter for the local storage
    const { register, handleSubmit, reset } = useForm();

    //This function happen on submit, saves the data to local storage and rerender the page.
    const handleComplaint = (data) => {
        const id = idCounter;
        setIdCounter(idCounter + 1);
        const complaint = (data.name + ',' + data.email + ',' + data.message) //set the data to a csv string
        localStorage.setItem(id.toString(), complaint);
        setComplaint(false);
        reset()
    }
    return (
        <div className="Contact-container">
            <div className="Contact">
                <h1>Contact us</h1>
                <h3>We take your input sooooooo seriously</h3>

                {complaint ? ( //This ternary operator will build the relevant object, whether the complaint was submitted or not
                    <form className="form formLines" onSubmit={handleSubmit(handleComplaint)}>
                        <div className="formLine">
                            <label htmlFor="name">Full Name: </label>
                            <input {...register("name")} id="name" type="text" />
                        </div>
                        <div className="formLine">
                            <label htmlFor="email">Email: </label>
                            <input  {...register("email", {
                                required: "required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail must contains '@' and '.'"
                                },})}
                                   id="email" type="email" />
                        </div>
                        <div className="formLine">
                            <label htmlFor="message">Message: </label>
                            <textarea {...register("message")} id="message" />
                        </div>
                        <button type="submit" className="contact-submit">
                            <img src={sendButton} alt="send" className="owl-contact-submit" title="send"/>
                        </button>
                    </form>
                ) : (
                    <div>
                        <br/>
                        <h4>Thank you for your invaluable insight. We will be sure to take notice on it</h4>
                        <br/>
                        <button onClick={() => setComplaint(true)}>More complaint?</button>
                    </div>
                )}
                 </div>
        </div>

    )
}