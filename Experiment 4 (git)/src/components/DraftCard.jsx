import React, { useState } from "react";
import "../styles/Draft.css";

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

function DraftCard({
    draft,
    editDraft,
    deleteDraft,
    role,
}) {

    console.log("DraftCard Rendered:", draft.id);

    const [showModal, setShowModal] = useState(false);

    const info = platformInfo[draft.platform] || {
        icon: "📄",
        name: "Unknown",
    };

    const cardTitle =
        draft.title && draft.title.trim() !== ""
            ? draft.title
            : "Untitled Draft";

    const preview =
        draft.content.length > 120
            ? draft.content.substring(0, 120) + "..."
            : draft.content;

    const isAdmin = role === "admin";
    const isViewer = role === "viewer";

    return (

        <>

            <div
                className="draft-card"
                onClick={() => setShowModal(true)}
            >

                <div className="draft-header">

                    <div>

                        <h3>{cardTitle}</h3>

                        <small>{draft.createdAt}</small>

                    </div>

                    <span className="platform-badge">

                        {info.icon} {info.name}

                    </span>

                </div>

                <p>{preview}</p>

                {

                    draft.schedule && (

                        <div className="schedule-info">

                            📅 Scheduled:
                            <br />
                            {new Date(draft.schedule).toLocaleString()}

                        </div>

                    )

                }

                {

                    draft.image && (

                        <img
                            src={draft.image}
                            alt="Draft"
                            className="draft-image"
                        />

                    )

                }

                <div
                    className="draft-buttons"
                    onClick={(e) => e.stopPropagation()}
                >

                    {

                        !isViewer && (

                            <button
                                className="edit-btn"
                                onClick={() => editDraft(draft)}
                            >
                                ✏ Edit
                            </button>

                        )

                    }

                    {

                        isAdmin && (

                            <button
                                className="delete-btn"
                                onClick={() => deleteDraft(draft.id)}
                            >
                                🗑 Delete
                            </button>

                        )

                    }

                    {

                        isViewer && (

                            <span
                                style={{
                                    color: "#666",
                                    fontStyle: "italic",
                                    fontWeight: "bold",
                                }}
                            >
                                Read Only
                            </span>

                        )

                    }

                </div>

            </div>

            {

                showModal && (

                    <div
                        className="draft-modal-overlay"
                        onClick={() => setShowModal(false)}
                    >

                        <div
                            className="draft-modal"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <div className="modal-header">

                                <h2>{cardTitle}</h2>

                                <button
                                    className="close-modal-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    ✖
                                </button>

                            </div>

                            <div className="modal-platform">

                                <strong>Platform:</strong>{" "}
                                {info.icon} {info.name}

                            </div>

                            {

                                draft.schedule && (

                                    <div className="modal-schedule">

                                        <strong>Scheduled:</strong>{" "}
                                        {new Date(draft.schedule).toLocaleString()}

                                    </div>

                                )

                            }

                            {

                                draft.image && (

                                    <img
                                        src={draft.image}
                                        alt="Draft"
                                        className="modal-image"
                                    />

                                )

                            }

                            <div className="modal-content">

                                <strong>Post Content</strong>

                                <p>{draft.content}</p>

                            </div>

                            <div className="modal-footer">

                                <button
                                    className="close-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>

                )

            }

        </>

    );

}

export default React.memo(DraftCard);