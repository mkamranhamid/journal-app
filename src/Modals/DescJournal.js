import React, { useState, useEffect } from "react";
import Modal from 'react-responsive-modal';

// import "./modal.css";

/* const bg = {
    overlay: {
        width: 60 %
    }
}; */

const DescJournalModal = ({ data, show, onClose }) => {
    return (
        <Modal open={show} onClose={onClose} styles={{ modal: { width: '60%', }, overlay: {} }} center >
            <div className="modal-container">
                <div className="modal-head">
                    {data.title}
                </div>
                <div className="modal-body">
                    {data.body}
                </div>
            </div>
        </Modal >
    )
}

export default DescJournalModal;