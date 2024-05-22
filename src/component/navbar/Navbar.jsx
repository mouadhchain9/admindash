import React, { useContext } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SendIcon from "@mui/icons-material/Send";
import { BiBookAlt } from "react-icons/bi";
import Scanner from "../scanner/Scanner";
import { useSession, signIn, signOut } from "next-auth/react";
import { Padding } from "@mui/icons-material";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon />
        </div>
        <div className="items">
       
       
          <div className="item">
            <CloseFullscreenIcon className="icon" />
          </div>
          <div className="item">
            <Scanner />
          </div>
          <div className="item">
            <a href="/adminSide/chat">
              <SendIcon className="icon" />
              <div className="conter"> 3</div>
            </a>
          </div>
          <button
            style={{
              padding: "0.6rem 1rem",
              color: "white",
              backgroundColor: "red",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
            onClick={() => {
              signOut({ callbackUrl: "http://localhost:3001/auth/login" });
            }}
          >
            logout{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
