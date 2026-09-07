import React from "react";
import { useSelector } from "react-redux";
import "../styles/Platform.css";

const platformInfo = {
    Twitter: {
        value: "twitter",
        icon: "🐦",
        description: "280 Characters",
    },

    LinkedIn: {
        value: "linkedin",
        icon: "💼",
        description: "3000 Characters",
    },

    Instagram: {
        value: "instagram",
        icon: "📸",
        description: "Caption + Hashtags",
    },
};

function PlatformSelector({
    platform,
    setPlatform,
    disabled = false,
}) {

    console.log("PlatformSelector Rendered");

    const platforms = useSelector(
        (state) => state.platforms.list
    );

    return (

        <div className="platform-section">

            <label className="section-title">

                Choose Platform

            </label>

            <div className="platform-options">

                {

                    platforms.map((item) => {

                        const info = platformInfo[item];

                        return (

                            <label
                                key={info.value}
                                className="platform-card"
                            >

                                <input
                                    type="radio"
                                    name="platform"
                                    checked={platform === info.value}
                                    onChange={() => setPlatform(info.value)}
                                    disabled={disabled}
                                />

                                <div>

                                    <h3>

                                        {info.icon} {item}

                                    </h3>

                                    <p>

                                        {info.description}

                                    </p>

                                </div>

                            </label>

                        );

                    })

                }

            </div>

        </div>

    );

}

export default React.memo(PlatformSelector);