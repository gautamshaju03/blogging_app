import React, { createContext, useState } from 'react';

export const DataContext = createContext({
  account: { username: '', name: '' },
  setAccount: (account) => {},
});

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState({ username: '', name: '' });

  return (
    <DataContext.Provider value={{ account, setAccount }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
