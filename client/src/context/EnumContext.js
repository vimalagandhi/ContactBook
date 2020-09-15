import React, { createContext, useEffect, useState } from "react";
import { verifyUserToken } from "../api/getAllData";
export const EnumContext = createContext();
 
export const EnumStore = props => {
  const [pageTitle, setPageTitle] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginRequired, setLoginRequired] = useState(false);
  const [validUser, setValidUser] = useState({ message: "INITIAL", user: {} });
  const [appMenu, setAppMenu] = useState([]);
  
  useEffect(() => {
    const userToken = async () => {
      try {
        const response = await verifyUserToken();
        setValidUser(response);
      } catch (err) {
        console.log(err.message);
        setValidUser({ message: "ERROR", user: {} });
      }
    };

    userToken();
  }, [isLoggedIn, loginRequired]);
 
  const p_values = {
    
    pageTitle,
    setPageTitle,
    selectedRequest,
    setSelectedRequest,
    isLoggedIn,
    setIsLoggedIn,
    appMenu,
    setAppMenu,
    loggedInUser,
    loginRequired,
    setLoginRequired,
    validUser,
    setValidUser
  };

  return {} ? (
    <EnumContext.Provider value={p_values}>
      {props.children}
    </EnumContext.Provider>
  ) : null;
};
