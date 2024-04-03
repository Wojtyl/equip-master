import mongoose from "mongoose";

const productSizeSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    name: {
        type: String,
        required: [true, 'Category must have a name']
    },
}, {
    versionKey: false
})

export const ProductSize = mongoose.model("Product_Size", productSizeSchema);
