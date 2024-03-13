import {Link} from "react-router-dom";

export default function Home(){

    return (
        <section className="py-3 text-center container">
                <div className="col-lg-6 col-md-8 mx-auto Home">
                    <h1>Hello, Welcome to the world of Hogwarts</h1>
                    <br/>
                    <div>Here you may speak with fictional characters from our school. <br/><br/>
                        Whenever you are ready, <Link to="/conversation">start a conversation</Link> with whomever you want</div>
                </div>
        </section>
    )
}