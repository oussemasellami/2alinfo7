
var User = require("../model/user");

async function add (req, res, next) {
    try {
      const user = new User(req.body);
      await user.save();
      res.send("add good");
    } catch (err) {
      console.log(err);
    }
  }


module.exports={add}