import React from "react";
import "../styles/Draft.css";

function DraftCard({
    draft,
    editDraft,
    deleteDraft,
    role,
}) {

    const platformInfo = {
        twitter: {
            icon: "🐦",
            name: "Twitter",
        },
        linkedin: {
            icon: "💼",
            name: "LinkedIn",
        },
        instagram: {
            icon: "📸",
            name: "Instagram",
        },
    };

    const info = platformInfo[draft.platform] || {
        icon: "📄",
        name: "Unknown",
    };

    const title =
        draft.content.length > 18
            ? draft.content.substring(0, 18) + "..."
            : draft.content;

    const isAdmin = role === "admin";
    const isViewer = role === "viewer";

    return (
        <div className="draft-card">

            <div className="draft-header">

                <div>
                    <h3>{title || "Untitled Draft"}</h3>
                    <small>{draft.createdAt}</small>
                </div>

                <span className="platform-badge">
                    {info.icon} {info.name}
                </span>

            </div>

            <p>{draft.content}</p>

            <div className="draft-buttons">

                {!isViewer && (
                    <button
                        className="edit-btn"
                        onClick={() => editDraft(draft)}
                    >
                        ✏ Edit
                    </button>
                )}

                {isAdmin && (
                    <button
                        className="delete-btn"
                        onClick={() => deleteDraft(draft.id)}
                    >
                        🗑 Delete
                    </button>
                )}

                {isViewer && (
                    <span
                        style={{
                            color: "#666",
                            fontStyle: "italic",
                            fontWeight: "bold",
                        }}
                    >
                        Read Only
                    </span>
                )}

            </div>

        </div>
    );
}

export default React.memo(DraftCard);