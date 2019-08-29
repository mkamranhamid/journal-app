import React, { useState } from 'react';
import Loader from "../Loader/Loader";
import "./LoadingButton.css"


const LoadingButton = ({ loading, click, ...props }) => {
    console.log(" LoadingButton: ", loading);
    return (
        <button className="button" {...props}>
            {loading && <Loader size="20" classes="mr-10" />}
            {props.children}
        </button>
    )
}

export default LoadingButton;