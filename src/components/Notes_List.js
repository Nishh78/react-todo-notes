import Note from "./Note";
import AddNote, { DefaultNote } from "./AddNote";

const NotesList = ({ notes, handleAddNote, handleEditNote, handleDeleteNote }) => { 

    return (
        <div className="node-container">
            <div className="node-create">
                <DefaultNote storeId={`default-notes-1`}/>
            </div>
            <div className="node-create">
                <DefaultNote storeId={`default-notes-2`}/>
            </div>
            <div className='notes-list'>
                {notes.map((note) =>
                    <Note
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        description={note.description}
                        date={note.date}
                        handleEditNote={handleEditNote}
                        handleDeleteNote={handleDeleteNote}
                    />
                )}
                 <AddNote handleAddNote={handleAddNote} />
            </div>
        </div>
    );
};

export default NotesList;