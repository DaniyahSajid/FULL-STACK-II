import React, { useCallback } from "react";
import PlatformSelector from "./PlatformSelector";
import CharacterCounter from "./CharacterCounter";
import "../styles/Composer.css";

function PostComposer({
  platform,
  setPlatform,
  content,
  setContent,
  saveDraft,
  cancelEditing,
  editingId,
  loading,
  limit,
}) {
  const handleChange = useCallback(
    (e) => {
      const value = e.target.value;

      if (value.length <= limit) {
        setContent(value);
      }
    },
    [limit, setContent]
  );

  const isInvalid = content.trim() === "";

  return (
    <>
      <PlatformSelector
        platform={platform}
        setPlatform={setPlatform}
      />

      <div className="composer">
        <label className="section-title">
          Write Your Post
        </label>

        <textarea
          placeholder="What's on your mind today?"
          value={content}
          onChange={handleChange}
        />

        <CharacterCounter
          platform={platform}
          content={content}
        />

        <div className="button-group">
          <button
            className="save-btn"
            onClick={saveDraft}
            disabled={loading || isInvalid}
          >
            {loading
              ? "Saving..."
              : editingId !== null
              ? "✏ Update Draft"
              : "💾 Save Draft"}
          </button>

          {editingId !== null && (
            <button
              className="cancel-btn"
              onClick={cancelEditing}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(PostComposer);