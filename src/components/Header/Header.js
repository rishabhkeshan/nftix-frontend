import "./Header.scss";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import nftixLogo from "../../assets/nftix_logo_white.svg";

export default function Header() {
  const [visible, setVisible] = useState(true);
    const location = useLocation();

  useEffect(() => {
    const routePath=location.pathname;
    
    if (
      routePath === "/signup" ||
      routePath === "/login" ||
      routePath === "/verify"
    )
    {
      setVisible(false);
      console.log("hi");
    }
    else
    setVisible(true);
  }, [location]);

  return (
    <div className="header">
      <div className="header_logo">
        <a href="/">
          <img className="header_logo_img" src={nftixLogo} alt="nftix logo" />
        </a>
      </div>
      {visible && (
        <div className="header_login">
          <Link className="header_login_btn" to="/login">
            Log In
          </Link>
        </div>
      )}
    </div>
  );
}
