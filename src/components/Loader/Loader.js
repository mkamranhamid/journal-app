import React from 'react';

import "./Loader.css";

const Loader = ({ size = 30, classes = "" }) => {
    // classes = classes ? classes + " " : "";
    return (
        <div className={`${classes} loader`} style={{ width: `${size}px`, height: `${size}px` }}></div>
    )
}

export default Loader;