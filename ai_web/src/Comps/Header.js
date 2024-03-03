import {Link} from "react-router-dom";


export default function Header(){

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <ul className="nav">
                    This is the nav-bar
                    {/*<li className="nav-item">*/}
                    {/*    <Link className="nav-link" to='/'>*/}
                    {/*        Home*/}
                    {/*    </Link>*/}
                    {/*</li>*/}

                    {/*{user && <li className="nav-item">*/}
                    {/*    <Link className="nav-link" to='/write_post'>*/}
                    {/*        Write post*/}
                    {/*    </Link>*/}
                    {/*</li>}*/}
                </ul>
            </div>
        </nav>
    )
}