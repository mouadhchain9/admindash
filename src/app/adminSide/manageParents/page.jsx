"use client"
import Navbar from '../../../component/navbar/Navbar';
import Sidebar from '../../../component/sidebar/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import './manageParents.css';
import ParentTable from './ParentTable';

const Page = () => {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8081/parents/allParents');
        setParents(response.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
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
            <div className="title">
              <h2>Manage Parents :</h2>
              <div className='addButtonContainer'>
                <Link href={'./manageParents/add'}>
                  <button className='addBtn'>New Parent</button>
                </Link>
              </div>
            </div>
            <div className='tableContainer'>
              <div className="subTitle"><h3> Parents :</h3></div>
              <div className='subTableContainer'>
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>{error}</div>
                ) : (
                  <ParentTable parents={parents} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
