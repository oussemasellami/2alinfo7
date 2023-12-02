const chat = require("../model/chat");

async function add(msge) {
  try {
    const Chat = new chat({
      msg: msge,
      date: new Date(),
    });
    console.log("chat data" + JSON.stringify(Chat));
    await Chat.save();
  } catch (err) {
    console.log(err);
  }
}
module.exports = { add };
