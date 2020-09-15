const express = require("express");
const app = express();
const https = require("https");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbQuery = require("./routes/dbQuery");
const signUpQuery = require("./routes/signUpQuery");
const authRoute = require("./routes/authRoute");
const auth = require("./middleware/auth");

require("dotenv").config();

port = process.env.PORT || 5678;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(cors());
app.use("/api/common", auth, dbQuery);
app.use("/api/signup", signUpQuery);
app.use("/api/auth", authRoute);

app.use((req, res, next) => {
  const error = new Error("Not Found(404)");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

if (process.env.NODE_HOST === "10.200.42.110") {
  https
    .createServer({}, app)
    .listen(port, () => console.log(`Dev Server running on ${port}`));
} else {
  app.listen(port, () => console.log(`Server running on ${port}`));
}
