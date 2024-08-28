// app/new.js

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GratitudeWall() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarOpacity = Math.max(0.3, 1 - scrollPosition / 600);

  // State for managing input fields and posts
  const [gratitudeText, setGratitudeText] = useState('');
  const [username, setUsername] = useState('');
  const [Twitter, setTwitter] = useState('');
  const [gratitudeList, setGratitudeList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationColor, setNotificationColor] = useState('bg-green-500');

  // Handlers for the input fields
  const handleGratitudeChange = (e) => setGratitudeText(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleTwitterChange = (e) => setTwitter(e.target.value);

  // Handler for button click
  const handleButtonClick = () => {
    if (gratitudeText.trim() === '' || username.trim() === '') {
      setNotificationMessage('⚠️ Please fill in all required fields!');
      setNotificationColor('bg-red-500');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 6000);
    } else {
      // Add new post to the list
      const newPost = { text: gratitudeText, username: username, twitter: Twitter };
      setGratitudeList([...gratitudeList, newPost]);
      setGratitudeText(''); // Clear the text areas
      setUsername('');
      setTwitter('');
      setNotificationMessage('🎉 Gratitude Shared!');
      setNotificationColor('bg-green-500');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 6000);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <h1 className="font-extrabold text-4xl text-center w-[650px] leading-9 absolute top-[10%] text-pretty">
        Build a Positive Space, One Grateful Thought at a Time
      </h1>

      <p className="absolute top-[30%] right-[58.8%]">
        What are you grateful for ? <span className="text-red-500">*</span>
      </p>

      {/* Gratitude Text Area */}
      <div className="absolute top-[35%] bg-zinc-100 opacity-0.9 border border-white-300 rounded-lg p-4" style={{ width: '700px', height: '150px' }}>
        <textarea
          className="w-full h-full border-none outline-none resize-none rounded-lg"
          placeholder="Write your gratitude here..."
          style={{ backgroundColor: 'transparent' }}
          value={gratitudeText}
          onChange={handleGratitudeChange}  // Update handler function
        ></textarea>
      </div>

      {/* Username Input */}
      <p className="absolute top-[57%] right-[64%]">
        Your Username <span className="text-red-500">*</span>
      </p>
      <div className="absolute top-[61%] bg-zinc-100 opacity-0.9 border border-white-300 rounded-lg p-4" style={{ width: '700px', height: '50px' }}>
        <textarea
          className="w-full h-full border-none outline-none resize-none rounded-lg"
          style={{ backgroundColor: 'transparent' }}
          value={username}
          onChange={handleUsernameChange}  // Update handler function
        ></textarea>
      </div>

      {/* Twitter Handle Input */}
      <p className="absolute top-[71%] right-[57%]">
        Show off your Twitter handle? <span className="text-red-500">*</span>
      </p>
      <div className="absolute top-[75%] bg-zinc-100 opacity-0.9 border border-white-300 rounded-lg p-4" style={{ width: '700px', height: '50px' }}>
        <textarea
          className="w-full h-full border-none outline-none resize-none rounded-lg"
          style={{ backgroundColor: 'transparent' }}
          value={Twitter}
          onChange={handleTwitterChange}  // Update handler function
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        className="bg-orange-500 text-white font-semibold py-4 px-20 rounded-lg mt-4 absolute top-[85%]"
        style={{ borderRadius: '20px' }}
        onClick={handleButtonClick}
      >
        Share Your Gratitude
      </button>

      {/* Notification */}
      {showNotification && (
        <div
          className={`fixed top-5 right-0 transform translate-x-[150%] animate-slide-in ${notificationColor} text-white py-1 px-5 rounded-lg shadow-lg opacity-90`}
          style={{
            animation: 'slide-in 0.5s forwards',
          }}
        >
          <h3 className="text-lg font-medium mb-2">{notificationMessage}</h3>
        </div>
      )}

      {/* Gratitude List with Username and Twitter */}
      <div className="mt-8">
        {gratitudeList.map((item, index) => (
          <div key={index} className="bg-grey border border-gray-300 rounded-lg p-4 mb-4 shadow-sm" style={{ width: '500px', height: '90px' }}>
            <p><strong>{item.username}</strong> {item.twitter && `(@${item.twitter})`}</p>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          0% {
            transform: translateX(150%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}
