"use client";
import React from 'react';
import Link from 'next/link';
import "./ParentTable.css";

const ParentTable = ({ parents }) => {
  return (
    <>
      {parents.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">fname</th>
              <th scope="col">lname</th>
              <th scope="col">Birthdate</th>
              <th scope="col">Gender</th>
              <th scope="col">phoneNumber</th>
              <th scope="col">email</th>
              <th scope="col">username</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {parents.map((parent) => (
              <tr key={parent.id}>
                <td>{parent.id}</td>
                <td>{parent.firstName}</td>
                <td>{parent.lastName}</td>
                <td>{parent.birthdate}</td>
                <td>{parent.gender}</td>
                <td>{parent.phoneNumber}</td>
                <td>{parent.email}</td>
                <td>{parent.username}</td>
                <td>
                  <button className="validate tableBtn">
                    <Link className="link" href={'./manageParents/' + parent.id}>add Child</Link>
                  </button>
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

export default ParentTable;
