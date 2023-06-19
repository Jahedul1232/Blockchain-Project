import "./Navbar.css";
// import Patient from "../../patient/patient";
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import navImage from "../../../../assets/images.jpeg"
import { useEffect, useState } from "react";


function Navbar() {
  const [auth,setAuth] = useState()
  useEffect(() => {
    setAuth(localStorage.getItem("userID"));
  },[auth])
  // const navigate = useNavigate();
  // const navigate = useNavigate();
  

  const logout = () => {
        localStorage.clear();
        // navigate("/");
    }
  
  return (

    <div>
      <nav className="nav">
         <nav className="flex sm:justify-center space-x-4">
         <div className="navPic">
           <img src={navImage} alt=""></img>
         </div>
         {[["Blockchain-App", "/"]].map(([title, url]) => (
           <a
             href={url}
             className="rounded-lg px-5 py-9 text-slate-700 font-medium hover:bg-slate-0 hover:text-slate-900 nav1"
           >
             {title}
           </a>
         ))}
       </nav>
         <ul>
          <li className="">
             <a className="rounded-lg px-3 py-3 text-slate-700 font-medium hover:bg-slate-300 hover:text-slate-900 nav2" href="/About">About</a>
           </li>   
          <li>
            {auth ? <a className="rounded-lg px-3 py-3 text-slate-700 font-medium hover:bg-slate-300 hover:text-slate-900 nav2" href="/" onClick={logout}>Logout</a> :
              <a className="rounded-lg px-3 py-3 text-slate-700 font-medium hover:bg-slate-300 hover:text-slate-900 nav2" href='/patientLogin'>Login</a>}
          </li>
          <li>
            {/* <a href='/Patient'>Login</a> */}
            {/* { auth ?  <Link className='dropdown-item' to="/">Logout</Link>: <Link className='dropdown-item' to="/Patient">Login</Link>} */}
             {/* <a href="/Patient">Login</a> */}
           </li>
         </ul>
       </nav>
      </div>
    //-------------------------------------------------------------->
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
    // <div className="nav">
    //   <nav className="flex sm:justify-center space-x-4">
    //     <div className="navPic">
    //       <img src={navImage} alt=""></img>
    //     </div>
    //     {[["Blockchain-App", "/"]].map(([title, url]) => (
    //       <a
    //         href={url}
    //         className="rounded-lg px-5 py-9 text-slate-700 font-medium hover:bg-slate-0 hover:text-slate-900 nav1"
    //       >
    //         {title}
    //       </a>
    //     ))}
    //   </nav>
    //   <nav className="flex sm:justify-center space-x-4">
    //     {[
    //       ["Patient", "/Patient"],
    //       ["About", "/doctor"],
    //       ["Login", "#text"],
    //     ].map(([title, url]) => (
    //       <a
    //         href={url}
    //         className="rounded-lg px-3 py-3 text-slate-700 font-medium hover:bg-slate-300 hover:text-slate-900 nav2"
    //       >
    //         {title}
    //       </a>
    //     ))}
    //   </nav>
    // </div>
  );
}

export default Navbar;
