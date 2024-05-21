"use client"
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Navbar from '../../../../component/navbar/Navbar';
import Sidebar from '../../../../component/sidebar/Sidebar';
import { useRouter } from 'next/Navigation';
import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import './edit.css'

export default function edit({params}) {

  const router = useRouter();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [initFetch,setInitFetch] = useState({
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

  useEffect(() => {
    async function fetchData() {
      try {
        const staffResponse = await axios.get(`http://localhost:8081/users/${params.edit}`);
        
        const userRoles = staffResponse.data.roles.map(role => role.roleName);
        const userRole = userRoles.length > 0 ? userRoles[0] : '';
        
        setInitFetch({
        id: staffResponse.data.id,
        firstName: staffResponse.data.firstName,
        lastName: staffResponse.data.lastName,
        birthdate: staffResponse.data.birthdate,
        gender: staffResponse.data.gender,
        phoneNumber: staffResponse.data.phoneNumber,
        address: staffResponse.data.address,
        email: staffResponse.data.email,
        username: staffResponse.data.username,
        password: staffResponse.data.password,
        roles: userRole,
      });
        setStaff({
        id: staffResponse.data.id,
        firstName: staffResponse.data.firstName,
        lastName: staffResponse.data.lastName,
        birthdate: staffResponse.data.birthdate,
        gender: staffResponse.data.gender,
        phoneNumber: staffResponse.data.phoneNumber,
        address: staffResponse.data.address,
        email: staffResponse.data.email,
        username: staffResponse.data.username,
        password: staffResponse.data.password,
        roles: userRole,
      });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [params.edit]);


  const handleSave = async () => {
    const confirmation = window.confirm('Are you sure you want to save this account?');
    if (confirmation) {
      try {
        await axios.post(`http://localhost:8081/users/add`, staff);

        console.log('Staff account edited successfully:', staff);
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



  const handleReset = () => {
    const confirmation = window.confirm('Are you sure you want to reset? You will lose all changes.');
    if (confirmation) {
      setStaff(initFetch);
      setIsFormDirty(false);
      console.log('Form reset successfully');
    } else {
      console.log('Reset operation canceled');
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff(prevStaff => ({
      ...prevStaff,
      [name]: value
    }));
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
            <div className='returnBtn'>
              <div className='returnBtnBox'>
                <a href={'/adminSide/manageStaff'}>
                  <ArrowBackIosRoundedIcon className='btn'></ArrowBackIosRoundedIcon>
                </a>
              </div> 
              <div className='title'>
                <h3>edit Account :</h3>
              </div>
            </div> 
            {successMessage && (
              <div className='alertContainer'>
                <div className="alert">
                  <CheckCircleIcon style={{ marginRight: '10px', color: 'green'}} />
                  <span className="msg"> SUCCESS! user edited successfully, redirecting to previous page...</span>
                </div>
              </div>
            )}
            <div className='editContainer'>
              <div className='photoContainer'>
                <div className='photo'>
                  <img src={photoPreview || 'xyz.jpg'} alt="Profile" />
                </div>
                <div className='uploadButton'>
                    <label htmlFor="file-upload" className="custom-file-upload">
                        change pfp
                    </label>
                    <input id="file-upload" type="file" onChange={handleImageChange}/>
                </div>
              </div>
              <div className='mainEdit'>
                
                  <form className='subEdit'>
                  <div className='halfEdit'>
                    <div className='formGroup'>
                      <label>First Name:</label>
                      <div className="text">
                      <input className='input' type='text' name='firstName' value={staff.firstName} onChange={handleChange} />
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Last Name:</label>
                      <div className="text">
                      <input className='input' type='text' name='lastName' value={staff.lastName} onChange={handleChange} />
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Birthdate:</label>
                      <div className="text">
                      <input className='input' type='date' name='birthdate' value={staff.birthdate} onChange={handleChange} />
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Email:</label>
                      <div className="text">
                      <input className='input' type='email' name='email' value={staff.email} onChange={handleChange} />
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>address:</label>
                      <div className="text">
                      <input className='input' type='text' name='address' value={staff.address} onChange={handleChange} required/>
                      </div>
                    </div>  
                  </div>
                  <div className='halfEdit'>
                    <div className='formGroup'>
                      <label>Gender:</label>
                      <div className="text">
                      <select className="input" name='gender' value={staff.gender} onChange={handleChange}>
                        <option className="input" value='male'>Male</option>
                        <option className="input" value='female'>Female</option>
                      </select>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Type:</label>
                      <div className="text">
                        <select className="input" name='type' value={staff.roles} onChange={handleChange}>
                          <option value='TEACHER'>Educator</option>
                          <option value='PSYCHOLOGIST'>Psychologist</option>
                          <option value='ORTHOPHONIST'>Orthophonist</option>
                        </select>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>user-name:</label>
                      <div className="text">
                      <input className='input' type='text' name='username' value={staff.username} onChange={handleChange} required/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Password:</label>
                      <div className="text">
                      <input className='input' type='password' name='password' value={staff.password} onChange={handleChange} />
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>phone number:</label>
                      <div className="text">
                      <input className='input' type='number' name='phoneNumber' value={staff.phoneNumber} onChange={handleChange} required/>
                      </div>
                    </div>
                    <div className='formButtons'>
                      <div className='btnBox'>
                        <button className='save' type='button' onClick={handleSave}>Save</button>
                      </div>
                      <div className='btnBox'>
                        <button className='reset' type='button' onClick={handleReset}>Reset</button>
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
