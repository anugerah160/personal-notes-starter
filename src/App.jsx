import React from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { getInitialData } from './utils/index';
import './styles/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      searchQuery: '',
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onToggleArchiveHandler = this.onToggleArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onAddNoteHandler(note) {
    this.setState((prevState) => ({
      notes: [...prevState.notes, note],
    }));
  }

  onDeleteHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => note.id !== id),
    }));
  }

  onToggleArchiveHandler(id) {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      ),
    }));
  }

  onSearchHandler(event) {
    this.setState({ searchQuery: event.target.value });
  }

  render() {
    const { notes, searchQuery } = this.state;
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const activeNotes = filteredNotes.filter((note) => !note.archived);
    const archivedNotes = filteredNotes.filter((note) => note.archived);

    return (
      <div className="note-app">
        <header className="note-app__header">
          <h1>Aplikasi Catatan Pribadi</h1>
        </header>
        <div className="note-app__body">
          <h2>Tambah Catatan Baru</h2>
          <NoteForm onAddNote={this.onAddNoteHandler} />
          <div className="note-search">
            <input
              type="text"
              placeholder="Cari catatan..."
              value={searchQuery}
              onChange={this.onSearchHandler}
            />
          </div>
          <h2>Catatan Aktif</h2>
          <NoteList
            notes={activeNotes}
            onDelete={this.onDeleteHandler}
            onArchive={this.onToggleArchiveHandler}
          />
          <h2>Catatan Arsip</h2>
          <NoteList
            notes={archivedNotes}
            onDelete={this.onDeleteHandler}
            onArchive={this.onToggleArchiveHandler}
          />
        </div>
      </div>
    );
  }
}

export default App;
