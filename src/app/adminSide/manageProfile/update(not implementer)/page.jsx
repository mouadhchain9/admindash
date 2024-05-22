'use client'
import Navbar from '@/component/navbar/Navbar'
import Sidebar from '@/component/sidebar/Sidebar'
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import "./update.css";
// Remove the import statement for react-router-dom

const Page = () => {
  const navigate = useRouter(); // Import useRouter from next/router
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    birth:"",
    adress: "",
    gender:"",
   
  });
// const {id} =useParams();

  const { fname, lname, birth,adress,gender } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     await axios.put(`http://localhost:8080/user/${id}`, user);
//    // navigate("/");
//   };

//   const loadUser = async () => {
//    const result = await axios.get(`http://localhost:8080/user/${id}`);
//     setUser(result.data);
//   };



  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Edit User</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  fname
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your firstname"
                  name="name"
                  value={fname}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lname" className="form-label">
                lname
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your last name"
                  name="lname"
                  value={lname}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="adress" className="form-label">
                  Adress
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your adress"
                  name="adress"
                  value={adress}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your adress"
                  name="adress"
                  value={adress}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Bithdate" className="form-label">
                 Birthdate
                </label>
                <input
                  type={"date"}
                  className="form-control"
                  placeholder="Enter your birthdate"
                  name="birth"
                  value={birth}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="btn-container">
                <button type="submit" className="btn btn-outline-primary">
                  Submit
                </button>
                <Link href="/adminSide/manageProfile" className="cancel-link mx-2">
  Cancel
</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
