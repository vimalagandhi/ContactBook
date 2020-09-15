import React, { useState, useEffect, useContext, useRef } from "react";
import classNames from "classnames";
import { AppTopbar } from "./AppTopbar";
import { AppMenu } from "./AppMenu";
import AppInlineProfile from "./AppInlineProfile";
import { Route, Switch } from "react-router-dom";
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./layout/layout.css";
import "./App.css";
import { EnumContext } from "./context/EnumContext";
import LoginPage from "./Authentication/MyAccount";
import SignUp from "./Authentication/SignUp";
import ListMyContacts from "./wayCoolComponents/ListMyContacts";
import ViewMyContacts from "./wayCoolComponents/DisplayMyContacts";
import "semantic-ui-css/semantic.min.css";


const App = () => {
  
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const layoutMenuScroller = useRef(null);
  const sidebar = useRef(null);
  const {
    pageTitle,
    appMenu,
    validUser,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(EnumContext);

  useEffect(() => {
    setIsLoggedIn(!!isLoggedIn);
    console.log(validUser);

    if (mobileMenuActive) addClass(document.body, "body-overflow-hidden");
    else removeClass(document.body, "body-overflow-hidden");
  }, []);

  const onWrapperClick = (event) => {
    if (!event.menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
    event.menuClick = false;
  };

  const onToggleMenu = (event) => {
    event.menuClick = true;

    if (isDesktop()) {
      if (layoutMode === "overlay") {
        setOverlayMenuActive(!overlayMenuActive);
      } else if (layoutMode === "static") {
        setStaticMenuInactive(!staticMenuInactive);
      }
    } else {
      setMobileMenuActive(!mobileMenuActive);
    }
    event.preventDefault();
  };

  const onSidebarClick = (event) => {
    event.menuClick = true;
    setTimeout(() => {
      layoutMenuScroller.current && layoutMenuScroller.current.moveBar();
    }, 500);
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };
  let menu;

  const basicmenu = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location = "#/";
      },
    },
    
  ];
  menu = [...basicmenu, ...appMenu];

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const isDesktop = () => {
    return window.innerWidth > 1024;
  };

  let logo = "assets/layout/images/attra.png";
  
  let wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
  });
  let sidebarClassName = classNames("layout-sidebar", {
    "layout-sidebar-dark": layoutColorMode === "dark",
  });

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <AppTopbar onToggleMenu={onToggleMenu} title={pageTitle} />
      <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
        <ScrollPanel ref={layoutMenuScroller} style={{ height: "100%" }}>
          <div className="layout-sidebar-scroll-content">
            <div className="layout-logo">
              <img alt="Logo" src={logo} />
            </div>
            <AppInlineProfile />
            <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
          </div>
        </ScrollPanel>
      </div>
      <div className="layout-main">
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/listMyContacts" exact component={ListMyContacts} />
          <Route path="/viewMyContacts" exact component={ViewMyContacts} />
          
        </Switch>
        
      </div>

      <div className="layout-mask" />
    </div>
  );
};

export default App;
