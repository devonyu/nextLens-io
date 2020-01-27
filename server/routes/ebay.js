const express = require("express");
const path = require("path");

const router = express.Router();

const { spawn } = require("child_process");

router.post("/", (req, res) => {
  console.log("ebaydata route called");
  const { ebayLink } = req.body;
  const ls = spawn("python3", [
    path.join(__dirname, "../../scripts/ebay_scraper.py"),
    ebayLink
  ]);

  ls.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
    console.log("FINISHED");
    res.send(data);
  });

  ls.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
  });

  ls.on("close", code => {
    console.log(`child process exited with code ${code}`);
  });
});

module.exports = router;
