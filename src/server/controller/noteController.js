import Note from "../Models/noteModels.js";

const compareDate = (a, b) => (a.updatedAt > b.updatedAt ? 1 : -1);

export const listNote = async (req, res) => {
    try {
        const notes = (await Note.find()).sort(compareDate);
        res.status(200).json(notes);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Failed to list notes" });
    }
};

export const createNote = async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(200).json({ note, message: `Created: Task - ${note.title}` });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Failed to create note" });
    }
};

export const findNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        res.status(200).json(note);
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: `cannot find any note with ID ${id}` });
    }
};

export const editNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findByIdAndUpdate(id, req.body);
        if (!note) {
            return res.status(404).json({ message: `cannot find any note with ID ${id}` });
        }
        const updatedNote = await Note.findById(id);
        res.status(200).json({ updatedNote, message: `Updated: Task- ${updatedNote.title}` });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: `Failed to update note ${id}` });
    }
};

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({ message: `cannot find any note with ID ${id}` });
        }
        res.status(200).json({ message: `Deleted: Task- ${note.title}` });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: `Failed to delete note ${id}` });
    }
};
