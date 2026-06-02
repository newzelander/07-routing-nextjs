"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () =>
      fetchNotes({
        page,
        search,
        perPage: 12,
      }),

    placeholderData: keepPreviousData, //
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={inputValue}
          onChange={(value) => {
            setInputValue(value);
            handleSearch(value);
          }}
        />

        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={(p: number) => setPage(p)}
          />
        )}

        <button className={css.button} onClick={() => setModal(true)}>
          Create note +
        </button>
      </header>

      {data?.notes && <NoteList notes={data.notes} />}

      {modal && (
        <Modal onClose={() => setModal(false)}>
          <NoteForm onClose={() => setModal(false)} />
        </Modal>
      )}
    </div>
  );
}
