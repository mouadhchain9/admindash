import React from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ profiles, type }) => {
  const filteredProfiles = profiles.filter(profile => profile.profileType === type);

  const createProfile = async () => {
    try {
      const response = await axios.post(`http://localhost:8081/children/child/profiles/createprofile/${type}`);
      // Handle success if needed
      console.log('Profile created:', response.data);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  if (filteredProfiles.length === 0) {
    return (
      <div className="btnContainer">
        <p className="message2">No profile found for {type} type </p>
        <button className="btn2" onClick={createProfile}>Create Profile</button>
      </div>
    );
  }

  return (
    <div>
      {filteredProfiles.map((profile, index) => (
        <div key={index}>
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
