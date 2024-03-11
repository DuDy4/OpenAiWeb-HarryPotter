import React from "../Comps/react";

export default function Home(){

    return (
        <section className="py-3 text-center container">
            {/*<div className="row py-lg-5">*/}
                <div className="col-lg-6 col-md-8 mx-auto Home">
                    <h1>Hello, Welcome to the world of Hogwarts</h1>
                    <br/>
                    <p>Here you may speak with fictional characters from our school <br/>
                    Whenever you are ready, start a conversation with whomever you want</p>
                    {/*<img src={myCatImg} alt="" style={{width: "80%", height:"auto"}}/>*/}
                </div>
                {/*<ChatBox/>*/}
            {/*</div>*/}
        </section>
    )
}