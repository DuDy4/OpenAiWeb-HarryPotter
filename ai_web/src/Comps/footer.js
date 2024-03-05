import {Link} from "react-router-dom";

export default function Footer(){
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary Footer" >
            <br/>
            <Link className="nav-link Footer-Link" to="/Contact">
                Contact us
            </Link>
        </nav>
    )
}