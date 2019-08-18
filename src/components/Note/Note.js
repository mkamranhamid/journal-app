import React, { useState } from 'react';
import randomcolor from "randomcolor";

import "./Note.css"

const Note = ({ show, onFormSubmit }) => {
    const color = randomcolor();
    return (
        <div className="note-container">
            <div className="note-header" style={{ backgroundColor: color }}></div>
            <div className="note-text-wrap">
                <h4>Title</h4>
                <p>
                    Lorem ipsum is placeholder text commonly used in the graphic,
                    print, and publishing industries for previewing layouts and visual mockups.
                </p>
                <div className="note-footer">
                    <p className="date">22.12.18</p>
                    <p className="time">10:00AM</p>
                </div>
            </div>
        </div>
    )
}

export default Note;