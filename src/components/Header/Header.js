import "./Header.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import nftixLogo from "../../assets/nftix_logo_white.svg";

export default function Header() {
  return (
    <div className="header">
        <div className="header_logo">
            <a href="/">
                <img className="header_logo_img" src={nftixLogo} alt="nftix logo"/>
            </a>
        </div>
        {/* <div className="header_login"> 
          <Link className="header_login_btn" to="/login">
            Log In
          </Link>
        </div> */}
    </div>
  )
}
