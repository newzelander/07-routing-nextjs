import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";

export default async function ModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const note = await fetchNoteById(id);

  return <NotePreview note={note} />;
}
