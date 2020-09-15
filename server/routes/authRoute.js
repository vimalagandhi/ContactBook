const express = require("express");
const router = express.Router();
const db = require("../dbConnection");
const ActiveDirectory = require("activedirectory");
const jwt = require("jsonwebtoken");

router.post("/getAuthentication", (req, res) => {
  const config = {
    url: "ldap://10.200.40.20"
  };
  const ad = new ActiveDirectory(config);

const generateAuthToken = async email => {
   
  sql_stmt = `select email from myaccount where email = $1`;

  try {
    const user = await db.any(sql_stmt, [email]);
    if (user.length === 0) {
      res.status(204).send({
        message: "NO_USER",
        user: {},
        token: ""
      });
    } else {
      token = jwt.sign(user[0], process.env.JWT_SECRET, {
        expiresIn: "36000 seconds"
      });
      res.send({ message: "USER_EXISTS", user: user[0], token: token });

    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "ERROR", error: err });
  }
 
};
generateAuthToken(req.body.email);
});

//verify JWT
router.get("/verifyUserToken", async (req, res) => {
  try {
    if (!req.header("Authorization")) {
      res.send({ message: "MISSING_AUTHORIZATION_HEADER" });
    } else {
      const token = req.header("Authorization").split(" ");
      if (
        token[1] === null ||
        token[1] === "null" ||
        token[1] === "undefined"  ||
        token[1] === undefined
      ) 
      {
        
          console.log("missing jwt");
          res.send({ message: "MISSING_AUTHORIZATION_TOKEN" });
        
      }

      else
      {
        const user = jwt.verify(token[1], process.env.JWT_SECRET);

        res.send({ message: "VALID_USER", user: user });
      }  
    }
  } catch (err) {
    console.log(err);
    res.send({ message: err.message });
  }
});

module.exports = router;
