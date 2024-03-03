import React from "../Comps/react";
import ChatBox from "../Comps/chatBox";

export default function Home(){

    return (
        <section className="py-3 text-center container">
            {/*<div className="row py-lg-5">*/}
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1>Hello, This is my personal ChatGPT page</h1>
                    <p>Feel free to use it as you will</p>
                    {/*<img src={myCatImg} alt="" style={{width: "80%", height:"auto"}}/>*/}
                </div>
                <React/>
                <ChatBox/>
            {/*</div>*/}
        </section>
    )
}