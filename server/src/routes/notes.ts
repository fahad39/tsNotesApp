import * as NotesControllers from "../controllers/notes";
import express from "express";

const router = express.Router();

router.get("/", NotesControllers.getNotes);
router.post("/", NotesControllers.createNote);
router.get("/:noteId", NotesControllers.getNote);
router.patch("/:noteId", NotesControllers.updateNote);
router.delete("/:noteId", NotesControllers.deleteNode);

export default router;
