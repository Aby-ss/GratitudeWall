// context/GratitudeContext.js

"use client";

import React, { createContext, useContext, useState } from 'react';

const GratitudeContext = createContext();

export function GratitudeProvider({ children }) {
  const [gratitudeList, setGratitudeList] = useState([]);

  const addGratitude = (newGratitude) => {
    setGratitudeList([...gratitudeList, newGratitude]);
  };

  const value = {
    gratitudeList,
    addGratitude,
  };

  return (
    <GratitudeContext.Provider value={value}>
      {children}
    </GratitudeContext.Provider>
  );
}

export function useGratitude() {
  const context = useContext(GratitudeContext);
  if (context === undefined) {
    throw new Error('useGratitude must be used within a GratitudeProvider');
  }
  return context;
}
