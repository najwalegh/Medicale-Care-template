import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header >
      <div className="container mx-auto border-none">
        <div className="flex justify-between items-center">
          {/* {LOGO} */}
          <a href="#">
            <img src={logo} alt="logo" style={{ width: 80 }}></img>
          </a>
          <div>
            {/* {button} */}
            <Link to={"/sign-in"}>
              <button className=" btn-lg ">Sign In</button>
            </Link>
            <Link to={"/sign-up"}>
              <button className="btn-lg ">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
