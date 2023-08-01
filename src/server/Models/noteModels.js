import mongoose, {Schema} from "mongoose";

const noteSchema = new Schema({
    title : { type: String, require: true},
    note: { type: String, require: true},
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
    },
    dateCompleted: {
        type: Date,
    },
    status : {
        type: String,
        enum: ['toDo', 'onHold', 'completed'],
        default: 'toDo'
    },
    priority : {
        type: String,
        enum: ['urgent', 'low'],
        default: 'low'
    },
})

export default mongoose.model("noteModel", noteSchema)