import { AddNote, DeleteNote, GetNotes, UpdateNote } from '../controllers/notes.js';

import { Router } from 'express';
const router = Router();

router.get('/getNotes', GetNotes);
router.delete('/deleteNote/:id', DeleteNote);
router.post('/addNote', AddNote);
router.post('/updateNote/:id', UpdateNote);
 
export default router;