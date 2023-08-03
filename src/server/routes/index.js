import * as noteBuilder from '../controller/noteController.js'

const routes = (app) => {
    app.route('/')
        .get(async (req, res) => {await res.send('Note World')});
    app.route('/note')
        .get(noteBuilder.listNote)
        .post(noteBuilder.createNote);
    app.route('/note/:id')
        .get(noteBuilder.findNote)
        .put(noteBuilder.editNote)
        .delete(noteBuilder.deleteNote);
};

export default routes;