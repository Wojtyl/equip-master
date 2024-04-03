import mongoose, {Schema} from "mongoose";

const colorSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date()
  },
  code: {
    type: String,
    // required: [true, 'Color must have a name']
  },
  description: {
    type: String,
  },
  forSuppliers: [{
    type: Schema.Types.ObjectId
  }]
}, {
  versionKey: false
})

export const Color = mongoose.model("Color", colorSchema);
