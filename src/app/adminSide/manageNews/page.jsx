"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../component/navbar/Navbar';
import Sidebar from '../../../component/sidebar/Sidebar';
import './manageNews.css';

const Page = () => {
  const placeholderImage = "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg";
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState({
  title: "",
  newsDate: "",
  description: "",
  newsType: "",
  placeNumber: "",
  price: "",
  PaymentLink: "",
  picLink: ""
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/News/getNews');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    const confirmed = window.confirm('Are you sure you want to delete this ?');
    if (!confirmed) {
      return;
    }

    try {
      console.log('Deleting event with ID:', eventId);
      await axios.delete(`http://localhost:8081/News/deleteNews/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews((prevNews) => ({
      ...prevNews,
      [name]: value
    }));
  };

  const handleSave = async () => {

     const confirmed = window.confirm('Are you sure you want to add this ?');
    if (!confirmed) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/News/addNews', news);


      window.location.reload();
      alert('News added successfully!');
    } catch (error) {
      console.error('Error adding news:', error);
      alert('Failed to add news. Please try again.');
    }
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
            <div className='title'>
              <h2>Manage Newsletter and Offers</h2>
            </div>
            <div className='NewsContainer'>
              {events.map((event, index) => (
                <div key={index} className="NewsItem">
                  <img src={event.picLink} alt={event.title} />
                  <div className="content2">
                    <div className="title">{event.title}</div>
                    <p className="description">{event.description}</p>
                    <p className="date">Date: {new Date(event.newsDate).toLocaleDateString()}</p>
                    <p className="price">Price: {event.price} DA</p>
                  </div>
                  <div className="deleteButton">
                    <button onClick={() => handleDelete(event.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="NewsCreationContainer">
              <form id='NewsForm' className='subContainer' method='post'>
                <div className="firstHalf">
                  <div className="NewsItem" >
                    <img src={news.picLink || placeholderImage} alt={news.title} />
                    <div className="content2">
                      <div className="title">{news.title}</div>
                      <p className="description">{news.description}</p>
                      <p className="date">Date: {news.newsDate && new Date(news.newsDate).toLocaleDateString()}</p>
                      <p className="price">Price: {news.price ? news.price : "0"}.00 DA</p>
                    </div>
                    <div className="deleteButton">
                      <button>Apply</button>
                    </div>
                  </div>
                </div>
                <div className="secondHalf">
                  <div className='formGroup'>
                    <label>Title :</label>
                    <div className="text">
                      <input
                        className='input'
                        type='text'
                        name='title'
                        value={news.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className='formGroup'>
                    <label>newsDate :</label>
                    <div className="text">
                      <input
                        className='input'
                        type='date'
                        name='newsDate'
                        value={news.newsDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className='formGroup'>
                    <label>available Slots :</label>
                    <div className="text">
                      <input
                        className='input'
                        type='number'
                        name='placeNumber'
                        value={news.placeNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className='formGroup'>
                    <label>Description :</label>
                    <div className="text">
                      <textarea
                        name="description"
                        className="comment"
                        rows="10"
                        value={news.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className='formGroup'>
                    <label>pricing :</label>
                    <div className="text">
                      <input
                        className='input'
                        type='number'
                        name='price'
                        value={news.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className='formGroup'>
                    <label>newsType :</label>
                    <div className="text">
                      <select
                        className="input"
                        name='newsType'
                        value={news.newsType}
                        onChange={handleChange}
                        required
                      >
                        <option value=''> --- </option>
                        <option value='EVENT'>Event</option>
                        <option value='ACTIVITY'>Activity</option>
                        <option value='OFFER'>Offer</option>
                      </select>
                    </div>
                  </div>
                  <div className='formGroup'>
                    <label>Picture Link :</label>
                    <div className="text">
                      <textarea
                        className='comment'
                        name='picLink'
                        rows="3"
                        value={news.picLink}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className='formButtons'>
                    <div className='btnBox'>
                      <button className='save' type='button' onClick={handleSave}>Save</button>
                    </div>
                    <div className='btnBox'>
                      <button className='cancel' type='button'>Cancel</button>
                    </div>
                  </div>
                </div>
              </form>
            </div> 
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;