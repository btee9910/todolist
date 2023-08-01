import {Router} from "express";
import noteModels from "../Models/noteModels.js";

const router = Router();

router.get("/note", async (req,res) => {
    try{
        const database = await noteModels.find()

        res.json({database});
    }catch(e){
        console.log(e);
    }
    
})

router.post("/create", async (req,res) => {
    try{
        const newNote = new noteModels({
            ...req.body,
            title : req.body.title,
            note : req.body.note,
            priority : req.body.priority
        });
        await newNote.save();
        res.json({message : "Created sucessfully!"});
    }catch(e){
        console.log(e);
    }
    
})

router.put("/edit/:id", async (req,res) => {
    try{
        const noteId = req.params.id;
        if(req.body.status !== "completed" ){
            await noteModels.findByIdAndUpdate(noteId,{
                ...req.body,
                priority : req.body.priority,
                dateUpdated : Date.now(),
                title : req.body.title,
                note : req.body.note,
                status : req.body.status,
                dateCompleted : undefined

            })
        }else{
            await noteModels.findByIdAndUpdate(noteId,{
                ...req.body,
                priority : req.body.priority,
                dateCompleted : Date.now(),
                title : req.body.title,
                note : req.body.note,
                status : req.body.status
        })}

        res.json({message : "Edit sucessfully!"});
    }catch(e){
        console.log(e);
    }
    
})

router.delete("/delete/:id", async (req,res) => {
    try{
        const noteId = req.params.id;
        await noteModels.findByIdAndDelete(noteId)

        res.json({message : "Delete sucessfully!"});
    }catch(e){
        console.log(e);
    }
    
})

export default router;