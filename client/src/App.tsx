import React, { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "../src/styles/NotesPage.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

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

  return (
    <Container>
      <Button onClick={() => setShowAddNote(true)} className="mb-4">
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes?.map((item, index) => {
          return (
            <Col key={item._id}>
              <Note note={item} style={styles.note} />
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
