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
    role,
}) {

    const isViewer = role === "viewer";

    const handleChange = useCallback(
        (e) => {
            const value = e.target.value;

            if (value.length <= limit) {
                setContent(value);
            }
        },
        [limit, setContent]
    );

    const isInvalid =
        content.trim() === "" ||
        loading ||
        isViewer;

    return (
        <>
            <PlatformSelector
                platform={platform}
                setPlatform={setPlatform}
                disabled={isViewer}
            />

            <div className="composer">

                <label className="section-title">
                    Write Your Post
                </label>

                <textarea
                    placeholder={
                        isViewer
                            ? "Viewer has read-only access."
                            : "What's on your mind today?"
                    }
                    value={content}
                    onChange={handleChange}
                    disabled={isViewer}
                />

                <CharacterCounter
                    platform={platform}
                    content={content}
                />

                <div className="button-group">

                    <button
                        className="save-btn"
                        onClick={saveDraft}
                        disabled={isInvalid}
                    >
                        {loading
                            ? "Saving..."
                            : editingId !== null
                            ? "✏ Update Draft"
                            : "💾 Save Draft"}
                    </button>

                    {editingId !== null && !isViewer && (
                        <button
                            className="cancel-btn"
                            onClick={cancelEditing}
                        >
                            Cancel
                        </button>
                    )}

                </div>

                {isViewer && (
                    <p
                        style={{
                            marginTop: "15px",
                            color: "#e53935",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Viewer can only view existing drafts.
                    </p>
                )}

            </div>
        </>
    );
}

export default React.memo(PostComposer);