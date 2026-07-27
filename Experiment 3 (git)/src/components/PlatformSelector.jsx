import { useSelector } from "react-redux";
import "../styles/Platform.css";

function PlatformSelector({
    platform,
    setPlatform,
    disabled = false,
}) {

    const platforms = useSelector(
        (state) => state.platforms.list
    );

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

    return (
        <div className="platform-section">

            <label className="section-title">
                Choose Platform
            </label>

            <div className="platform-options">

                {platforms.map((item) => {

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
                })}

            </div>

        </div>
    );
}

export default PlatformSelector;