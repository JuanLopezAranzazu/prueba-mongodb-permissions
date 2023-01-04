const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  text: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Message = model("Message", messageSchema);

module.exports = Message;
