import Note from "../Models/noteModels.js";

export const listNote = async (req,res) => {
    try{
        const notes = await Note.find()
        let infos = [];
        notes.forEach((note) => {
            infos = [...infos, {id: note._id, status: note.status, priority: note.priority}]
        })
        res.status(200).json(infos);
    }catch(e){
        console.log(e);
    }
    
};

export const createNote = async (req,res) => {
    try{
        const note = await Note.create(req.body);
        res.status(200).json({note, message: 'Created Successfully'});
    }catch(e){
        console.log(e);
    }
    
};

export const findNote = async (req,res) => {
    try{
        const {id} = req.params;
        const notes = await Note.findById(id)
        res.status(200).json(notes);
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
        res.status(200).json({updatedNote, message : "Edit sucessfully!"});
    }catch(e){
        console.log(e);
    }
    
};

export const deleteNote = async (req,res) => {
    try{
        const id = req.params.id;
        const note = await Note.findByIdAndDelete(id)

        res.status(200).json({message : `Sucessfully deleted ${note.title}!`});
    }catch(e){
        console.log(e);
    }
    
};