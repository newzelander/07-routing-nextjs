"use client";

import { useRouter } from "next/navigation";
import type { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";

interface Props {
  note: Note;
}

export default function NotePreview({ note }: Props) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <h2>{note.title}</h2>

        <p>{note.tag}</p>

        <p>{note.content}</p>

        <p>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </Modal>
  );
}
