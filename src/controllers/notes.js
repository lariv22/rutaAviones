import Notes from '../models/noteModel.js';

export const GetNotes = async(req, res) => {
    try {
        const notes = await Notes.findAll();
        res.json(notes);
    } catch (error) {
        console.log(error);
    }
}

export const DeleteNote = async(req, res) => {
    const id = req.params.id;
    try {
        const note = await Notes.destroy({
        where: {
            id: id
        }
        });
        res.json(note);
    } catch (error) {
        console.log(error);
    }
}

export const UpdateNote = async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const note = await Notes.update(data, {
          where: {
            id: id
          }
        });
        res.json(note);
      } catch (error) {
        console.log(error);
      }
}

export const AddNote = async(req, res) => {
    const data = req.body;
    try {
        const note = await Notes.create(data);
        res.json(note);
    } catch (error) {
      console.log(error);
    }
}