import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

export interface FetchNotesParams {
  page: number;
  search: string;
  perPage: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotesByTag = async (
  tag?: NoteTag,
): Promise<FetchNotesResponse> => {
  const params = tag ? { tag } : {};

  const { data } = await axios.get<FetchNotesResponse>("/notes", {
    params,
  });

  return data;
};

// GET notes
export const fetchNotes = async ({
  page,
  search,
  perPage,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>("/notes", {
    params: { page, search, perPage },
  });

  return data;
};

// GET single note
export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
};

// CREATE
export const createNote = async (note: CreateNoteData): Promise<Note> => {
  const { data } = await axios.post<Note>("/notes", note);
  return data;
};

// DELETE
export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
};
