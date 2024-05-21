import React, { useState, useEffect } from "react";
import "./badge.css";
import Image from "next/image";
import Base64Image from "./Base64Image";
import axios from "axios";
import profile from "../../../public/pic/profile.jpg";

export default function Badge({ child }) {



  const [data, setData] = useState(null);
const [open,seOpen] =useState(true);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
     
        const response = await axios.get(
          `http://localhost:8081/Children/qrcode/${child}`,
          {
            headers: {
              // Authorization: `Bearer ${dataa.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data);
      } catch (error) {}
    };

    fetchData();
  }, [child]);


  return (
    
   
      <div className="badge">
        <div className="header-badge">
          <h3>Sunshine Daycare</h3>
          <img
            src="https://clipground.com/images/day-care-logo-4.jpg"
            alt="Example Image"
            className="logo"
            width={60}
            style={{backgroundColor: "white"}}/>
        </div>

        {data && (
          <div className="badge-pic">
            <Image src={profile} width={90} height={90} />

            <div>
              <p className="first">first name:</p>
              <p className="scnd">{data.firstName}</p>
              <p className="first">last name:</p>
              <p className="scnd">{data.lastName}</p>
            </div>

            <Base64Image base64Image={data.qrcode} />
          </div>
        )}

        <div></div>

        <p className="id"> 1982932832032</p>
      </div>


  );
}
