var express = require("express");
var router = express.Router();
var joueurcontroller = require("../controller/joueurcontroller");
/* GET users listing. */
router.post("/addjoueur", joueurcontroller.add);
router.get("/getall", joueurcontroller.getall);
router.get("/getbyid/:id", joueurcontroller.getbyid);
router.delete("/delete/:id", joueurcontroller.deletejoueur);
router.put("/attaque/:id1/:id2", joueurcontroller.attaque);
router.post("/addpartie/:id1/:id2", joueurcontroller.addpartie);
router.get("/partie", (req, res, next) => {
  res.render("partie");
});

module.exports = router;
