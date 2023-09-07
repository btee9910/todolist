import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    title: { type: String, required: true },
    note: { type: String, required: true },
    status: {
        type: String,
        enum: ['To Do', 'On Hold', 'Completed'],
        default: 'To Do'
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Low'
    },
},
    {
        timestamps: true
    },
    {
        collection: 'note'
    });

export default mongoose.model("Note", noteSchema)