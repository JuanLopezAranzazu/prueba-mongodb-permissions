const User = require("./../../Models/User");

const Query = {
  async findAllUsers(parent, args, ctx, info) {
    const users = await User.find({}).populate("messages");
    return users;
  },
  async findByIdUser(parent, args, ctx, info) {
    const user = await User.findById(args.id).populate("messages");
    return user;
  },
  async userAuthenticated(parent, args, { user }, info) {
    console.log("AUTHENTICATED", user);
    const authenticated = await User.findById(user.userId).populate("messages");
    return authenticated;
  },
};

module.exports = Query;
