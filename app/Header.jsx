import React from "react";
import "./Header.css";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
function Header() {
  return (
    <div className="header">
      <nav>
        {/* <input type="checkbox" id="check" />
        <label for="check" className="checkbtn"> */}
        {/* <MenuIcon className="fas fa-bars" /> */}
        {/* </label> */}
        <label className="logo">HIKMATEX</label>
        <ul>
          <li className="active">
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/feedback">Feedback</Link>
          </li>
          <li>
            <Link href="/reports">Reports</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
