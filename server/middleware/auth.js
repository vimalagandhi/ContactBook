const jwt = require("jsonwebtoken");
// const db = require("../dbConnection");

const auth = async (req, res, next) => {
   
 
  try {
    if (!req.headers["authorization"]) {
      res.status(400).send({ message: "Access denied. No token provided!." });
    } else {
      const token = req.headers["authorization"].split(" ");
       
      if (token[1] !== null && token[1] !== "undefined" && token[1] !== undefined) {
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
        req.username = decoded.email
        next();
      } else {
        console.log("missing jwt");
        res.status(401).send({ message: "Missing jwt. Access denied. No token provided." });
      }
    }
  } catch (err) {
    console.log(err);
    
    next(err);
  }
};

module.exports = auth;
