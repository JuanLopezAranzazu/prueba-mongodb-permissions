const Message = require("./../../Models/Message");

const Query = {
  async findAllMessages(parent, args, ctx, info) {
    const messages = await Message.find({}).populate("user");
    return messages;
  },
  async findByIdMessage(parent, args, ctx, info) {
    const message = await Message.findById(args.id).populate("user");
    return message;
  },
};

module.exports = Query;
