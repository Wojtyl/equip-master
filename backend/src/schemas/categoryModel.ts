import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  name: {
    type: String,
    required: [true, 'Category must have a name']
  },
  description: {
    type: String,
  },
  parent: {
    type: mongoose.Types.ObjectId
  }
}, {
  versionKey: false
})

export const Category = mongoose.model("Category", categorySchema);
