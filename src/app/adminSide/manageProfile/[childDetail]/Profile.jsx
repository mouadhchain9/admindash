import React from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ profiles, type, id }) => {
  const filteredProfiles = profiles.filter(profile => profile.profileType === type);

  const profile = {
    idProfile: '',
    idchild: id,
    profileType: type,
    description: 'no description yet'
  }

  const createProfile = async () => {
    try {
      const response = await axios.post('http://localhost:8081/Children/childProfile/add', profile);
      // Handle success if needed
      console.log('Profile created:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  if (filteredProfiles.length === 0) {
    return (
      <div className="btnContainer">
        <p className="message2">No profile found for {type} type</p>
        <button className="btn2" onClick={createProfile}>Create Profile</button>
      </div>
    );
  }

  if (type === 'EDUCATIONAL') {
    return (
      <div className="Prodesc">
        {filteredProfiles.map((profile, index) => (
          <div key={index}>
            <h2>Description :</h2>
            <p style={{
              padding: "10px 20px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}>{profile.description}</p>
            <h2 style={{paddingTop: "10px"}}>Evaluations :</h2>
            <div className="info" style={{padding: "10px"}}>
              <div className="infoBox">
                {profile.child.evaluations.map((evaluation) => (
                      <p key={evaluation.id}><span className="label">{evaluation.nameE}</span>{evaluation.description}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="Prodesc">
      {filteredProfiles.map((profile, index) => (
        <div key={index}>
          <h2 style={{paddingTop: "10px"}}>Description:</h2>
          <p style={{
              padding: "10px 20px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}>{profile.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
