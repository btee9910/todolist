import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    sessionId: { type: String, required: true, index: true },
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
        timestamps: true,
        collection: 'note'
    });

// Auto-expire docs 24h after last update so per-visitor demo data clears itself
noteSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });

export default mongoose.model("Note", noteSchema);
