var express = require("express");
var router = express.Router();
var usercontroller = require("../controller/usercontroller");
/* GET users listing. */
router.post("/adduser", usercontroller.add);

router.get("/show", async function (req, res, next) {
  try {
    const data = await User.find();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

router.put("/update/:id", async function (req, res, next) {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send("updated");
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async function (req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("deleted");
  } catch (err) {
    console.log(err);
  }
});

router.get("/chat", (req, res, next) => {
  res.render("chat");
});

module.exports = router;
