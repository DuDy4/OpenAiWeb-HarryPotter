import {Link} from "react-router-dom";


export default function Header(){

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary Header">
            <div className="container">
                <ul className="nav flex-buttons">
                    Navigation Bar
                    <li className="nav-item">
                        <Link className="nav-link" to='/'>
                            Home
                        </Link>
                    </li>

                    {<li className="nav-item">
                        <Link className="nav-link" to='/conversation'>
                            Conversation
                        </Link>
                    </li>}
                </ul>
            </div>
        </nav>
    )
}