const jwt = require("jsonwebtoken");
const getLoggedUser = () => {
  let loggedUser = "";
  const token = localStorage.getItem("userToken");

  if (
    token !== null &&
    token !== "null" &&
    token !== "undefined" &&
    token !== ""
  ) {
    try {
      loggedUser = jwt.verify(token, 'tbd');

      if (
        loggedUser !== "undefined" &&
        loggedUser !== "" &&
        loggedUser !== null &&
        loggedUser !== "null" &&
        loggedUser !== ""
      ) {
        return { message: "USER_EXISTS", user: loggedUser };
      } else {
        return { message: "NO_USER_EXISTS", user: {} };
        console.log("no token:  ", loggedUser);
      }
    } catch (err) {
      console.log(err);
      return { message: "ERROR", error: err };
    }
  } else {
    return { message: "NO_TOKEN", user: {} };
  }
};

export default getLoggedUser;
