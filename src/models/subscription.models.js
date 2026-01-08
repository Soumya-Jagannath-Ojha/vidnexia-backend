import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
    {
        // either of 'video', 'comment', or 'tweet' will be assigned others are null
        subscriber: {
            type: Schema.Types.ObjectId,   //One who SUBSCRIBING
            ref: "User"
        },
        channel: {
            type: Schema.Types.ObjectId, //one to whom ''subscribe' IS SUBSCRIPTION
            ref: "User"
        },
    },
    {
        timestamps: true
    }
)

export const Subscription = mongoose.model("Subscription", subscriptionSchema)