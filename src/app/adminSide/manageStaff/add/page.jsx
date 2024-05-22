"use client";
import Navbar from '../../../../component/navbar/Navbar';
import Sidebar from '../../../../component/sidebar/Sidebar';
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/Navigation';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './add.css'


const page = () => {

  const router = useRouter();
  const [isFormValid, setIsFormValid] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [staff, setStaff] = useState({
    id:'',
    firstName: "",
    lastName: "",
    birthdate: '',
    gender: '',
    phoneNumber: '',
    address: '',
    email: "",
    username: '',
    password: '',
    roles: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff(prevStaff => ({
      ...prevStaff,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const confirmation = window.confirm('Are you sure you want to save this account?');
    if (confirmation) {
      try {
        await axios.post(`http://localhost:8081/users/add`, staff);

        console.log('Staff account saved successfully:', staff);
        setSuccessMessage(true);

        setTimeout(() => {
          router.push('/adminSide/manageStaff'); // Redirect after 3 seconds
        }, 3000); 
      } catch (error) {
        console.error('Error creating staff data:', error, '\n please try again.');
      }
    } else {
      console.log('Save operation canceled');
    }
  };

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
  
  useEffect(() => {
    const handleFormValidity = () => {
      const form = document.getElementById('staffForm');
      if (form) {
        setIsFormValid(form.checkValidity());
      }
    };

    handleFormValidity();
  }, [staff]);


  
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
                <a href={'/adminSide/manageStaff'}>
                  <ArrowBackIosRoundedIcon className='btn'></ArrowBackIosRoundedIcon>
                </a>
              </div> 
              <div className='title'>
                <h3>Create a new Account :</h3>
              </div>
            </div> 
            {successMessage && (
              <div className='alertContainer'>
                <div className="alert">
                  <CheckCircleIcon style={{ marginRight: '10px', color: 'green'}} />
                  <span className="msg"> SUCCESS! user created successfully, redirecting to previous page...</span>
                </div>
              </div>
            )}
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
                
                  <form id="staffForm" className='subEdit' method='post'>
                  <div className='halfEdit'>
                    <div className='formGroup'>
                      <label>First Name:</label>
                      <div className="text">
                      <input className='input' type='text' name='firstName' onChange={handleChange} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Last Name:</label>
                      <div className="text">
                      <input className='input' type='text' name='lastName' onChange={handleChange} required/>
                      </div>
                    </div> 
                    <div className='formGroup'>
                      <label>Birthdate:</label>
                      <div className="text">
                      <input className='input' type='date' name='birthdate' onChange={handleChange} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Email:</label>
                      <div className="text">
                      <input className='input' type='email' name='email' onChange={handleChange} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>address:</label>
                      <div className="text">
                      <input className='input' type='text' name='address' onChange={handleChange} required/>
                      </div>
                    </div> 
                  </div>
                  <div className='halfEdit'>
                    <div className='formGroup'>
                      <label>Gender:</label>
                      <div className="text">
                      <select className="input" name='gender' onChange={handleChange} required>
                        <option defaultValue> --- </option>
                        <option className="input" value='MALE'>Male</option>
                        <option className="input" value='FEMALE'>Female</option>
                      </select>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Type:</label>
                      <div className="text">
                        <select className="input" name='roles' onChange={handleChange} required>
                          <option defaultValue> --- </option>
                          <option value='TEACHER'>Educator</option>
                          <option value='PSYCHOLOGIST'>Psychologist</option>
                          <option value='ORTHOPHONIST'>Orthophonist</option>
                        </select>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>user-name:</label>
                      <div className="text">
                      <input className='input' type='text' name='username' onChange={handleChange} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Password:</label>
                      <div className="text">
                      <input className='input' type='password' name='password' onChange={handleChange} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>phone number:</label>
                      <div className="text">
                      <input className='input' type='number' name='phoneNumber' onChange={handleChange} required/>
                      </div>
                    </div>
                    <div className='formButtons'> 
                      <div className='btnBox'>
                        <button className='save' type='button' onClick={handleSave} disabled={!isFormValid}>Save</button>
                      </div>
                      <div className='btnBox'>
                        <button className='cancel' type='button'>
                          <Link className='cancelBtn'
                          /*style={{textDecoration: 'none', color: 'black'}}*/
                           href={'/adminSide/manageStaff'}>Cancel</Link>
                        </button>
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
