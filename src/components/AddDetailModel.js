import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const AddDetailModel = ({
    show,
    data,
    handleClose,
    handleSave
}) => {

    
    const [inputs, setInputs] = useState({...data})
    const handleSubmit = () => {
        handleSave(inputs)
    }

    const handleChange = (id, value) => {
        setInputs(oldInput => ({
            ...oldInput,
            [id]: value
        }))
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Block Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                autoFocus
                                value={inputs?.title}
                                onChange={e => handleChange('title', e.target.value)}

                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={inputs?.description} onChange={e => handleChange('description', e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}