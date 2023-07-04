import { useState, useEffect, useRef } from "react";
import { AddDetailModel } from "./AddDetailModel";
import { MdEditSquare, MdSave } from 'react-icons/md';

export const DefaultNote = ({
    storeId
}) => {

    const [showNode, setShowNode] = useState('');
    const [showAddModel, setShowAddModel] = useState(false);
    const noteRef = useRef();
    const [noteTextData, setNoteTextData] = useState(() => {
        const savedDefaultNote = localStorage.getItem(storeId);
        if (savedDefaultNote) {
            return JSON.parse(savedDefaultNote);
        } else {
            return {
                title: '',
                description: ''
            }
        }
    });
    // default max character limit
    const characterLimit = 500;

    const handleCloseModel = () => {
        setShowAddModel(false)
    }

    const handleShowModel = () => {
        setShowAddModel(true)
    }

    const handleSaveModel = (data) => {
        setNoteTextData(oldState => ({
            ...oldState,
            ...data
        }))
        setShowAddModel(false)
    }

    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0) {
            setNoteTextData(oldState => ({
                ...oldState,
                description: event.target.value
            }))
        }
    }

    const handleClickInside = (e) => {
        e.stopPropagation();
        if (noteRef.current.contains(e.target)) {
            setShowNode(true)
        }
    }

    const handleClickOutside = (e) => {
        e.stopPropagation();
        if (!noteRef.current.contains(e.target)) {
            setShowNode(false)
        }
    }

    useEffect(() => {
        localStorage.setItem(
            storeId,
            JSON.stringify(noteTextData)
        );
    }, [noteTextData]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="note" ref={noteRef} onClick={(e) => handleClickInside(e)} style={{ backgroundColor: noteTextData?.description.length > 0 ? '#eadcf5' : 'beige' }}>
            {!showNode && (
                <div

                    className='note-text'
                >
                    {noteTextData?.title || 'Click to view note'}

                </div>
            )}
            <textarea
                rows='8'
                cols='10'
                placeholder="Type a note...."
                value={noteTextData?.description || ''}
                onChange={handleChange}
                style={{ backgroundColor: noteTextData?.description.length > 0 ? '#eadcf5' : 'beige' }}
            ></textarea>
            <div className="note-footer">
                <small>{characterLimit - noteTextData?.description.length} Remaining</small>
                <button className="btn save" onClick={handleShowModel}><MdEditSquare
                    className='delete-icon'
                    size='1.3em'
                /></button>
            </div>
            {showAddModel && (
                <AddDetailModel
                    show={showAddModel}
                    data={noteTextData}
                    handleClose={handleCloseModel}
                    handleSave={handleSaveModel}
                />
            )}

        </div>
    )
}

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    const trimNoteText = noteText.trim()
    const characterLimit = 500;

    const handleChange = (event) => {
        if (characterLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
        }
    }

    const handleSaveClick = () => {
        if (trimNoteText.length > 0) {
            handleAddNote(noteText);
            setNoteText('');
        }
    }

    return (
        <div className="note" style={{ backgroundColor: trimNoteText.length > 0 ? '#eadcf5' : 'beige' }}>
            <textarea
                rows='8'
                cols='10'
                placeholder="Type to add a note...."
                value={noteText}
                onChange={handleChange}
                style={{ backgroundColor: trimNoteText.length > 0 ? '#eadcf5' : 'beige' }}
            ></textarea>
            <div className="note-footer">
                <small>{characterLimit - noteText.length} Remaining</small>
                <button className="btn save" onClick={handleSaveClick}><MdSave
                    className='delete-icon'
                    size='1.3em'
                /></button>
            </div>
        </div>
    );
};

export default AddNote;