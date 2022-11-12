import "./navbar.css"
function Navbar()
{
    return(
        <nav className="nav">
            <a href="/" className="siteTitle">Site Title</a>
            <ul>
                <li className="active">
                    <a href="/">Home</a>
                </li>
                <li className="active"><a href="/About">About</a></li>
                <li><a href="/Patient">Login</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;