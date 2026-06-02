import NoteList from "@/components/NoteList/NoteList";
import { fetchNotesByTag } from "@/lib/api";
import type { NoteTag } from "@/types/note";

export default async function FilterPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const tag = slug[0];

  const data =
    tag === "all"
      ? await fetchNotesByTag()
      : await fetchNotesByTag(tag as NoteTag);

  return <NoteList notes={data.notes} />;
}
