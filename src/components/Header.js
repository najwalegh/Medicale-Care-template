import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useTokenContext } from "../context/AuthContextProvider";

function Header() {
  const { token } = useTokenContext();
  return (
    <header>
      <div className="container mx-auto border-none">
        <div className="flex justify-between items-center">
          {/* {LOGO} */}
          <Link to={"/"}>
            <img src={logo} alt="logo" style={{ width: 80 }}></img>
          </Link>
          {!token && (
            <div>
              {/* {button} */}
              <Link to={"/sign-in"}>
                <button className=" btn-lg ">Connexion</button>
              </Link>
              <Link to={"/sign-up"}>
                <button className="btn-lg ">Inscription</button>
              </Link>
            </div>
          )}
          {token && (
            <div>
              <button className="btn-lg">Session</button>
              <Link to={"/logout"}>
                <button className="btn-lg ">Déconnexion</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
