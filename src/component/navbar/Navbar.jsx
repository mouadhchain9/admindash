import React, { useContext } from 'react'
import './Navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SendIcon from '@mui/icons-material/Send';
import { BiBookAlt } from 'react-icons/bi';
 import Scanner from "../scanner/Scanner"


const Navbar = () => {

       
  return (
    <div className='navbar'>
        <div className='wrapper'>
            <div className='search'>
                <input type='text' placeholder='Search...'/>
                <SearchIcon/>
            </div>
            <div className='items'>
                <div className='item'>
                    <LanguageIcon className='icon'/>English
                </div>
                <div className='item'>
                    <DarkModeIcon className='icon' />
                </div>
                <div className='item'>
                    <CloseFullscreenIcon className='icon'/>
                </div>
                <div className='item'>
                <Scanner />
                </div>
                <div className='item'>
                    <a href="/adminSide/chat">
                        <SendIcon className='icon'/>
                        <div className='conter'>  3</div>
                    </a>
                </div>
      
            </div>
        </div>
    </div>
  )
}

export default Navbar;