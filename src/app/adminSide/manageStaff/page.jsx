"use client";
import Navbar from '../../../component/navbar/Navbar';
import Sidebar from '../../../component/sidebar/Sidebar';
import React, {useState, useEffect} from 'react'
import './manageStaff.css'
import { LuPencilLine } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import StaffTable from './StaffTable';
import Link from 'next/link';
import axios from 'axios';



const page = () => {

  const [activeBtn, setActiveBtn] = useState("All");
  const [Staff, setStaff] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8081/users/all');
        setStaff(response.data);
      } catch (error) {
        // Handle error
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);


  return (
    <main>
      <div className='home'>
        <div className="dashboard">
          <Sidebar />
        </div>
          <div className='content'>
            <Navbar />
            <div className="mainContent">
            <div className='title'>
              <h2>Staff Accounts Management</h2>
              <div className='addButtonContainer'>
                <Link href={'./manageStaff/add'}>
                  <button className='addBtn'>Add a new User</button>
                </Link>
              </div>
            </div>
            <div className='tableContainer'>
              <div className='toggleWindow'>
                  <div className='btnContainer'>
                    <button className='toggleBtn'
                      style={{
                        background: activeBtn === "All" ? 'lightblue' : 'transparent',
                        textShadow: activeBtn === "All" ? '3px 0 5px white,0 3px 5px white,-3px 0 5px white,0 -3px 5px white' : 'none'
                      }}
                      onClick={() => {
                        setActiveBtn("All");
                      }}
                    >All</button>
                  </div>
                  <div className='btnContainer'>
                    <button className='toggleBtn'
                      style={{
                        background: activeBtn === "Educators" ? 'lightblue' : 'transparent',
                        textShadow: activeBtn === "Educators" ? '3px 0 5px white,0 3px 5px white,-3px 0 5px white,0 -3px 5px white' : 'none'
                      }}
                      onClick={() => {
                        setActiveBtn("Educators");
                      }}
                    >Educators</button>
                  </div>
                  <div className='btnContainer'>
                    <button className='toggleBtn'
                      style={{
                        background: activeBtn === "Psychologists" ? 'lightblue' : 'transparent',
                        textShadow: activeBtn === "Psychologists" ? '3px 0 5px white,0 3px 5px white,-3px 0 5px white,0 -3px 5px white' : 'none'
                      }}
                      onClick={() => {
                        setActiveBtn("Psychologists");
                      }}
                    >Psychologists</button>
                  </div>
                  <div className='btnContainer'>
                    <button className='toggleBtn'
                      style={{
                        background: activeBtn === "Orthophonists" ? 'lightblue' : 'transparent',
                        textShadow: activeBtn === "Orthophonists" ? '3px 0 5px white,0 3px 5px white,-3px 0 5px white,0 -3px 5px white' : 'none'
                      }}
                      onClick={() => {
                        setActiveBtn("Orthophonists");
                      }}
                    >Orthophonists</button>
                  </div>
                  <div className="staffSearch">
                    <div className="search">
                      <input type='text' placeholder='Search...'/>
                    </div>
                  </div>
                </div>
                <div className='subTableContainer'>
                {activeBtn === "All" && (
                  <StaffTable staff={Staff} filterType={""} />
                )}
                {activeBtn === "Educators" && (
                  <StaffTable staff={Staff} filterType={"TEACHER"} />
                )}
                {activeBtn === "Psychologists" && (
                  <StaffTable staff={Staff} filterType={"PSYCHOLOGIST"} />
                )}
                {activeBtn === "Orthophonists" && (
                  <StaffTable staff={Staff} filterType={"ORTHOPHONIST"} />
                )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page;



