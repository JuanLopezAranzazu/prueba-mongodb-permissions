const { hash, verify } = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("./../../Models/User");
const Message = require("./../../Models/Message");

const Mutation = {
  async registerUser(parent, args) {
    const { password, ...rest } = args.input;
    const passwordHash = await hash(password);
    const data = {
      ...rest,
      password: passwordHash,
    };
    const newUser = new User(data);
    // save user db
    await newUser.save();
    const token = await jwt.sign(
      { userId: newUser.id, username: newUser.username },
      "SECRET"
    );
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      token,
    };
  },

  async loginUser(parent, args) {
    const { username, password } = args.input;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }
    console.log("USER", user);
    if (!verify(user.password, password)) {
      throw new Error("Invalid password");
    }
    const token = await jwt.sign(
      { userId: user.id, username: user.username },
      "SECRET"
    );
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      token,
    };
  },

  async deleteUser(parent, args) {
    // find user
    const user = await User.findById(args.id);
    if (!user) {
      throw new Error("User not found");
    }
    // delete array messages db
    user.messages.forEach(async (message) => {
      await Message.findByIdAndDelete(message);
    });
    // delete user db
    await user.delete();
    return {
      id: args.id,
    };
  },
};

module.exports = Mutation;
