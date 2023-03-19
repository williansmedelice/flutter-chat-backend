// Librarys
const { response, request } = require("express");
// Models
const Message = require("../models/message");

const getChat = async (req = request, res = response) => {
  const myId = req.uid;
  const messagesFrom = req.params.from;

  const last30 = await Message.find({
    $or: [
      { from: myId, to: messagesFrom },
      { from: messagesFrom, to: myId },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);

  res.json({
    ok: true,
    myId,
    messages: last30,
  });
};

module.exports = {
  getChat,
};
