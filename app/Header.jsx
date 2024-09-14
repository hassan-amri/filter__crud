import React from "react";
import "./Header.css";
import Link from "next/navigation";
import MenuIcon from '@mui/icons-material/Menu';
function Header() {
  return (
    <div className="header">
      <nav>
      <input type="checkbox" id="check"/>
      <label for="check" className="checkbtn">
        
        <MenuIcon className="fas fa-bars"/>
      </label>
      <label className="logo">HIKMATEX</label>
      <ul>
        <li><a className="active" href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Feedback</a></li>
      </ul>
    </nav>
    </div>
  );
}

export default Header;
