import React, { useState } from "react";
import Modal from 'react-responsive-modal';

// import "./modal.css";

/* const bg = {
    overlay: {
        width: 60 %
    }
}; */

const CreateJournalModal = ({ show, onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onCreate({ title, body });
    }
    return (
        <Modal open={show} onClose={onClose} styles={{ modal: { width: '60%', }, overlay: {} }} center >
            <div className="modal-container">
                <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <label htmlFor="title" className="labelContainer">
                            <input type="text" id="title" placeholder="&nbsp;" autoComplete="new-password" onChange={e => setTitle(e.target.value)} />
                            <span className="label">Title</span>
                            <span className="border"></span>
                        </label>
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="body" className="labelContainer">
                            <input type="text" id="body" placeholder="&nbsp;" autoComplete="new-password" onChange={e => setBody(e.target.value)} />
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

export default CreateJournalModal;