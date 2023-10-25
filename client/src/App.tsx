import React, { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "../src/styles/NotesPage.module.css";
import styleUtils from "../src/styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
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

  return (
    <Container>
      <Button
        onClick={() => setShowAddNote(true)}
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
      >
        <FaPlus />
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes?.map((item, index) => {
          return (
            <Col key={item._id}>
              <Note
                note={item}
                style={styles.note}
                onDeletNoteClicked={deleteNote}
              />
            </Col>
          );
        })}
      </Row>
      {showAddNote && (
        <AddNoteDialog
          onDismiss={() => setShowAddNote(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNote(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
