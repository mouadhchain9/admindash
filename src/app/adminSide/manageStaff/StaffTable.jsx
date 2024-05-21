'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import "./StaffTable.css";
import axios from 'axios';

const StaffTable = ({ staff, filterType }) => {
  const [updatedStaff, setUpdatedStaff] = useState(staff);

  // Filter out staff with the role "PARENT"
  const filteredStaff = updatedStaff.filter(member => member.roles !== 'PARENT');

  // Apply additional filtering based on filterType
  const displayedStaff = filterType ? filteredStaff.filter(member => member.roles === filterType) : filteredStaff;

  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this staff member?');
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:8081/users/delete/${id}`);
        const updatedList = updatedStaff.filter(member => member.id !== id);
        setUpdatedStaff(updatedList);
      } catch (error) {
        console.error('Error deleting staff member:', error);
      }
    }
  };

  return ( 
    <>
    {displayedStaff && displayedStaff.length > 0 ? (
      <table className="table">
        <caption>List of Clients</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">fname</th>
            <th scope="col">lname</th>
            <th scope="col">Birth</th>
            <th scope="col">Gender</th>
            <th scope="col">email</th>
            <th scope="col">phoneNumber</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {displayedStaff.map(staff => (
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.firstName}</td>
              <td>{staff.lastName}</td>
              <td>{staff.birthdate}</td>
              <td>{staff.gender}</td>
              <td>{staff.email}</td>
              <td>{staff.phoneNumber}</td>
              <td>
                <button className="btn">
                  <Link href={'./manageStaff/' + staff.id }>edit</Link>
                </button>
                <button className="btn" onClick={() => handleDelete(staff.id)}>delete</button>
              </td>
            </tr>
          ))}     
        </tbody>
      </table>
    ) : (
      <div className="message"><p>No data available</p></div>
    )}
    </>
  );
}

export default StaffTable;
