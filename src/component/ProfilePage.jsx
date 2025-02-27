import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar component
import { toast } from "react-toastify"; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const ProfilePage = () => {
  const navigate = useNavigate();

  // Initialize state from localStorage or default to empty values
  const storedProfile = JSON.parse(localStorage.getItem('profileDetails')) || {
    name: "",
    username: "",
    email: "",
    branch: "",
    hobbies: "",
    skills: "",
    year: "",
    description: "",
  };
  
  const storedProfilePic = localStorage.getItem('profilePic');

  const [profilePic, setProfilePic] = useState(storedProfilePic);
  const [profileDetails, setProfileDetails] = useState(storedProfile);

  useEffect(() => {
    // Store profile details and picture in localStorage when they change
    localStorage.setItem('profileDetails', JSON.stringify(profileDetails));
    if (profilePic) {
      localStorage.setItem('profilePic', profilePic);
    }
  }, [profileDetails, profilePic]);

  const handleInputChange = (e) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.name]: e.target.value,
    });

    // Auto-fill username with name if it's empty
    if (e.target.name === "name" && !profileDetails.username) {
      setProfileDetails({
        ...profileDetails,
        username: e.target.value,
      });
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Preview the uploaded image
        toast.success("Profile photo uploaded successfully!", {
          style: {
            color: "black", // Text color
            backgroundColor: "#4caf50", // Green background for success
            fontSize: "16px", // Adjust font size
            borderRadius: "10px", // Rounded corners
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePic = () => {
    setProfilePic(null); // Remove profile picture
    localStorage.removeItem('profilePic'); // Remove profile picture from localStorage
    toast.success("Profile photo removed successfully!", {
      style: {
        color: "black", // Text color
        backgroundColor: "#f44336", // Red background for error
        fontSize: "16px", // Adjust font size
        borderRadius: "10px", // Rounded corners
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to API
    const profileData = {
      ...profileDetails,
      profilePic,
    };

    try {
      const response = await fetch('http://localhost:8000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const result = await response.json();

      // Show success message after saving profile via API
      toast.success("Profile saved successfully!", {
        style: {
          color: "black",
          backgroundColor: "#4caf50",
          fontSize: "16px",
          borderRadius: "10px",
        },
      });

      // Optionally save to localStorage as well
      localStorage.setItem('profileDetails', JSON.stringify(profileDetails));
      if (profilePic) {
        localStorage.setItem('profilePic', profilePic);
      }

    } catch (error) {
      toast.error("Error saving profile. Please try again later.", {
        style: {
          color: "black",
          backgroundColor: "#f44336",
          fontSize: "16px",
          borderRadius: "10px",
        },
      });
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      {/* Navbar */}
      <Navbar />

      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 inline-flex items-center px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600"
        >
          <span className="mr-2">⬅</span> Back
        </button>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <label htmlFor="profile-pic-upload" className="relative cursor-pointer">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-pink-500">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    Upload Profile Pic
                  </div>
                )}
              </div>
            </label>
            <input
              id="profile-pic-upload"
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />

            {/* Remove Profile Pic Button */}
            {profilePic && (
              <button
                onClick={handleRemoveProfilePic}
                className="mt-4 text-red-500 text-sm"
              >
                Remove Profile Picture
              </button>
            )}

            <div className="mt-4 text-center">
              <h1 className="text-2xl font-semibold text-black">{profileDetails.name || "Your Name"}</h1>
              <h2 className="text-lg text-black">@{profileDetails.username || "Username"}</h2>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex justify-around mt-6 text-center">
            <div>
              <h3 className="text-2xl font-bold text-pink-500">10</h3>
              <p className="text-black">Posts</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-pink-500">200</h3>
              <p className="text-black">Followers</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-pink-500">180</h3>
              <p className="text-black">Following</p>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {[{ label: "Name", name: "name" },
              { label: "Username", name: "username" },
              { label: "College Email ID", name: "email" },
              { label: "Branch", name: "branch" },
              { label: "Hobbies", name: "hobbies" },
              { label: "Skills", name: "skills" },
              { label: "Year", name: "year" }].map((field, idx) => (
              <div key={idx} className="flex flex-col">
                <label className="text-black font-medium">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={profileDetails[field.name]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="p-3 text-black border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
              </div>
            ))}

            {/* New Description Field */}
            <div className="flex flex-col">
              <label className="text-black font-medium">About Yourself</label>
              <textarea
                name="description"
                value={profileDetails.description}
                onChange={handleInputChange}
                placeholder="Tell us a little about yourself"
                className="p-3 text-black border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
