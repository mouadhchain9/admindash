'use client'

import Navbar from '../../../component/navbar/Navbar';
import Sidebar from '../../../component/sidebar/Sidebar';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/Navigation';
import './manageParents.css'

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
              <h2>Manage Parents</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page;
