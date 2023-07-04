import { useState, useEffect } from "react";
import { nanoid } from 'nanoid'
import NotesList from "./components/Notes_List";
import Search from "./components/Search";
import Header from "./components/Header"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [notes, setNotes] = useState(() => {
    // get the notes from localstorage
    const savedNotes = localStorage.getItem("notes");
    // if there are notes stored
    if (savedNotes) {
      // return the parsed JSON object back to a javascript object
      return JSON.parse(savedNotes);
      // otherwise
    } else {
      // return an empty array
      return [];
    }
  });

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // set the notes in localstorage when notes changed
    localStorage.setItem(
      'notes',
      JSON.stringify(notes)
    );
  }, [notes]);

  const AddNote = (description) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      title: "Click to view note",
      description: description,
      date: date.toLocaleString()
    }

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const editNote = (id, data) => {
    const newNotes = notes.map((note) => note.id === id ? { ...note, ...data } : note);
    setNotes([...newNotes]);
  }

  const deleteNote = (e, id) => {
    e.preventDefault()
    e.stopPropagation();
    // filter notes with id
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }


  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        {/* Header start */}
        <Header darkMode={darkMode} handleToggleDarkMode={setDarkMode} />
        {/* Header start */}
        {/* Search start */}
        <Search handleSearchNote={setSearchText} />
        {/* Search start */}
        {/* Notes List start */}
        <NotesList
          notes={notes.filter((note) =>
            note.description?.toLowerCase()?.includes(searchText)
          )}
          handleAddNote={AddNote}
          handleEditNote={editNote}
          handleDeleteNote={deleteNote}
        />
        {/* Notes List  start */}
      </div>
    </div>

  );
};

export default App;
