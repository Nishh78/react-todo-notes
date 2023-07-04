import React, { useState, useEffect } from 'react';
import { AddDetailModel } from "./AddDetailModel";
import { MdDeleteForever, MdRemoveRedEye, MdEditSquare } from 'react-icons/md';


const Note = ({ id, title, description, date, handleEditNote, handleDeleteNote }) => {

    const [showNodeId, setShowNodeId] = useState('');
    const [showAddModel, setShowAddModel] = useState(false);
    const [noteTextData, setNoteTextData] = useState({
        title: title || '',
        description: description || ''
    });
    // not referance for click event on notes
    const noteRef = React.useRef();

    useEffect(() => {
        setNoteTextData({
            title,
            description
        })
    }, [title, description])

    const handleClickInside = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        if (noteRef.current.contains(e.target)) {
            setShowNodeId(id)
        }
    }

    const handleCloseModel = () => {
        setShowAddModel(false)
    }

    const handleShowModel = () => {
        setShowAddModel(true)
    }

    const handleSaveModel = (data) => {
        handleEditNote(id, data)
        setShowAddModel(false)
    }

    return (
        <div className='note' ref={noteRef}>
            {showNodeId !== id && (
                <div
                    onClick={(e) => handleClickInside(e, id)}
                    className='note-text'
                >
                    {noteTextData?.title || 'Click to view note'}

                </div>
            )}
            <span style={{ width: 250, height: 150, overflow: 'auto' }}>{description}</span>
            <div className='note-footer'>
                <small className='note-date'>{date}</small>
                <MdEditSquare
                    className='delete-icon'
                    size='1.2em'
                    style={{ marginLeft: 50 }}
                    onClick={handleShowModel}
                />
                <MdDeleteForever
                    onClick={(e) => { handleDeleteNote(e, id) }}
                    className='delete-icon'
                    size='1.3em'
                />
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
    );
};

export default Note;