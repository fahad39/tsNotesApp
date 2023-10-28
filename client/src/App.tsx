import React, { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "../src/styles/NotesPage.module.css";
import styleUtils from "../src/styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import SignupModal from "./components/SignupModal";

function App() {
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
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
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
    <Container className={styles.notesPage}>
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
          {notes.length > 0 ? notesGrid : <p>You don't have any notes yer</p>}
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
      {true && (
        <SignupModal onDismiss={() => {}} onSignupSuccssful={() => {}} />
      )}
    </Container>
  );
}

export default App;
