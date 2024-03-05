import {Link} from "react-router-dom";


export default function Header(){

    return (
        <nav className="Header">
            {/*<div className="container">*/}
                <ul className="flex-buttons">
                    Navigation Bar
                    <li >
                        <Link className="nav nav-link" to='/'>
                            Home
                        </Link>
                    </li>

                    {<li >
                        <Link className="nav nav-link" to='/conversation'>
                            Conversation
                        </Link>
                    </li>}
                </ul>
            {/*</div>*/}
        </nav>
    )
}