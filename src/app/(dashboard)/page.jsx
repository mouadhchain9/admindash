'use client'
import Navbar from '../../component/navbar/Navbar';
import Sidebar from '../../component/sidebar/Sidebar';
import React, { useState, useEffect } from 'react';
import './dashboard.css'
import Link from 'next/link';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/Navigation';
import Scanner from "../../component/scanner/Scanner"

const Page = () => {
  const [preRegistrations, setPreRegistrations] = useState([]);
  const [absenceList, setAbsenceList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAbsence = async () => {
      try {
        const response = await axios.get('http://localhost:8081/Children/GetAbsent/all');
        setAbsenceList(response.data);
      } catch (error) {
        console.error('Error fetching absence List:', error);
      }
    };

    fetchAbsence();
  }, []);

  useEffect(() => {
    const fetchPreRegistrations = async () => {
      try {
        const response = await axios.get('http://localhost:8081/Register/PreRegisstration/all');
        setPreRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching pre-registrations:', error);
      }
    };

    fetchPreRegistrations();
  }, []);

  const handlePreRegDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this pre-registration?');
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8081/Register/preDelete/${id}`);
        setPreRegistrations(prevRegistrations => prevRegistrations.filter(preReg => preReg.id !== id));
        console.log('Pre-registration deleted successfully');
      } catch (error) {
        console.error('Error deleting pre-registration:', error);
      }
    }
  };

  const handleAbsenceDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this absence notification?');
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8081/Children/DeleteAbsent/${id}`);
        setAbsenceList(prevAbsences => prevAbsences.filter(absence => absence.id !== id));
        console.log('Absence notification deleted successfully');
      } catch (error) {
        console.error('Error deleting absence notification:', error);
      }
    }
  };

  const handleValidate = async (id) => {
    try {
      await axios.post(`http://localhost:8081/Register/ValidPre/${id}`);
      console.log('Pre-registration validated successfully');
      
      router.push(`./${id}`);
    } catch (error) {
      console.error('Error validating pre-registration:', error);
    }
  };

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
              <h2>Admin dashboard</h2>
           
              <div className='addButtonContainer'>
                <Link href={'./add'}>
                  <button className='addBtn'>Add a new User</button>
                </Link>
              
              </div>
            
            </div>
            <div className='tableContainer'>
              <div className='subTitle'>
                <h3>Pre-registrations Queue :</h3>
              </div>
              <div className='subTableContainer'>
                {preRegistrations.length > 0 ? (
                  <table className="table">
                    <caption>List of pre-registrations</caption>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Parent First Name</th>
                        <th scope="col">Parent Last Name</th>
                        <th scope="col">Child First Name</th>
                        <th scope="col">Child Last Name</th>
                        <th scope="col">Pre-Registration Date</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preRegistrations.map(preReg => (
                        <tr key={preReg.id}>
                          <td>{preReg.id}</td>
                          <td>{preReg.parent.firstName}</td>
                          <td>{preReg.parent.lastName}</td>
                          <td>{preReg.child.firstName}</td>
                          <td>{preReg.child.lastName}</td>
                          <td>{preReg.preRegistraionDate}</td>
                          <td>
                            <button className="btn" onClick={() => handlePreRegDelete(preReg.id)}>Delete</button>
                            <button className="btn" onClick={() => handleValidate(preReg.id)}>Validate</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="message"><p>No pre-registrations to Validate</p></div>
                )}
              </div>
            </div>
            <div className='AbsenceNotificationContainer'>
              <div className='tableContainer'>
                <div className='subTitle'>
                  <h3>Absence notifications :</h3>
                </div>
                <div className='subTableContainer'>
                  {absenceList.length > 0 ? (
                    <table className="table">
                      <caption>List of absences</caption>
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Child First Name</th>
                          <th scope="col">Child Last Name</th>
                          <th scope="col">absence Date</th>
                          <th scope="col">absence cause</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {absenceList.map(absence => (
                          <tr key={absence.id}>
                            <td>{absence.id}</td>
                            <td>{absence.child.firstName}</td>
                            <td>{absence.child.lastName}</td>
                            <td>{moment(absence.absentDate).format('DD/MM/YYYY')}</td>
                            <td>{absence.description}</td>
                            <td>
                              <button className="btn" onClick={() => handleAbsenceDelete(absence.id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="message"><p>No absence notifications available</p></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page;
