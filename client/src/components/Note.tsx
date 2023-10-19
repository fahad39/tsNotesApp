import styles from "../styles/Note.module.css";
import React from "react";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";

interface NoteProps {
  note: NoteModel;
  style?: string;
}
const Note = ({ note, style }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  return (
    <Card className={`${styles.noteCard} ${style}`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text=muted">{createdAt}</Card.Footer>
    </Card>
  );
};

export default Note;
