import React from "react";
import "../styles/Toast.css";

function Toast({ message }) {

    console.log("Toast Rendered");

    if (!message) return null;

    return (

        <div className="toast">

            {message}

        </div>

    );

}

export default React.memo(Toast);