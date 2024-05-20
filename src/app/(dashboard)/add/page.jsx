"use client";
import Navbar from '../../../component/navbar/Navbar';
import Sidebar from '../../../component/sidebar/Sidebar';
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import './add.css'


const page = () => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(null);
  const [child, setChild] = useState({
    firstName:'',
    lastName:'',
    birthdate:'',
    gender:'',
    id:'',
    section:{
      ages:'',
      sectionName:'',
    },
    parent:{
      firstName:'',
      lastName:'',
      address:'',
      birthdate:'',
      gender:'',
      email:'',
      password:'',
      status:'',
      role:'',
      phoneNumber:'',
      checkout:'',
    },
  });

  // change handlers for fields : -------------------------------------

const handleChildChange = (e) => {
  const { name, value } = e.target;
  setChild(prevChild => ({
    ...prevChild,
    [name]: value
  }));
};

const handleParentChange = (e) => {
  const { name, value } = e.target;
  setChild(prevChild => ({
    ...prevChild,
    parent: {
      ...prevChild.parent,
      [name]: value
    }
  }));
};

const handleSectionChange = (e) => {
  const { name, value } = e.target;
  setChild(prevChild => ({
    ...prevChild,
    section: {
      ...prevChild.section,
      [name]: value
    }
  }));
};

//----------------------- data save/cancel ---------------------------

  const handleSave = async () => {  // to be made
  /*
    const confirmation = window.confirm('Are you sure you want to save this account?');
    if (confirmation) {
      try {
        await axios.post(`http://localhost:8081/staff/save/`, staff);
        console.log('Staff account saved successfully:', staff);
      } catch (error) {
        console.error('Error creating staff data:', error, '\n please try again.');
      }
    } else {
      console.log('Save operation canceled');
    }*/
  };

  const handleCancel = () => {
    const confirmation = window.confirm('Are you sure you want to cancel?');
    if (confirmation) {
      // Redirect logic here
      window.location.href = '/#';
    }
  };


//---------------------- photo rendering -----------------------

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
      const childForm = document.getElementById('childForm');
      const parentForm = document.getElementById('parentForm');
      
      if (childForm && parentForm) {
        const isChildFormValid = childForm.checkValidity();
        const isParentFormValid = parentForm.checkValidity();
        setIsFormValid(isChildFormValid && isParentFormValid);
      }
    };

    handleFormValidity();
  }, [child]);



  
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
                <h3>Create a new Account :</h3>
              </div>
            </div> 
            <div className='subTitle'>
              <h3> child informations :</h3>
            </div> 
            <div className='editContainer'>
              <div className='photoContainer'>
                <div className='photo'>
                  <img src={photoPreview || 'xyz.jpg'} alt="PFP" />
                </div>
                <div className='uploadButton'>
                    <label htmlFor="file-upload" className="custom-file-upload">
                        change pfp
                    </label>
                    <input id="file-upload" type="file" onChange={handleImageChange}/>
                </div>
              </div>
              <div className='mainEdit'>
                <form id="childForm" className='subEdit' method='post'>
                  <div className='halfEdit'>
                    <div className='formGroup'>
                      <label>First Name:</label>
                      <div className="text">
                      <input className='input' type='text' name='firstName' onChange={handleChildChange} value={child.firstName} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Last Name:</label>
                      <div className="text">
                      <input className='input' type='text' name='lastName' onChange={handleChildChange} value={child.lastName} required/>
                      </div>
                    </div>
                    
                    <div className='formGroup'>
                      <label>Birthdate:</label>
                      <div className="text">
                      <input className='input' type='date' name='birthdate' onChange={handleChildChange} value={child.birthdate} required/>
                      </div>
                    </div>
                  </div>
                  <div className='halfEdit'>
                    <div className='formGroup'>
                      <label>Gender:</label>
                      <div className="text">
                      <select className="input" name='gender' onChange={handleChildChange} value={child.gender} required>
                        <option className="input" selected> --- </option>
                        <option className="input" value='male'>Male</option>
                        <option className="input" value='female'>Female</option>
                      </select>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Section:</label>
                      <div className="text">
                        <select className="input" name='type' onChange={handleSectionChange} value={child.section.id} required>
                          <option> --- </option>
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='subTitle2'>
              <h3> Parent informations :</h3>
            </div> 
            <div className='editContainer' style={{marginBottom: '20px'}}>
              <div className='photoContainer'>
                <div className='photo'
                 style={{
                  background: 'transparent',
                  boxShadow: 'none',
                  border: 'none'
                }}>
                </div>
              </div>
              <div className='mainEdit'>
                <form id="parentForm" className='subEdit' method='post'>
                  <div className='halfEdit'>
                    <div className='formGroup'>
                      <label>First Name:</label>
                      <div className="text">
                      <input className='input' type='text' name='firstName' onChange={handleParentChange} value={child.parent.firstName} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Last Name:</label>
                      <div className="text">
                      <input className='input' type='text' name='lastName' onChange={handleParentChange} value={child.parent.lastName} required/>
                      </div>
                    </div>
                    
                    <div className='formGroup'>
                      <label>Birthdate:</label>
                      <div className="text">
                      <input className='input' type='date' name='birthdate' onChange={handleParentChange} value={child.parent.birthdate} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Gender:</label>
                      <div className="text">
                      <select className="input" name='gender' onChange={handleParentChange} value={child.parent.gender} required>
                        <option className="input" selected> --- </option>
                        <option className="input" value='MALE'>Male</option>
                        <option className="input" value='FEMALE'>Female</option>
                      </select>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Phone Number:</label>
                      <div className="text">
                      <input className='input' type='number' name='phoneNumber' onChange={handleParentChange} value={child.parent.phoneNumber} required/>
                      </div>
                    </div>
                  </div>
                  <div className='halfEdit'>
                    <div className='formGroup'>
                      <label>User-name:</label>
                      <div className="text">
                      <input className='input' type='text' name='username' onChange={handleParentChange} value={child.parent.username} required/>
                      </div>
                    </div>                    
                    <div className='formGroup'>
                      <label>Address:</label>
                      <div className="text">
                      <input className='input' type='address' name='address' onChange={handleParentChange} value={child.parent.address} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Email:</label>
                      <div className="text">
                      <input className='input' type='email' name='email' onChange={handleParentChange} value={child.parent.email} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Password:</label>
                      <div className="text">
                      <input className='input' type='password' name='password' onChange={handleParentChange} value={child.parent.password} required/>
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

export default page;