import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { EnumContext } from "./context/EnumContext";
import classNames from "classnames";
import { temexpensemenu } from "./menus/wayCoolMenu";

const AppInlineProfile = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [redirectReferrer, setRedirectReferrer] = useState(false);

  const {
    isLoggedIn,
    setIsLoggedIn,
    setAppMenu,
    loginRequired,
    setLoginRequired,
    validUser,
  } = useContext(EnumContext);

  const onClick = (event) => {
    setExpanded(!expanded);

    event.preventDefault();
  };

  useEffect(() => {
    console.log("Inside APPProfile useEffect-1");
    setIsLoggedIn(!isLoggedIn);
  }, []);

  useEffect(() => {
    console.log("Inside APPProfile useEffect-2");
    if (validUser.message === "VALID_USER") {

      setAppMenu([
        ...temexpensemenu
      ]);
    } else {
      setAppMenu([]);
    }
  }, [validUser.message]);

  return (
    <div className="profile">
      <div>
        <img src="assets/layout/images/profile.png" alt="" />
      </div>
      <button className="p-link profile-link" onClick={onClick}>
        <span className="username">
          {" "}
          {!loginRequired
            ? validUser && validUser.user && validUser.user.name
            : "Not logged in"}
        </span>
        <i className="pi pi-fw pi-cog" />
      </button>
      <ul className={classNames({ "profile-expanded": expanded })}>
        <li>
          <button className="p-link">
            <i className="pi pi-fw pi-user" />
            <span>Account</span>
          </button>
        </li>
       
        <li>
          <button
            className="p-link"
            onClick={() => {
              if (!loginRequired) {
                localStorage.removeItem("userToken");
                setLoginRequired(true);
                setAppMenu([]);
                setRedirectReferrer(true);
              } else {
                setRedirectReferrer(true);
              }
            }}
          >
            <i className="pi pi-fw pi-power-off" />
            <span>{!loginRequired ? "Logout" : "Login"} </span>
          </button>
          {loginRequired && redirectReferrer === true ? (
            <Redirect push to="/loginPage" />
          ) : null}
        </li>
      </ul>
    </div>
  );
};

export default AppInlineProfile;
