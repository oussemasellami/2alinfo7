var express = require("express");
var router = express.Router();
var os = require("os");

/* GET users listing. */
router.get("/os", function (req, res, next) {
  res.json({
    hostname: os.hostname(),
    type: os.type(),
    platform: os.platform(),
  });
});
router.get("/os/cpus", function (req, res, next) {
  res.json({
    cpus: os.cpus(),
  });
});

router.get("/os/cpus/:id", function (req, res, next) {
  const { id } = req.params;
  console.log("id :" + id);
  res.json({
    cpus: os.cpus()[id],
  });
});

module.exports = router;
