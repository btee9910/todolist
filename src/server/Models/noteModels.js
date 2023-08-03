import mongoose, {Schema} from "mongoose";

const noteSchema = new Schema({
    title : { type: String, require: true},
    note: { type: String, require: true},
    status : {
        type: String,
        enum: ['toDo', 'onHold', 'completed'],
        default: 'toDo'
    },
    priority : {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'low'
    },
},
{
    timestamps: true
},
{
    collection: 'note'
});

export default mongoose.model("Note", noteSchema)