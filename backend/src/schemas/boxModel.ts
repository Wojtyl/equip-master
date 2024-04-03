import mongoose, { Schema, Types } from "mongoose";
import { BoxStatus } from "../enums/box-status-enum";

export interface BoxSchema {
    createdAt: Date,
    createdBy: Types.ObjectId,
    boxNumber: number,
    closed: boolean,
    deliveryId: Types.ObjectId,
    products: BoxProductSchema[],
    reopened: boolean,
    statuses: BoxStatusSchema[]
}

interface BoxProductSchema {
    productId: Types.ObjectId;
    quantity: number
    size: string;
}

interface BoxStatusSchema {
    changedBy: Types.ObjectId;
    status: string,
    date: Date,
    message: string,
}

const boxSchema = new Schema<BoxSchema>(
    {
        createdAt: {
            type: Date,
            default: new Date()
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            required: [true, 'Box must have creator']
        },
        boxNumber: {
            type: Number,
            // unique: true
        },
        closed: {
            type: Boolean,
            default: false
        },
        deliveryId: {
            type: Schema.Types.ObjectId,
            ref: 'Delivery',
            required: [true, 'Box must have a Delivery ID!']
        },
        products: [
            new Schema<BoxProductSchema>({
                    productId: {
                        type: Schema.Types.ObjectId,
                        ref: 'Product'
                    },
                    quantity: {
                        type: Number
                    },
                    size: {
                        type: String
                    }
                }
            )
        ],
        reopened: {
            type: Boolean,
            default: false
        },
        statuses: [
            new Schema<BoxStatusSchema>({
                changedBy: {
                    type: Schema.Types.ObjectId
                },
                status: {
                    type: String,
                    enum: BoxStatus
                },
                date: {
                    type: Date,
                    default: new Date()
                },
                message: {
                    type: String,
                }
            })
        ]
    }
);

async function getNextBoxNumber() {
    const lastBox = await Box.findOne().sort({ boxNumber: -1 });
    if (lastBox) {
        return lastBox.boxNumber! + 1;
    } else {
        return 1;
    }
}

boxSchema.pre('save', async function (next) {
    try {
        const delivery = await mongoose.model('Delivery').findById(this.deliveryId);

        if (delivery) {
            delivery.boxOnDelivery.push(this._id.toString());
            await delivery.save();
        }

        this.boxNumber = await getNextBoxNumber()

        next();
    } catch (error: any) {
        next(error);
    }
});

export const Box = mongoose.model("Box", boxSchema);