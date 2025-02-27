import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewProfile = () => {
  const { id } = useParams();  // Access the dynamic 'id' parameter
  const [profileData, setProfileData] = useState(null);

  // Mock data for demonstration
  const mockProfiles = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', bio: 'Software Engineer with a passion for coding and technology.' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', bio: 'Full-stack developer and tech enthusiast.' },
    { id: '3', name: 'Sam Brown', email: 'sam.brown@example.com', bio: 'Data scientist working on machine learning and AI.' },
  ];

  useEffect(() => {
    console.log(`Fetching profile for ID: ${id}`);  // Debugging log
    const profile = mockProfiles.find((profile) => profile.id === id);
    if (profile) {
      setProfileData(profile);
    } else {
      console.log(`Profile with ID ${id} not found.`);
    }
  }, [id]);

  if (!profileData) {
    return <div>Profile not found or loading...</div>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Profile of {profileData.name}</h1>
      <p><strong>Email:</strong> {profileData.email}</p>
      <p><strong>Bio:</strong> {profileData.bio}</p>
      {/* Add other profile details here */}
      
      <div style={{ marginTop: '20px' }}>
        <button style={{ padding: '10px 20px', cursor: 'pointer' }} onClick={() => window.history.back()}>Back to Previous Page</button>
      </div>
    </div>
  );
};

export default ViewProfile;
