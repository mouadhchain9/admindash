"use client";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Navbar from '../../../../component/navbar/Navbar';
import Sidebar from '../../../../component/sidebar/Sidebar';
import Badge from '../../../../component/badge/Badge';
import React, {useState, useEffect} from 'react'
import { useRouter, useParams } from 'next/Navigation';
import Profile from './Profile.jsx'
import axios from 'axios';
import './childDetail.css'


export default function ChildDetail({params}) {
  const [child, setChild] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [activeBtn, setActiveBtn] = useState("educative");

  useEffect(() => {
    async function fetchData() {
      try {
        const childResponse = await axios.get(`http://localhost:8081/Children/child/${params.childDetail}`);
        setChild(childResponse.data);

        const profilesResponse = await axios.get(`http://localhost:8081/Children/childProfile/get/${params.childDetail}`);
        setProfiles(profilesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [params.childDetail]);


  return (
    <>
    <main>
      <div className='home'>

        <div className="dashboard">
          <Sidebar />
        </div>
        <div className='content'>
          <Navbar/>

          <div className='mainContent'>
            <div className='returnBtn'>
              <div className='returnBtnBox'>
                <a href={'/adminSide/manageProfile'} style = {{}}>
                  <ArrowBackIosRoundedIcon className='btn'></ArrowBackIosRoundedIcon>
                  <p>Return</p>
                </a>
              </div> 
            </div>
            <div className='cartContainer'>
              <div className='badgeContainer'>

                <Badge child={params.childDetail} />

              </div>
              <div className='cartBody'>
                {/*<img className="photo"
                 src="F:\mouadh\studies\S5,S6 (final phase)\S6\projet\dev-files\admin-side-master\src\component\navbar\xyz.png"
                 alt="Child Photo" />*/}
                <div>
                </div>
                <div className="info">
                  <h1 className="title">Child informations</h1>
                  <div className="infoBox">
                    <p><span className="label">First Name</span> {child?.firstName}</p>
                    <p><span className="label">Last Name</span> {child?.lastName}</p>
                    <p><span className="label">Birthdate</span> {child?.Birthdate}</p>
                    <p><span className="label">Gender</span> {child?.gender}</p>
                    <p><span className="label">Status</span> {child?.status}</p>
                    <p><span className="label">Section Name</span> {child?.section.sectionName}</p>
                    <p><span className="label">Ages</span> {child?.section.ages}</p>
                  </div>
                  <h2 className="subTitle">Parent's details</h2>
                  <div className="infoBox">
                    <p><span className="label">firstName</span> {child?.parent.firstName}</p>
                    <p><span className="label">lastName</span> {child?.parent.lastName}</p>
                    <p><span className="label">birthdate</span> {child?.parent.birthdate}</p>
                    <p><span className="label">gender</span> {child?.parent.gender}</p>
                    <p><span className="label">phoneNumber</span> {child?.parent.phoneNumber}</p>
                    <p><span className="label">address</span> {child?.parent.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='profilesContainer'>
              <div className='toggleWindow'>
                  <div className='btnContainer'>
                    <button className='toggleBtn'
                      style={{
                        background: activeBtn === "educative" ? 'lightblue' : 'transparent',
                        textShadow: activeBtn === "educative" ? '3px 0 5px white,0 3px 5px white,-3px 0 5px white,0 -3px 5px white' : 'none'
                      }}
                      onClick={() => {
                        setActiveBtn("educative");
                      }}
                    >educative</button>
                  </div>
                  <div className='btnContainer'>
                    <button className='toggleBtn'
                      style={{
                        background: activeBtn === "psychologic" ? 'lightblue' : 'transparent',
                        textShadow: activeBtn === "psychologic" ? '3px 0 5px white,0 3px 5px white,-3px 0 5px white,0 -3px 5px white' : 'none'
                      }}
                      onClick={() => {
                        setActiveBtn("psychologic");
                      }}
                    >psychologic</button>
                  </div>
                  <div className='btnContainer'>
                    <button className='toggleBtn'
                      style={{
                        background: activeBtn === "orthophonic" ? 'lightblue' : 'transparent',
                        textShadow: activeBtn === "orthophonic" ? '3px 0 5px white,0 3px 5px white,-3px 0 5px white,0 -3px 5px white' : 'none'
                      }}
                      onClick={() => {
                        setActiveBtn("orthophonic");
                      }}
                    >orthophonic</button>
                  </div>
                </div>
                <div className='subProfileContainer'>
                  {activeBtn === "educative" && (
                    <Profile profiles={profiles} type="EDUCATIVE" />
                  )}
                  {activeBtn === "psychologic" && (
                    <Profile profiles={profiles} type="PSYCHOLOGY" />
                  )}
                  {activeBtn === "orthophonic" && (
                    <Profile profiles={profiles} type="ORTHOPHONY" />
                  )}
                </div>
            </div>
          </div>
         
        </div>
      </div>
    </main>
    </>
  )
}

