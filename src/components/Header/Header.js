import "./Header.scss";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useHistory } from "react-router-dom";
import nftixLogo from "../../assets/nftix_logo_white.svg";
import logout_icon from "../../assets/logout_icon.svg";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const routePath = location.pathname;
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("jwt") !== null
  );

  const username = localStorage.getItem("username");

  useEffect(() => {
    setLoggedIn(localStorage.getItem("jwt") !== null);
    if (
      routePath === "/signup" ||
      routePath === "/login" ||
      routePath === "/verify" ||
      routePath === "/wallet-create"
    ) {
      setVisible(false);
      console.log("hi");
    } else setVisible(true);
  }, [location, localStorage]);

  return (
    <div className="header">
      <div className="header_logo">
        <a href="/">
          <img className="header_logo_img" src={nftixLogo} alt="nftix logo" />
        </a>
      </div>
      {visible && (
        <div className="header_login">
          {loggedIn ? (
            <div className="header_login_btn flex justify-center items-center text-lg font-semibold " to="/login">
              {username}
              <img onClick={()=>{
                localStorage.clear();
                history.push("/login");
              }} className="w-8" src={logout_icon} alt="logout"/>
            </div>
          ) : (
            <Link className="header_login_btn" to="/login">
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
