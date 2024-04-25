import React, { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext(null);
export const useContextDetails = () => useContext(AppContext);
const AppProvider = (props) => {
  const [IsBalance, setIsBalance] = useState();
  const [metamaskAdd,setMetamaskAdd]=useState()
  const [isConnected,setisConnected] = useState(false)
  const [onlinebalace,setonlinebalace] =useState("")
 
  return (
    <AppContext.Provider
      value={{
        IsBalance,
        setIsBalance,
        metamaskAdd,
        setMetamaskAdd,
        setisConnected,
        isConnected,
        setonlinebalace,
        onlinebalace,
        
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext };

export { AppProvider };
