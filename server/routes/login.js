const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());
const bcrypt = require("bcrypt");
const db = require("../../database/db");
// Login route

router
  .post("/", (request, response) => {
    const loginInput = request.body || request.query;
    async function checkCredentials(credentials) {
      const user = await db.checkEmail(credentials.email, res => res.rows[0]);
      if (user === undefined) {
        console.log("Login Email does not exist");
        response.status(401).send({ error: "Email does not exist" });
      }
      const match = await bcrypt.compare(credentials.password, user.password);
      if (match) {
        console.log("CORRECT PASSWORD");
        console.log(request.session);
        delete user.password;
        // Create session
        // Redis must be connected are else this wont work
        request.session.key = user.id;
        // set cookie on browser
        user.cookie = request.session.id;
        request.session.auth = true;
        // console.log('created session: ', request.session);
        response.status(200).send(user);
      } else {
        console.log("Login password is wrong");
        response.status(401).send({ error: "Wrong login credentials" });
      }
    }
    checkCredentials(loginInput);
  })
  .get("/", (req, res) => {
    // console.log('GET from Login, nothing here');
    res.send("GET outta HERE");
  })
  .get("/test", (req, res) => {
    // console.log('test logging in @ /login/test, return yeezy string');
    res.status(200).send("yeezy");
  });

module.exports = router;
