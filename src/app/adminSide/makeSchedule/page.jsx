'use client'

import Navbar from '../../../component/navbar/Navbar';
import Sidebar from '../../../component/sidebar/Sidebar';
import Calender from './Calender';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/Navigation';
import './makeSchedule.css'


const Page = () => {
 
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
              <h2>make schedule</h2>
            </div>
            <Calender />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page;
