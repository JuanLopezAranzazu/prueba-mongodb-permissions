const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = model("User", userSchema);

module.exports = User;
