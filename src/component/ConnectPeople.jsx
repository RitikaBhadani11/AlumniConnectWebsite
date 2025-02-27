import React, { useState } from "react";
import Navbar from "./Navbar";
import ViewProfile from './ViewProfile';

const dummyUsers = {
  students: [
    {
      id: 1,
      name: "Aarav Sharma",
      role: "Student",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Passionate about AI and ML.",
      linkedin: "https://linkedin.com/in/aaravsharma",
      academicYear: "3rd Year",
      skills: ["AI", "Machine Learning", "Python"],
      isFollowing: false,
    },
    {
      id: 2,
      name: "Sanya Verma",
      role: "Student",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      bio: "Loves coding and web development.",
      linkedin: "https://linkedin.com/in/sanyaverma",
      academicYear: "2nd Year",
      skills: ["React", "JavaScript", "CSS"],
      isFollowing: false,
    },
    {
      id: 3,
      name: "Kabir Singh",
      role: "Student",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      bio: "Aspiring cybersecurity expert.",
      linkedin: "https://linkedin.com/in/kabirsingh",
      academicYear: "4th Year",
      skills: ["Cybersecurity", "Ethical Hacking", "Networking"],
      isFollowing: true,
    },
    {
      id: 4,
      name: "Ishita Roy",
      role: "Student",
      image: "https://randomuser.me/api/portraits/women/30.jpg",
      bio: "AI enthusiast and research student.",
      linkedin: "https://linkedin.com/in/ishitaroy",
      academicYear: "3rd Year",
      skills: ["AI", "Deep Learning", "Python"],
      isFollowing: false,
    },
    {
      id: 5,
      name: "Ritik Joshi",
      role: "Student",
      image: "https://randomuser.me/api/portraits/men/29.jpg",
      bio: "Loves solving DSA problems.",
      linkedin: "https://linkedin.com/in/ritikjoshi",
      academicYear: "2nd Year",
      skills: ["Data Structures", "Algorithms", "C++"],
      isFollowing: true,
    },
  ],
  alumni: [
    {
      id: 6,
      name: "Rohan Mehta",
      role: "Alumni",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      bio: "Software Engineer at Google.",
      linkedin: "https://linkedin.com/in/rohanmehta",
      skills: ["Backend", "Databases", "Cloud Computing"],
      isFollowing: true,
    },
    {
      id: 7,
      name: "Priya Desai",
      role: "Alumni",
      image: "https://randomuser.me/api/portraits/women/52.jpg",
      bio: "Data Scientist at Microsoft.",
      linkedin: "https://linkedin.com/in/priyadesai",
      skills: ["Data Science", "AI", "Python"],
      isFollowing: false,
    },
    {
      id: 8,
      name: "Ankit Bansal",
      role: "Alumni",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      bio: "Full-stack developer at Amazon.",
      linkedin: "https://linkedin.com/in/ankitbansal",
      skills: ["MERN Stack", "React", "Node.js"],
      isFollowing: false,
    },
    {
      id: 9,
      name: "Sneha Kapoor",
      role: "Alumni",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      bio: "Working as a UI/UX Designer at Adobe.",
      linkedin: "https://linkedin.com/in/snehakapoor",
      skills: ["UI/UX", "Figma", "Adobe XD"],
      isFollowing: true,
    },
    {
      id: 10,
      name: "Vikram Rao",
      role: "Alumni",
      image: "https://randomuser.me/api/portraits/men/48.jpg",
      bio: "Cloud Engineer at AWS.",
      linkedin: "https://linkedin.com/in/vikramrao",
      skills: ["Cloud Computing", "AWS", "DevOps"],
      isFollowing: false,
    },
  ],
  faculty: [
    {
      id: 11,
      name: "Dr. Meera Kapoor",
      role: "Faculty",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Professor of Computer Science at XYZ University.",
      linkedin: "https://linkedin.com/in/meerakapoor",
      skills: ["Research", "Cybersecurity", "Data Privacy"],
      isFollowing: true,
    },
    {
      id: 12,
      name: "Dr. Rajesh Khanna",
      role: "Faculty",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      bio: "Expert in AI and Machine Learning.",
      linkedin: "https://linkedin.com/in/rajeshkhanna",
      skills: ["AI", "Deep Learning", "NLP"],
      isFollowing: false,
    },
    {
      id: 13,
      name: "Dr. Neha Sharma",
      role: "Faculty",
      image: "https://randomuser.me/api/portraits/women/40.jpg",
      bio: "Database Systems expert.",
      linkedin: "https://linkedin.com/in/nehasharma",
      skills: ["DBMS", "SQL", "Big Data"],
      isFollowing: true,
    },
    {
      id: 14,
      name: "Dr. Anil Kumar",
      role: "Faculty",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      bio: "Software Engineering professor.",
      linkedin: "https://linkedin.com/in/anilkumar",
      skills: ["Software Development", "Agile", "System Design"],
      isFollowing: false,
    },
    {
      id: 15,
      name: "Dr. Pooja Reddy",
      role: "Faculty",
      image: "https://randomuser.me/api/portraits/women/53.jpg",
      bio: "Expert in AI Ethics and Fairness.",
      linkedin: "https://linkedin.com/in/poojareddy",
      skills: ["AI Ethics", "Bias Detection", "Fair ML"],
      isFollowing: true,
    },
  ],
  researchers: [
    {
      id: 16,
      name: "Dr. Ravi Agrawal",
      role: "Researcher",
      image: "https://randomuser.me/api/portraits/men/60.jpg",
      bio: "Researching Quantum Computing.",
      linkedin: "https://linkedin.com/in/raviagrawal",
      skills: ["Quantum Computing", "Cryptography", "Mathematics"],
      isFollowing: false,
    },
    {
      id: 17,
      name: "Dr. Kavita Menon",
      role: "Researcher",
      image: "https://randomuser.me/api/portraits/women/58.jpg",
      bio: "Focused on NLP advancements.",
      linkedin: "https://linkedin.com/in/kavitamenon",
      skills: ["NLP", "Linguistics", "AI"],
      isFollowing: true,
    },
    {
      id: 18,
      name: "Dr. Arjun Sinha",
      role: "Researcher",
      image: "https://randomuser.me/api/portraits/men/63.jpg",
      bio: "IoT and Smart Cities researcher.",
      linkedin: "https://linkedin.com/in/arjunsinha",
      skills: ["IoT", "Smart Cities", "Embedded Systems"],
      isFollowing: false,
    },
    {
      id: 19,
      name: "Dr. Sanjana Bhatt",
      role: "Researcher",
      image: "https://randomuser.me/api/portraits/women/61.jpg",
      bio: "AI and Healthcare research specialist.",
      linkedin: "https://linkedin.com/in/sanjanabhatt",
      skills: ["AI in Healthcare", "Data Science", "Medical AI"],
      isFollowing: true,
    },
    {
      id: 20,
      name: "Dr. Vishal Chauhan",
      role: "Researcher",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
      bio: "Blockchain and security researcher.",
      linkedin: "https://linkedin.com/in/vishalchauhan",
      skills: ["Blockchain", "Cybersecurity", "Smart Contracts"],
      isFollowing: false,
    },
  ],
};




