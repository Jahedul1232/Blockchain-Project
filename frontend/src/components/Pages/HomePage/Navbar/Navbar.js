import "./Navbar.css";
import Patient from "../../patient/patient";

function Navbar() {
  return (
    // <nav className="nav">
    //   <a href="/" className="siteTitle">
    //     Site Title
    //   </a>
    //   <ul>
    //     <li className="active">
    //       <a href="/">Home</a>
    //     </li>
    //     <li className="">
    //       <a href="/About">About</a>
    //     </li>
    //     <li>
    //       <a href="/Patient">Login</a>
    //     </li>
    //   </ul>
    // </nav>
    <div className="nav">
      <nav className="flex sm:justify-center space-x-4">
        {[["Blochchain App", "/"]].map(([title, url]) => (
          <a
            href={url}
            className="rounded-lg px-3 py-3 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 nav1"
          >
            {title}
          </a>
        ))}
      </nav>
      <nav className="flex sm:justify-center space-x-4">
        {[
          ["Patient", "/Patient"],
          ["About", "/doctor"],
          ["Login", "/"],
        ].map(([title, url]) => (
          <a
            href={url}
            className="rounded-lg px-3 py-3 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900 nav2"
          >
            {title}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
