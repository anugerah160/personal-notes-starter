import React, { useState } from 'react';

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const charLimit = 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      onAddNote({
        id: +new Date(),
        title,
        body,
        archived: false,
        createdAt: new Date().toISOString(),
      });
      setTitle('');
      setBody('');
    }
  };

  return (
    <div className="note-input">
      <form onSubmit={handleSubmit}>
        <input
          className="note-input__title"
          type="text"
          placeholder="Judul Catatan"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, charLimit))}
          required
        />
        <p className="note-input__title__char-limit">
          Sisa karakter: {charLimit - title.length}
        </p>
        <textarea
          className="note-input__body"
          placeholder="Isi Catatan"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit">Tambah Catatan</button>
      </form>
    </div>
  );
};

export default NoteForm;
