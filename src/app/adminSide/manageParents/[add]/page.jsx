"use client";
import Navbar from '../../../../component/navbar/Navbar';
import Sidebar from '../../../../component/sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import './add.css';

export default function Add({ params }) {
  const [isFormValid, setIsFormValid] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [parent, setParent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    gender: "",
    phoneNumber: "",
    address: "",
    email: "",
    username: "",
    password: "",
    roles: [
      {
        roleName: ""
      }
    ],
    status: ""
  });


  const [child, setChild] = useState({
    id: "",
    idParent: params.add,
    firstName: "",
    lastName: "",
    birthdate: "",
    gender: "MALE",
    status: "VALID",
    section: {
      id: ''
    }
  });


  useEffect(() => {
    async function fetchPreRegData() {
      try {
        const preRegResponse = await axios.get(`http://localhost:8081/parents/parent/${params.add}`);
        setParent(preRegResponse.data);
      } catch (error) {
        console.error('Error fetching pre-registration data:', error);
      }
    }

    fetchPreRegData();
  }, [params.add]);


  // Change handlers for fields
  const handleChildChange = (e) => {
    const { name, value } = e.target;
    setChild(prevChild => ({
      ...prevChild,
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

        // Log the child payload
        console.log('Child payload to be sent:', child);
        
        // Save child
        const childResponse = await axios.post(`http://localhost:8081/parents/parent/Addchild`, child);
        console.log('Child account saved successfully:', childResponse.data);
  
        router.push('./adminSide/manageParents');
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
      const childForm = document.getElementById('childForm');
      const parentForm = document.getElementById('parentForm');
      
      if (childForm && parentForm) {
        const isChildFormValid = childForm.checkValidity();
        const isParentFormValid = parentForm.checkValidity();
        setIsFormValid(isChildFormValid && isParentFormValid);
      }
    };

    handleFormValidity();
  }, [child, parent]);


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
                <h3>Add new Child :</h3>
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
                        <option className="input" value='male'>Male</option>
                        <option className="input" value='female'>Female</option>
                      </select>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Section:</label>
                      <div className="text">
                        <select className="input" name='section' onChange={handleSectionChange} value={child.section.id} required>
                          <option value='1'>Infants --- 3 month- 1 Year</option>
                          <option value='2'>mini-Toddlers --- 1 Year- 2 Years</option>
                          <option value='3'>Toddlers --- 2 Year- 3 Years</option>
                          <option value='4'>Preschoolers --- 4 Years- 5 Years</option>
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
            <div className='editContainer' style={{marginBottom: ''}}>
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
                      <input className='input' type='text' name='firstName' value={parent.firstName} disabled/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Last Name:</label>
                      <div className="text">
                      <input className='input' type='text' name='lastName' value={parent.lastName} disabled/>
                      </div>
                    </div>
                    
                    <div className='formGroup'>
                      <label>Birthdate:</label>
                      <div className="text">
                      <input className='input' type='date' name='birthdate' value={parent.birthdate} disabled/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Gender:</label>
                      <div className="text">
                      <select className="input" name='gender' value={parent.gender} disabled>
                        <option className="input" value='MALE'>Male</option>
                        <option className="input" value='FEMALE'>Female</option>
                      </select>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Phone Number:</label>
                      <div className="text">
                      <input className='input' type='number' name='phoneNumber' value={parent.phoneNumber} disabled/>
                      </div>
                    </div>
                  </div>
                  <div className='halfEdit'>
                    <div className='formGroup'>
                      <label>User-name:</label>
                      <div className="text">
                      <input className='input' type='text' name='username' value={parent.username} disabled/>
                      </div>
                    </div>                    
                    <div className='formGroup'>
                      <label>Address:</label>
                      <div className="text">
                      <input className='input' type='address' name='address' value={parent.address} disabled/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Email:</label>
                      <div className="text">
                      <input className='input' type='email' name='email' value={parent.email} disabled/>
                      </div>
                    </div>
                    <div className='formGroup'>
                      <label>Password:</label>
                      <div className="text">
                      <input className='input' type='password' name='password' value={parent.password} disabled/>
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
            <div className='subTitle2' style={{borderTop: ''}}>
              <h3> Payement information :</h3>
            </div> 
            <div className='editContainer' style={{marginBottom: '20px'}} >
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
                <form id="parentForm" className='subEdit' style={{}}>
                  <div className='halfEdit'>
                  </div>
                  <div className='halfEdit'>
                  <div className='payementinfo'>
                    <p>Registration fees (1 month)</p>
                    <p>(DZD) 13000.00</p>
                  </div>
                  <div className='payementinfo'>
                    <p>Pre-Registration(-2000DZD) ?</p>
                    <p>{"no"}</p>
                  </div>
                  <div className='payementinfo'>
                    <p>special offers ?</p>
                    <p>{"-0.00"}</p>
                  </div>
                  <div className='payementinfo'>
                    <h3>Total :</h3>
                    <h4>(DZD) 11000.00</h4>
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