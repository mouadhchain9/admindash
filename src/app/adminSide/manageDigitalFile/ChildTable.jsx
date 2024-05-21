import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Corrected import path
import "./ChildTable.css"

const ChildTable = ({ children, filterAges }) => {
  // If filterAges is not provided or empty, render all children
  const filteredChildren = filterAges ? children.filter(child => {
    return filterAges.includes(child.section.ages);
  }) : children;

  return (
    <>
      {filteredChildren.length > 0 ? (
        <table className="table">
          <caption>List of Clients</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">fname</th>
              <th scope="col">lname</th>
              <th scope="col">Birth</th>
              <th scope="col">Gender</th>
              <th scope="col">Section</th>
              <th scope="col">ages</th>
              <th scope="col">Payed ?</th>
              <th scope="col">details</th>
            </tr>
          </thead>
          <tbody>
            {filteredChildren.map(child => (
              // Add a conditional check for non-empty childRegistration array
              child.childRegistration && (
                <tr key={child.id}>
                  <td>{child.id}</td>
                  <td>{child.firstName}</td>
                  <td>{child.lastName}</td>
                  <td>{child.birthdate}</td>
                  <td>{child.gender}</td>
                  <td>{child.section.sectionName}</td>
                  <td>{child.section.ages}</td>
                  <td style={{
                    color: 'white',
                    textShadow: child.childRegistration.payed ? '0 0 5px green' : '0 0 5px red'
                  }}>
                    {child.childRegistration.payed.toString()}
                  </td>
                  <td>
                    <button className="validate tableBtn">
                      <Link className="link" href={'./manageDigitalFile/' + child.id}>edit</Link>
                    </button>
                  </td>
                  {/* Add more table cells as needed */}
                </tr>
              )
            ))}
          </tbody>
        </table>
      ) : (
        <div className="message"><p>No data available</p></div>
      )}
    </>
  );
}

export default ChildTable;
