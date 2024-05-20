"use client";
import Navbar from '../../../../component/navbar/Navbar';
import Sidebar from '../../../../component/sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import './edit.css'

export default function Edit({params}) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPayFormValid, setIsPayFormValid] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [billing, setBilling] = useState(true);
  const [innitchild, setInnitChild] = useState({
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
    childRegistration:{
      payed:'',
      lastPaymentDate:'',
      paymentMethode:'',
      amount:'',
    }
  });

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
    id: '',
    firstName: "",
    lastName: "",
    birthdate: "",
    gender: "",
    status: "",
    section: {
      id: '',
      sectionName: "",
      sectionPlaces:"",
      ages: ""
    }
  });

   const [payment, setPayment] = useState({
    childRegistration:{
      payed:'',
      lastPaymentDate:'',
      paymentMethode:'',
      amount:'',
    }
   })

  const calculateReduction = () => {
    switch (payment.childRegistration.amount) {
      case '13000.00':
        return 0;
      case '24700.00':
        return 5; // 5% reduction for 2 months
      case '35100.00':
        return 10; // 10% reduction for 3 months
      case '66300.00':
        return 15; // 15% reduction for 6 months
      case '83200.00':
        return 20; // 20% reduction for 8 months
      default:
        return 0; // Default reduction is 0%
    }
  };
  const calculatePrice = () => {
    switch (payment.childRegistration.amount) {
      case '13000.00':
        return 13000.00;
      case '24700.00':
        return 26000.00; // 5% reduction for 2 months
      case '35100.00':
        return 39000.00; // 10% reduction for 3 months
      case '66300.00':
        return 78000.00; // 15% reduction for 6 months
      case '83200.00':
        return 104000.00; // 20% reduction for 8 months
      default:
        return 0; // Default reduction is 0%
    }
  };
  const reductionPercentage = calculateReduction();
  const price = calculatePrice();

  useEffect(() => {
    async function fetchData() { // to be made
      try {

       
        const childResponse = await axios.get(`http://localhost:8081/Children/child/${params.edit}`);
        setInnitChild(childResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [params.edit]);

  useEffect(() => {
    async function fetchChildData() {
      if (innitchild.id && innitchild.parent.id) {
        try {
          // Fetching child and parent data
          const [childResponse, parentResponse] = await Promise.all([
            axios.get(`http://localhost:8081/Children/child/${innitchild.id}`),
            axios.get(`http://localhost:8081/parents/parent/${innitchild.parent.id}`)
          ]);

          // Create filtered child object
          const filteredChildData = Object.keys(childResponse.data)
            .filter(key => Object.keys(child).includes(key))
            .reduce((obj, key) => {
              obj[key] = childResponse.data[key];
              return obj;
            }, {});

          // Create filtered parent object
          const filteredParentData = Object.keys(parentResponse.data)
            .filter(key => Object.keys(parent).includes(key))
            .reduce((obj, key) => {
              obj[key] = parentResponse.data[key];
              return obj;
            }, {});

          // Setting fetched data to state
          setChild({
            ...filteredChildData
          });
          setParent({
            ...filteredParentData
          });

        } catch (error) {
          console.error('Error fetching child or parent data:', error);
        }
      }
    }

    fetchChildData();
  }, [innitchild.id, innitchild.parent.id]);

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
    setParent(prevParent => ({
      ...prevParent,
      [name]: value
    }));
  };


const handlePaymentChange = (e) => {
  const { name, value } = e.target;
  setPayment(prevPayment => ({
    ...prevPayment,
    childRegistration: {
      ...prevPayment.childRegistration,
      [name]: value
    }
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


//----------------------- data save/cancel ---------------------------

  const handleSave = async () => { // to be made
  
    const confirmation = window.confirm('Are you sure you want to save these changes ?');
    if (confirmation) {
      try {
        await axios.put(`http://localhost:8081/Children/child/update`, child);
        console.log('Child account saved successfully:', child);
        await axios.put(`http://localhost:8081/parents/parent/update`, parent);
        console.log('Child account saved successfully:', parent);
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
      window.location.href = '/manageDigitalFile';
    }
  };

const handleSavechildRegistration = async () => {

  const confirmation = window.confirm('Are you sure you want to save these changes ?');
    if (confirmation) {
      try {
        await axios.put(``);
        console.log('');
      } catch (error) {
        console.error('Error updating, data:', error, '\n please try again.');
      }
    } else {
      console.log('Save operation canceled');
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

  useEffect(() => {
    const handleFormValidity = () => {
      const payForm = document.getElementById('paymentForm2');
      
      if (payForm) {
        const isFormValid = payForm.checkValidity();
        setIsPayFormValid(isFormValid);
      }
    };

    handleFormValidity();
  }, [payment]);

  






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
                <a href={'/adminSide/manageDigitalFile'}>
                  <ArrowBackIosRoundedIcon className='btn'></ArrowBackIosRoundedIcon>
                </a>
              </div> 
              <div className='title'>
                <h3>Edit Digital File(child's Side) :</h3>
              </div>
            </div> 
            <div className='btnContainer'>
              <button className='toggleBtn' onClick={() => setBilling(!billing)}>
                <h3>toggle billing</h3>
              </button>
            </div>
            { billing ? (
             <>
              <div className='subTitle'>
                <h3> child informations :</h3>
              </div> 
              <div className='editContainer'>
                <div className='photoContainer'>
                  <div className='photo'>
                    <img src={photoPreview || 'xyz.jpg'} alt="image" />
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
                          <option className="input" value='MALE'>Male</option>
                          <option className="input" value='FEMALE'>Female</option>
                        </select>
                        </div>
                      </div>
                      <div className='formGroup'>
                        <label>Section:</label>
                        <div className="text">
                          <select className="input" name='type' onChange={handleSectionChange} value={child.section.id} required>
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
                <h3> Payement Status :</h3>
              </div> 
              <div className='editContainer'>
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
                  <form id="paymentForm1" className='subEdit' method='post'>
                    <div className='halfEdit'>
                      <div className='formGroup'>
                        <label>payment Methode:</label>
                        <div className="text">
                          <input className='input' type='text' name='paymentMethode' /*onChange={handlePayementChange}*/ value={innitchild.childRegistration.paymentMethode} disabled/>
                        </div>
                      </div>
                      <div className='formGroup'>
                        <label>last Payment Date:</label>
                        <div className="text">
                          <input className='input' type='date' name='lastPaymentDate' /*onChange={handlePayementChange}*/ value={innitchild.childRegistration.lastPaymentDate} disabled/>
                        </div>
                      </div>
                    </div>
                    <div className='halfEdit'>
                      <div className='formGroup'>
                        <label>Amount Payed:</label>
                        <div className="text">
                          <input className='input' type='number' name='amount' /*onChange={handlePayementChange}*/ value={innitchild.childRegistration.amount} disabled/>
                        </div>
                      </div>
                      <div className='formGroup'>
                        <label>Payed ?:</label>
                        <div className="text">
                          <input className='input' type='text' name='payed' /*onChange={handlePayementChange}*/ value={innitchild.childRegistration.payed} disabled/>
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
                          <button className='save' type='button' onClick={handleSave} /*disabled={!isFormValid}*/>Save</button>
                        </div>
                        <div className='btnBox'>
                          <button className='cancel' type='button' onClick={handleCancel}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div> </>) : (
              <>
                <div className='subTitle'>
                  payement form :
                </div>
                <div className='editContainer'>
                  <form id="paymentForm2" className='subEdit' method='post'>
                    <div className='halfEdit'>
                      <div className='formGroup'>
                        <label>last Payment Date:</label>
                        <div className="text">
                        <input className='input' type='date' name='lastPaymentDate' /*onChange={handlePayementChange}*/ value={innitchild.childRegistration.lastPaymentDate} disabled/>
                        </div>
                      </div>
                      <div className='formGroup'>
                        <label>Last Payment:</label>
                        <div className="text">
                        <input className='input' type='number' name='amount' /*onChange={handlePayementChange}*/ value={innitchild.childRegistration.amount} disabled/>
                        </div>
                      </div>
                      <div className='formGroup'>
                        <label>Payed ?:</label>
                        <div className="text">
                          <input className='input' type='text' name='payed' /*onChange={handlePayementChange}*/ value={innitchild.childRegistration.payed} disabled/>
                        </div>
                      </div>
                      <div className='formGroup'>
                        <label>payment Methode:</label>
                        <div className="text">
                        <select className="input" name='paymentMethode' onChange={handlePaymentChange} value={payment.childRegistration.paymentMethode}>
                          <option className="input" value=''> --- </option>
                          <option className="input" value='CASH'>Cash</option>
                          <option className="input" value='CreditCard'>Credit Card</option>
                        </select>
                        </div>
                      </div>
                      <div className='formGroup'>
                        <label>Payment Choice:</label>
                        <div className="text">
                        <select className="input" name='amount' onChange={handlePaymentChange} value={payment.childRegistration.amount}>
                          <option className="input" value=''>-- 1 month = 13000.00 (DZD) --</option>
                          <option className="input" value='13000.00'>1 month</option>
                          <option className="input" value='24700.00'>2 months (-5%)</option>
                          <option className="input" value='35100.00'>3 months (-10%)</option>
                          <option className="input" value='66300.00'>6 months (-15%)</option>
                          <option className="input" value='83200.00'>8 months (-20%)</option>
                        </select>
                        </div>
                      </div>
                    </div>
                    <div className='halfEdit'>
                        <div className='payementinfo'>
                          <p>Registration fees</p>
                          <p>(DZD) {payment.childRegistration.amount ? price : "0.00"}</p>
                        </div>
                        <div className='payementinfo'>
                          <p>reduction</p>
                          <p>{reductionPercentage}%</p>
                        </div>
                        <div className='payementinfo'>
                          <p>special offers ?</p>
                          <p>{"-0.00"}</p>
                        </div>
                        <div className='payementinfo'>
                          <h3>Total :</h3>
                          <h4>(DZD) {payment.childRegistration.amount ? (payment.childRegistration.amount) : "0.00"}</h4>
                        </div>
                        <div className='formGroup'>
                          <label></label>
                          <div style={{width: '100%', height: ''}}>
                          </div>
                        </div>
                        <div className='formButtons'>
                        <div className='btnBox'>
                          <button className='save' type='button' onClick={handleSavechildRegistration} disabled={!isPayFormValid}>Save</button>
                        </div>
                        <div className='btnBox'>
                          <button className='cancel' type='button' onClick={handleCancel}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </>)}



          </div>
        </div>
      </div>
    </main>
  );
}



