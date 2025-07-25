import React, {createContext, useContext, useState} from 'react';
const ChangesContext = createContext([]);
export const useChanges = () => useContext(ChangesContext);
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
