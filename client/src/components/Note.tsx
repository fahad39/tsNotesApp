import styles from "../styles/Note.module.css";
import React from "react";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
  style?: string;
}
const Note = ({ note, style }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated At: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created At: " + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.noteCard} ${style}`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text=muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
