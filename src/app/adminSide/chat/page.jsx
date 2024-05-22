"use client"
import Navbar from '../../../component/navbar/Navbar';
import Sidebar from '../../../component/sidebar/Sidebar';
import React, {useState, useEffect} from 'react'
import { Session, Inbox } from "@talkjs/react";
import './chat.css'


const page = () => {
const [parentChat, setParentChat] = useState();


  return (
    <>
    <main>
      <div className='home'>

        <div className="dashboard">
          <Sidebar />
        </div>
        <div className='content'>
          <Navbar/>
          <div className='mainContent'>
            <div className='chatContainer'>
              <div className='toggleWindow'>
                <div className='btnContainer'>
                  <button className='toggleBtn'
                  style={{ background: parentChat ? 'lightblue' : 'transparent', color: parentChat ? 'white' : '#000000' }}
                   onClick={() => {
                    setParentChat(true);
                    console.log(parentChat);
                 }
               }>Parents Chat</button>
                </div>
                <div className='btnContainer'>
                  <button className='toggleBtn'
                   onClick={() => {
                    setParentChat(false);
                    console.log(parentChat);
                 }} 
                 style={{ background: !parentChat ? 'lightblue' : 'transparent', color: !parentChat ? 'white' : '#000000' }
                 }>Team Chat</button>
                </div>
                
              </div>
              <div className='chatWindow'>
                  {parentChat ? (
                      <div id="talkjs-container"
                       style={{width: '100%', margin: '30px', height: '500px'}}>
                          <Session appId="tVXZombw" userId="frank">
                              <Inbox className="chat-container" style={{width: '100%', height: '100%' ,padding: '10px'}}/>
                          </Session>
                      </div>
                  ) : (
                      <div id="talkjs-container" 
                      style={{width: '100%', margin: '30px', height: '500px'}}>
                          <Session appId="tVXZombw" userId="sample_user_sebastian">
                              <Inbox className="chat-container" style={{width: '100%', height: '100%' ,padding: '10px'}}/>
                          </Session>
                      </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}


export default page