// app/context/GratitudeContext.js

import { createContext, useState, useContext } from 'react';

const GratitudeContext = createContext();

export function GratitudeProvider({ children }) {
  const [gratitudeList, setGratitudeList] = useState([]);

  const addGratitude = (newPost) => {
    setGratitudeList((prevList) => [...prevList, newPost]);
  };

  return (
    <GratitudeContext.Provider value={{ gratitudeList, addGratitude }}>
      {children}
    </GratitudeContext.Provider>
  );
}

export function useGratitude() {
  return useContext(GratitudeContext);
}