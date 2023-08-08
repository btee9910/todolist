import mongoose, {Schema} from "mongoose";

const noteSchema = new Schema({
    title : { type: String, require: true},
    note: { type: String, require: true},
    status : {
        type: String,
        enum: ['To Do', 'On Hold', 'Completed'],
        default: 'To Do'
    },
    priority : {
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