import React, { useState, useEffect } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../src/styles/NotesPage.module.css";
import * as NoteApi from "./network/notes_api";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NoteApi.fetchNotes();
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
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes?.map((item, index) => {
          return (
            <Col key={item._id}>
              <Note note={item} style={styles.note} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default App;