function WatchProfile({ user, onBack }) {
  return (
    <div className="p-6 flex flex-col items-center">
      <button onClick={onBack} className="mb-4 text-blue-600 font-bold">⬅ Back</button>
      <div className="bg-white shadow-lg rounded-xl p-6 w-96 border border-blue-300">
        <img
          src={user.image}
          alt={user.name}
          className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg mx-auto"
        />
        <div className="text-center mt-4">
          <h2 className="text-2xl font-extrabold text-blue-800">{user.name}</h2>
          <p className="text-lg font-semibold text-black">{user.role}</p>
          {user.academicYear && (
            <p className="text-lg font-medium text-black">{user.academicYear}</p>
          )}
          <p className="text-lg text-black mt-2">{user.bio}</p>
          <p className="text-lg font-bold text-black mt-2">Skills: <span className="font-normal">{user.skills.join(", ")}</span></p>
          <a
            href={user.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-blue-600 text-lg font-bold underline hover:text-blue-900"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
}

function Cards({ user, onToggleFollow, onViewProfile }) {
  return (
    <div className="p-4">
      <div className="w-80 bg-white hover:scale-105 duration-200 shadow-lg rounded-xl p-4">
        <figure className="flex justify-center">
          <img
            src={user.image}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-blue-500 cursor-pointer"
            onClick={() => onViewProfile(user)}
          />
        </figure>
        <div className="text-center mt-4">
          <h2 className="text-blue-700 text-lg font-bold">{user.name}</h2>
          <p className="text-gray-600 font-medium">{user.role}</p>
          <div className="mt-4">
            <button
              className={`px-4 py-2 rounded-full ${
                user.isFollowing
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              } transition`}
              onClick={() => onToggleFollow(user.id)}
            >
              {user.isFollowing ? "Unfollow" : "Connect"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ConnectPeople = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleFollow = (id) => {
    setUsers((prevUsers) => {
      const updatedUsers = { ...prevUsers };
      Object.keys(updatedUsers).forEach((category) => {
        updatedUsers[category] = updatedUsers[category].map((user) =>
          user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
        );
      });
      return updatedUsers;
    });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">🎓 College Connect</h2>
        {selectedUser ? (
          <WatchProfile user={selectedUser} onBack={() => setSelectedUser(null)} />
        ) : (
          Object.entries(users).map(([category, categoryUsers]) => (
            <div key={category} className="mb-10">
              <h3 className="text-xl font-bold text-pink-700 mb-4">{category.toUpperCase()}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {categoryUsers.map((user) => (
                  <Cards key={user.id} user={user} onToggleFollow={toggleFollow} onViewProfile={() => setSelectedUser(user)} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConnectPeople;
