const Message = require("./../../Models/Message");
const User = require("./../../Models/User");

const Mutation = {
  async createMessage(parent, args, { user }, info) {
    const inputMessage = args.input;
    const newMessage = new Message(inputMessage);
    // find user
    const authenticated = await User.findById(user.userId);
    console.log("USER", authenticated);
    newMessage.user = authenticated;
    // save message db
    await newMessage.save();
    // save user messages db
    authenticated.messages.push(newMessage);
    authenticated.save();
    return {
      id: newMessage.id,
      text: newMessage.text,
    };
  },

  async deleteMessage(parent, args, { user }, info) {
    // find message
    const message = await Message.findById(args.id);
    console.log(message);
    if (!message) {
      throw new Error("Message not found");
    }
    console.log("AUTHENTICATED", user);
    // delete message array
    await User.findByIdAndUpdate(user.userId, { $pull: { messages: message } });
    // delete message db
    await message.delete();
    return {
      id: message.id,
      text: message.text,
    };
  },
};

module.exports = Mutation;
