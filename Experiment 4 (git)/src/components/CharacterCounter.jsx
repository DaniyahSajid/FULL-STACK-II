import React from "react";
import "../styles/Composer.css";

const limits = {
    twitter: 280,
    linkedin: 3000,
    instagram: 2200,
};

function CharacterCounter({ platform, content }) {

    console.log("CharacterCounter Rendered");

    const limit = limits[platform];

    const remaining = limit - content.length;

    return (

        <div className="counter-container">

            <div className="counter-text">

                <span>

                    Characters: {content.length} / {limit}

                </span>

            </div>

            {

                remaining === 0 && (

                    <p className="limit-message">

                        Maximum character limit reached.

                    </p>

                )

            }

        </div>

    );

}

export default React.memo(CharacterCounter);