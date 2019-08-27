import React, { useState, useEffect } from "react";
import Modal from 'react-responsive-modal';

// import "./modal.css";

/* const bg = {
    overlay: {
        width: 60 %
    }
}; */

const EditJournalModal = ({ data, show, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        console.log(data);
        if (!title || !body) {
            setTitle(data.title);
            setBody(data.body);
        }
    })
    /* if (data) {
        console.log("INSIDE DATA");
        setTitle(data.title);
        setBody(data.body);
    } */
    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit({ title, body, index: data.index });
    }
    return (
        <Modal open={show} onClose={onClose} styles={{ modal: { width: '60%', }, overlay: {} }} center >
            <div className="modal-container">
                <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <label htmlFor="title" className="labelContainer">
                            <input type="text" id="title" placeholder="&nbsp;" value={title} autoComplete="new-password" onChange={e => setTitle(e.target.value)} />
                            <span className="label">Title</span>
                            <span className="border"></span>
                        </label>
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="body" className="labelContainer">
                            <input type="text" id="body" placeholder="&nbsp;" value={body} autoComplete="new-password" onChange={e => setBody(e.target.value)} />
                            <span className="label">Body</span>
                            <span className="border"></span>
                        </label>
                    </div>
                    <div className="btn-group">
                        <button type="submit" className="button">Submit</button>
                    </div>
                </form>
            </div>
        </Modal >
    )
}

export default EditJournalModal;