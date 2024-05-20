"use client";
import Navbar from '../../../../component/navbar/Navbar';
import Sidebar from '../../../../component/sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import './add.css';

export default function Add() {
  const router = useRouter();
  const [isFormValid, setIsFormValid] = useState(true);
  const [parent, setParent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    gender: "MALE",
    phoneNumber: "",
    address: "",
    email: "",
    username: "",
    password: "",
    role: "PARENT",
    status: "VALID"
  });



  // Change handlers for fields
  const handleChildChange = (e) => {
    const { name, value } = e.target;
    setChild(prevChild => ({
      ...prevChild,
      [name]: value
    }));
  };

  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParent(prevParent => ({
      ...prevParent,
      [name]: value
    }));
  };



  const handleSectionChange = (e) => {
    const { value } = e.target;
    setChild(prevChild => ({
      ...prevChild,
      section: {
        ...prevChild.section,
        id: value
      }
    }));
  };



// Data save/cancel handlers
const handleSave = async () => {
  const confirmation = window.confirm('Are you sure you want to save this account?');
  if (confirmation) {
    try {
      // Save parent
      const parentResponse = await axios.post(`http://localhost:8081/parents/parent/Add`, parent);
      const parentId = parentResponse.data; // Assuming the ID is returned directly
      
      console.log('Parent account saved successfully with ID:', parentId);
      
      router.push('./manageParents');
    } catch (error) {
      console.error('Error updating data:', error, '\n please try again.');
    }
  } else {
    console.log('Save operation canceled');
  }
};


  const handleCancel = () => {
    const confirmation = window.confirm('Are you sure you want to cancel?');
    if (confirmation) {
      // Redirect logic here
      window.location.href = '/#';
    }
  };

  // Photo rendering
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

// -------------- check if form is valid -------------------------
  useEffect(() => {
    const handleFormValidity = () => {
      const parentForm = document.getElementById('parentForm');
      
      if (parentForm) {
        const isParentFormValid = parentForm.checkValidity();
        setIsFormValid(isParentFormValid);
      }
    };

    handleFormValidity();
  }, [parent]);


 return (
    <main>
      <div className='home'>
        <div className="dashboard">
          <Sidebar />
        </div>
        <div className='content'>
          <Navbar />
          <div className="mainContent">
            <div className='returnBtn'>
              <div className='returnBtnBox'>
                <a href={'/#'}>
                  <ArrowBackIosRoundedIcon className='btn'></ArrowBackIosRoundedIcon>
                </a>
              </div> 
              <div className='title'>
                <h3>Create a New Account :</h3>
              </div>
            </div> 
            <div className='subTitle2'>
              <h3> Parent informations :</h3>
            </div> 
            <div className='editContainer' style={{marginBottom: ''}}>
              {/*<div className='photoContainer'>
                <div className='photo'
                 style={{
                  background: 'transparent',
                  boxShadow: 'none',
                  border: 'none'
                }}>
                </div>
              </div>*/}
              <div className='mainEdit'>
                <form id="parentForm" className='subEdit' method='post'>
                  <div className='halfEdit'>
                    <div className='formGroup'>
                      <label>First Name:</label>
                      <div className="text">
                      <input className='input' type='text' name='firstName' onChange={handleParentChange} value={parent.firstName} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Last Name:</label>
                      <div className="text">
                      <input className='input' type='text' name='lastName' onChange={handleParentChange} value={parent.lastName} required/>
                      </div>
                    </div>
                    
                    <div className='formGroup'>
                      <label>Birthdate:</label>
                      <div className="text">
                      <input className='input' type='date' name='birthdate' onChange={handleParentChange} value={parent.birthdate} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Gender:</label>
                      <div className="text">
                      <select className="input" name='gender' onChange={handleParentChange} value={parent.gender} required>
                        <option className="input" value='MALE'>Male</option>
                        <option className="input" value='FEMALE'>Female</option>
                      </select>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Phone Number:</label>
                      <div className="text">
                      <input className='input' type='number' name='phoneNumber' onChange={handleParentChange} value={parent.phoneNumber} required/>
                      </div>
                    </div>
                  </div>
                  <div className='halfEdit'>
                    <div className='formGroup'>
                      <label>User-name:</label>
                      <div className="text">
                      <input className='input' type='text' name='username' onChange={handleParentChange} value={parent.username} required/>
                      </div>
                    </div>                    
                    <div className='formGroup'>
                      <label>Address:</label>
                      <div className="text">
                      <input className='input' type='address' name='address' onChange={handleParentChange} value={parent.address} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Email:</label>
                      <div className="text">
                      <input className='input' type='email' name='email' onChange={handleParentChange} value={parent.email} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Password:</label>
                      <div className="text">
                      <input className='input' type='password' name='password' onChange={handleParentChange} value={parent.password} required/>
                      </div>
                    </div>
                    <div className='formButtons'>
                      <div className='btnBox'>
                        <button className='save' type='button' onClick={handleSave} disabled={!isFormValid}>Save</button>
                      </div>
                      <div className='btnBox'>
                        <button className='cancel' type='button' onClick={handleCancel}>Cancel</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}