import React from "react";
import "../styles/Draft.css";

function DraftCard({
  draft,
  editDraft,
  deleteDraft,
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

  const info = platformInfo[draft.platform];

  const title =
    draft.content.length > 18
      ? draft.content.substring(0, 18) + "..."
      : draft.content;

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
        <button
          className="edit-btn"
          onClick={() => editDraft(draft)}
        >
          ✏ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteDraft(draft.id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default React.memo(DraftCard);