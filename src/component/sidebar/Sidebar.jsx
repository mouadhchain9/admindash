import React from 'react'
import { BiHome,BiBookAlt,BiMessage,BiSolidReport,BiStats,BiTask,BiHelpCircle  } from 'react-icons/bi';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import './sidebar.css'

const Sidebar = () => {
    
  return (
    <div className='menu'>

        <div className='logo'>
                <BiBookAlt className='icon'/>
                <h2  >Admin Space   </h2>
        </div>
        <div className='menu--list' >
            <a href='/' className='item'>
                <BiHome className='icon'/>Dashboard
            </a>

            < a href='/adminSide/manageProfile' className='item'>
                  <BiTask className='icon'/>Manage Profil
            </a>

            < a href='/adminSide/manageStaff' className='item'>
                <BiSolidReport className='icon'/>Manage Staff
            </a>

            < a href='/adminSide/manageNews' className='item'>
                <NewspaperIcon className='icon'/>Manage News
            </a>

            < a href='/adminSide/makeSchedule' className='item'>
                <EditCalendarIcon className='icon'/>Schedual Planing
            </a>

            < a href='/adminSide/manageDigitalFile' className='item'>
                <BiHelpCircle className='icon'/>Manage Digital File
            </a>
        </div>
    </div>
  )
}

export default Sidebar