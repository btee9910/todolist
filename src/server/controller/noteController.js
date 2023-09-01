import Note from "../Models/noteModels.js";

// Sort data by latest date from old to new
const compareDate= (a, b) => {
    const date1 = a.updatedAt;
    const date2 = b.updatedAt;

    let comparison = 0;
    date1 > date2? comparison = 1: comparison = -1;
    return comparison;
}

export const listNote = async (req,res) => {
    try{
        let notes = await Note.find();
        notes = notes.sort(compareDate);
        res.status(200).json(notes);
    }catch(e){
        console.log(e);
    }
    
};

export const createNote = async (req,res) => {
    try{
        const note = await Note.create(req.body);
        res.status(200).json({note, message: `Created: Task - ${note.title}`});
    }catch(e){
        console.log(e);
    }
    
};
export const findNote = async (req,res) => {
    try{
        const {id} = req.params;
        const note = await Note.findById(id)
        res.status(200).json(note);
    }catch(e){
        console.log(e);
        res.status(404).json({message: `connot find any product with ID ${id}`});
    }
    
};

export const editNote = async (req,res) => {
    try{
        const id = req.params.id; 
        let note = await Note.findByIdAndUpdate(id, req.body);
        if (!note) {
            return res.status(404).json({message: `connot find any note with ID ${id}`})
        }
        const updatedNote = await Note.findById(id);
        res.status(200).json({updatedNote, message : `Updated: Task- ${updatedNote.title}`});
    }catch(e){
        console.log(e);
    }
    
};

export const deleteNote = async (req,res) => {
    try{
        const id = req.params.id;
        const note = await Note.findByIdAndDelete(id)

        res.status(200).json({message : `Deleted: Task- ${note.title}`});
    }catch(e){
        console.log(e);
    }
    
};