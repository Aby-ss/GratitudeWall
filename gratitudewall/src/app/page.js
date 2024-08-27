"use client";

import { useState, useEffect } from 'react';

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

  // Calculate opacity based on scroll position (change 600 to whatever max scroll position you want)
  const navbarOpacity = Math.max(0.3, 1 - scrollPosition / 600);

  // State for managing the notification visibility and text addition (post creation)

  const [gratitudeText, setGratitudeText] = useState(''); // To store the input text
  const [gratitudeList, setGratitudeList] = useState([]); // To store the list of gratitude posts
  const [showNotification, setShowNotification] = useState(false); // To show notification
  const [notificationMessage, setNotificationMessage] = useState(''); // To store notification message
  const [notificationColor, setNotificationColor] = useState('bg-green-500'); // To change notification color

  const handleTextChange = (e) => {
    setGratitudeText(e.target.value);
  };

  const handleButtonClick = () => {
    if (gratitudeText.trim() === '') {
      setNotificationMessage('⚠️ Please write something before sharing!');
      setNotificationColor('bg-red-500');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 6000); // Hide after 6 seconds
    } else {
      setGratitudeList([...gratitudeList, gratitudeText]);
      setGratitudeText(''); // Clear the text area
      setNotificationMessage('🎉 Gratitude Shared!');
      setNotificationColor('bg-green-500');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 6000); // Hide after 6 seconds
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <h1 className="font-extrabold text-5xl lg:text-5xl tracking-tight md:-mb-4 text-center pt-5">
        Join the Wave of <span className="text-green-500 underline decoration-green-600 subpixel-antialiased underline-offset-10">Anonymous Appreciation</span>
      </h1>

      <p className="font-medium text-2xl text-center w-[650px] text-[20px] leading-[24px] absolute top-[10%]">
        Build a Positive Space, One Grateful Thought at a Time
      </p>

      <button className="bg-green-500 text-white font-semibold py-4 px-20 rounded-lg mt-4 absolute top-[45%]" style={{ borderRadius: '20px' }} onClick={handleButtonClick}>
        Share Your Gratitude
      </button>

      <div className="absolute top-[25%] bg-zinc-800 border border-white-300 rounded-lg p-4" style={{ width: '700px', height: '150px' }}>
        <textarea
          className="w-full h-full border-none outline-none resize-none rounded-lg"
          placeholder="Write your gratitude here..."
          style={{ backgroundColor: 'transparent' }}
          value={gratitudeText}
          onChange={handleTextChange}
        ></textarea>
      </div>

      <button
        className="bg-green-500 text-white font-semibold py-4 px-20 rounded-lg mt-4 absolute top-[45%]"
        style={{ borderRadius: '20px' }}
        onClick={handleButtonClick}
      >
        Share Your Gratitude
      </button>

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

      <div className="mt-8">
        {gratitudeList.map((item, index) => (
          <div key={index} className="bg-grey border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
            {item}
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