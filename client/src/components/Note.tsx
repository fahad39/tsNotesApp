import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import React from "react";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  style?: string;
  onDeletNoteClicked: (note: NoteModel) => void;
}
const Note = ({ note, style, onDeletNoteClicked }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated At: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created At: " + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.noteCard} ${style}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeletNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text=muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
