import React from "react";

import "../styles/Header.css";

function Header() {

    console.log("Header Rendered");

    return (

        <header className="header">

            <h1>
                🌐 Social Media Post Composer
            </h1>

            <p>
                Create • Validate • Save • Manage Drafts
            </p>

        </header>

    );

}

export default React.memo(Header);