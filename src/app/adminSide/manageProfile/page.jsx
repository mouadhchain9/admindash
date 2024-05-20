"use client";
import Navbar from '../../../component/navbar/Navbar';
import Sidebar from '../../../component/sidebar/Sidebar';
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import "./manage.css";
import { MdDeleteOutline } from "react-icons/md";
import ChildTable from "./ChildTable";


const page = () => {
  const [parentSide, setParentSide] = useState(true);
  const [activeBtn, setActiveBtn] = useState("All");
  const [children, setChildren] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8081/Children/all');
        setChildren(response.data);
      } catch (error) {
        // Handle error
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);


   return (
    <>
      <main>
        <div className='home'>
          <div className="dashboard">
            <Sidebar />
          </div>
          <div className='content'>
            <Navbar />
            <div className="mainContent">
              <div className="title">
                <h2>Manage Children's Profiles :</h2>
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
                        background: activeBtn === "3 months - 1 year" ? 'lightblue' : 'transparent',
                        textShadow: activeBtn === "3 months - 1 year" ? '3px 0 5px white,0 3px 5px white,-3px 0 5px white,0 -3px 5px white' : 'none'
                      }}
                      onClick={() => {
                        setActiveBtn("3 months - 1 year");
                      }}
                    >3 months - 1 year</button>
                  </div>
                  <div className='btnContainer'>
                    <button className='toggleBtn'
                      style={{
                        background: activeBtn === "1-2years" ? 'lightblue' : 'transparent',
                        textShadow: activeBtn === "1-2years" ? '3px 0 5px white,0 3px 5px white,-3px 0 5px white,0 -3px 5px white' : 'none'
                      }}
                      onClick={() => {
                        setActiveBtn("1-2years");
                      }}
                    >1-2years</button>
                  </div>
                  <div className='btnContainer'>
                    <button className='toggleBtn'
                      style={{
                        background: activeBtn === "2-3years" ? 'lightblue' : 'transparent',
                        textShadow: activeBtn === "2-3years" ? '3px 0 5px white,0 3px 5px white,-3px 0 5px white,0 -3px 5px white' : 'none'
                      }}
                      onClick={() => {
                        setActiveBtn("2-3years");
                      }}
                    >2-3years</button>
                  </div>
                </div>
                <div className='subTableContainer'>
                  {activeBtn === "All" && (
                    <ChildTable children={children} filterAges={""} />
                  )}
                  {activeBtn === "3 months - 1 year" && (
                    <ChildTable children={children} filterAges={"3 month- 1 Year"} />
                  )}
                  {activeBtn === "1-2years" && (
                    <ChildTable children={children} filterAges={"1 Year- 2 Years"} />
                  )}
                  {activeBtn === "2-3years" && (
                    <ChildTable children={children} filterAges={"2 Year- 3 Years"} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default page;
