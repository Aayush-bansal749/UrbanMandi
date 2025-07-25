// ChangesContext.js
import React, {createContext, useContext, useState} from 'react';

// Create Context
const ChangesContext = createContext([]);

// Custom Hook (optional)
export const useChanges = () => useContext(ChangesContext);

// Provider Component
export const ChangesProvider = ({children}) => {
  const [Changes, SetChanges] = useState([]);
  const [Sort, setSort] = useState('Relevance (default)');
  const [now, setnow] = useState(false);
  return (
    <ChangesContext.Provider
      value={{Changes, SetChanges, Sort, setSort, now, setnow}}>
      {children}
    </ChangesContext.Provider>
  );
};
