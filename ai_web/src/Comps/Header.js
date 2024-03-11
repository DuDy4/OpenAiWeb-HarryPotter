import {Link} from "react-router-dom";


export default function Header(){

    return (
        <nav className="Header">
            {/*<div className="container">*/}
                <ul className="flex-buttons">
                    Navigation Bar
                    <li >
                        <div className="link-container">
                            <Link className="nav nav-link" to='/'>
                                Home
                            </Link>
                        </div>
                    </li>

                    {<li >
                        <div className="link-container">
                            <Link className="nav nav-link" to='/conversation'>
                                Conversation
                            </Link>
                        </div>

                    </li>}
                </ul>
            {/*</div>*/}
        </nav>
    )
}