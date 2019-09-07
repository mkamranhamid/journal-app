import React, { useState } from 'react';
import randomcolor from "randomcolor";
import * as moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTrashAlt,
    faPenAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./Note.css"

library.add(
    faTrashAlt,
    faPenAlt,
)

const Note = ({ data, onRemove, onEdit, click }) => {
    const color = randomcolor();
    const { title, body, createdAt } = data;
    const handleOnRemove = (e) => {
        e.stopPropagation();
        onRemove({ id: data.id, index: data.index });
    }
    const handleOnEdit = (e) => {
        e.stopPropagation();
        onEdit({ data, index: data.index });
    }
    return (
        <div className="note-container" >
            <div className="note-header" style={{ backgroundColor: color }}></div>

            <div className="note-text-wrap" onClick={() => click({ data, index: data.index })}>
                <div className="note-content">
                    <div className="f-r red cursor-pointer" onClick={handleOnRemove}>
                        <FontAwesomeIcon
                            icon={['fas', 'trash-alt']}
                            fixedWidth={false}
                            size="1x"
                        />
                    </div>
                    <div className="f-r gray cursor-pointer edit-icon" onClick={handleOnEdit}>
                        <FontAwesomeIcon
                            icon={['fas', 'pen-alt']}
                            fixedWidth={false}
                            size="1x"
                        />
                    </div>
                    <h4 className="word-break">{title}</h4>
                    <p className="block-with-text word-break">
                        {body}
                    </p>
                    <div className="note-footer" >
                        <p className="date">{moment(+createdAt).format('DD.MM.YY')}</p>
                        <p className="time">{moment(+createdAt).format('h:mm a').toLocaleUpperCase()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note;