import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const HomePage = () => {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const handleDeletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
  };

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    organizedBy: '',
    date: '',
    time: '',
    venue: '',
    image: null, // Add image field
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Save posts and events to localStorage
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Handle adding a new event
  const addEvent = () => {
    if (
      newEvent.title.trim() &&
      newEvent.organizedBy.trim() &&
      newEvent.date &&
      newEvent.time &&
      newEvent.venue.trim()
    ) {
      const updatedEvents = [...events, newEvent].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setEvents(updatedEvents);
      setNewEvent({
        title: '',
        organizedBy: '',
        date: '',
        time: '',
        venue: '',
        image: null, // Reset image field
      });
      setShowEventForm(false);
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  // Handle post creation
  const createPost = () => {
    if (postText.trim() && postImage) {
      const newPost = {
        text: postText,
        image: postImage,
        likes: 0,
        dislikes: 0,
        liked: null,  // Keeps track of user choice: null (no choice), 1 (liked), 0 (disliked)
        comments: [],
      };
      setPosts([...posts, newPost]);
      setPostText('');
      setPostImage(null);
    }
  };

  // Handle liking or disliking a post
  const handleLikeDislike = (index, type) => {
    const updatedPosts = [...posts];
    const post = updatedPosts[index];

    // If the user hasn't liked or disliked, set the like/dislike accordingly
    if (post.liked === null) {
      if (type === 'like') {
        post.likes += 1;
        post.liked = 1;
      } else if (type === 'dislike') {
        post.dislikes += 1;
        post.liked = 0;
      }
    } else if (post.liked === 1 && type === 'dislike') {
      // If the post is already liked, clicking dislike will decrement like and increment dislike
      post.likes -= 1;
      post.dislikes += 1;
      post.liked = 0;
    } else if (post.liked === 0 && type === 'like') {
      // If the post is already disliked, clicking like will decrement dislike and increment like
      post.dislikes -= 1;
      post.likes += 1;
      post.liked = 1;
    }

    setPosts(updatedPosts);
  };

  // Handle adding a comment
  const handleAddComment = (index, commentText) => {
    if (commentText.trim()) {
      const updatedPosts = [...posts];
      updatedPosts[index].comments.push(commentText);
      setPosts(updatedPosts);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <Navbar />
      </div>

      {/* Greeting Section */}
      <div className="text-left text-gray-700 pt-10 pl-10">
        <h2 className="text-3xl font-bold mb-6 text-pink-600">Welcome! 👋</h2>
      </div>

      {/* Post creation section */}
      <div className={`w-[50%] mx-auto mb-5 bg-white p-5 rounded-xl shadow-lg flex flex-col space-y-4 ${isSidebarOpen ? 'ml-80' : ''}`}>
        <textarea
          className="w-full p-3 border-2 border-gray-300 rounded-lg h-32 text-gray-700"
          placeholder="Write something..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setPostImage(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="p-2 border-2 border-gray-300 rounded-lg"
        />
        <button
          onClick={createPost}
          className="py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          Post
        </button>
      </div>

      {/* Posts Section */}
      <div className={`w-[50%] mx-auto mt-10 space-y-6 ${isSidebarOpen ? 'ml-80' : ''}`}>
        {posts.map((post, index) => (
          <div key={index} className="bg-white p-5 mb-6 rounded-lg shadow-xl border height-auto border-gray-200">
            <h3 className="text-xl  text-gray-800">{post.text}</h3>
            <div className="mt-3 flex flex-col">
              {post.image && <img src={post.image} alt="Post" className="max-w-full h-auto rounded-lg" />}
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleLikeDislike(index, 'like')}
                className="py-2 px-4 text-xl text-black"
              >
                👍 {post.likes}
              </button>
              <button
                onClick={() => handleLikeDislike(index, 'dislike')}
                className="py-2 px-4 text-xl text-black"
              >
                👎 {post.dislikes}
              </button>
              <button
                onClick={() => setPostText(post.text)} // Optional: for showing the post text when adding a comment
                className="py-2 px-4 text-blue-600 text-black"
              >
                ☁️ Comment
              </button>
              <button
                onClick={() => handleDeletePost(index)} // Delete button for post
                className="text-red-600 hover:text-red-700"
              >
                Delete Post
              </button>
            
            </div>

            {/* Comments Section */}
            <div className="mt-4">
              <input
                type="text"
                className="w-full p-2 border-2 border-gray-300 rounded-lg text-black"
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment(index, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <ul className="mt-2 space-y-2">
                {post.comments.map((comment, idx) => (
                  <li key={idx} className="text-gray-600 text-sm">
                    {comment}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events Sidebar */}
      <div>
        <button
          className="fixed bottom-5 right-5 bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-700"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          📅
        </button>

        {isSidebarOpen && (
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-20 p-5">
            <h3 className="text-xl font-bold text-pink-600 mb-4">Upcoming Events</h3>
            <ul className="space-y-4">
              {events.map((event, index) => (
                <li key={index} className="border-b pb-2">
                  <div className="flex items-center space-x-4">
                    {event.image && <img src={event.image} alt="Event" className="w-16 h-16 rounded-lg object-cover" />}
                    <div>
                      <h4 className="font-bold">{event.title}</h4>
                      <p className="text-gray-600 text-sm">Organized by: {event.organizedBy}</p>
                      <p className="text-gray-600 text-sm">Date: {event.date}</p>
                      <p className="text-gray-600 text-sm">Time: {event.time}</p>
                      <p className="text-gray-600 text-sm">Venue: {event.venue}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              onClick={() => setShowEventForm(true)}
            >
              Add Event
            </button>
            <button
              className="mt-4 w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              Close Events
            </button>
          </div>
        )}
      </div>

      {/* Event Form */}
      {showEventForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-pink-600 mb-4">Add New Event</h2>
            <input
              type="text"
              placeholder="Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-black"
            />
            <input
              type="text"
              placeholder="Organized By"
              value={newEvent.organizedBy}
              onChange={(e) => setNewEvent({ ...newEvent, organizedBy: e.target.value })}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-black"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-black"
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-black"
            />
            <input
              type="text"
              placeholder="Venue"
              value={newEvent.venue}
              onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
              className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-black"
            />
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewEvent({ ...newEvent, image: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="p-2 border-2 border-gray-300 rounded-lg mb-4"
            />
            <input
          type="url"
          placeholder="Enter Registration Form Link"
          value={newEvent.googleFormLink}
          onChange={(e) => setNewEvent({ ...newEvent, googleFormLink: e.target.value })}
          className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-black"
        />
        
        {/* If the googleFormLink exists, render it as a clickable link */}
        {newEvent.googleFormLink && (
          <div className="mt-2">
            <a 
              href={newEvent.googleFormLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-700"
            >
              Click here to access the Registration Form
            </a>
          </div>
        )}
            <button
              onClick={addEvent}
              className="w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Add Event
            </button>
            <button
              onClick={() => setShowEventForm(false)}
              className="w-full py-2 bg-gray-600 text-white rounded-lg mt-2 hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
