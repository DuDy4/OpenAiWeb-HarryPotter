import {Link} from "react-router-dom";

export default function Footer(){
    return (
        <nav className="Footer" >
            <br/>
            <Link className="nav nav-link Footer-Link" to="/Contact">
                Contact us
            </Link>
        </nav>
    )
}