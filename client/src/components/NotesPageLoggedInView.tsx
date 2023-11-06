import React, { useState, useEffect } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddEditNoteDialog from "./AddEditNoteDialog";
import { Note as NoteModel } from "../models/note";
import styleUtils from "../styles/utils.module.css";
import * as NotesApi from "../network/notes_api";
import styles from "../styles/NotesPage.module.css";
import Note from "./Note";
import AddNoteDialog from "../components/AddEditNoteDialog";

const NotesPageLoggedInView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNotesLoadingError, setSetshowNotesLoadingError] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        setSetshowNotesLoadingError(false);
        setLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
        setSetshowNotesLoadingError(true);
      } finally {
        setLoading(false);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
      {notes?.map((item, index) => {
        return (
          <Col key={item._id}>
            <Note
              note={item}
              style={styles.note}
              onDeletNoteClicked={deleteNote}
              onNoteClicked={setNoteToEdit}
            />
          </Col>
        );
      })}
    </Row>
  );

  return (
    <>
      <Button
        onClick={() => setShowAddNote(true)}
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
      >
        <FaPlus />
        Add new note
      </Button>
      {loading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && (
        <p>Something went wrong. Please refresh the page</p>
      )}
      {!loading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? notesGrid : <p>You don't have any notes yet</p>}
        </>
      )}
      {showAddNote && (
        <AddNoteDialog
          onDismiss={() => setShowAddNote(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNote(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default NotesPageLoggedInView;
