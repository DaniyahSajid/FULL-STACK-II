import React, { useMemo } from "react";
import DraftCard from "./DraftCard";
import "../styles/Draft.css";

function DraftList({
    drafts,
    editDraft,
    deleteDraft,
    selectedPlatform,
    setSelectedPlatform,
    role,
}) {

    const draftCards = useMemo(() => {
        return drafts.map((draft) => (
            <DraftCard
                key={draft.id}
                draft={draft}
                editDraft={editDraft}
                deleteDraft={deleteDraft}
                role={role}
            />
        ));
    }, [drafts, editDraft, deleteDraft, role]);

    return (

        <>

            <div className="filter-container">

                <button
                    className={`filter-btn ${
                        selectedPlatform === "all"
                            ? "active-filter"
                            : ""
                    }`}
                    onClick={() => setSelectedPlatform("all")}
                >
                    All
                </button>

                <button
                    className={`filter-btn ${
                        selectedPlatform === "twitter"
                            ? "active-filter"
                            : ""
                    }`}
                    onClick={() =>
                        setSelectedPlatform("twitter")
                    }
                >
                    🐦 Twitter
                </button>

                <button
                    className={`filter-btn ${
                        selectedPlatform === "linkedin"
                            ? "active-filter"
                            : ""
                    }`}
                    onClick={() =>
                        setSelectedPlatform("linkedin")
                    }
                >
                    💼 LinkedIn
                </button>

                <button
                    className={`filter-btn ${
                        selectedPlatform === "instagram"
                            ? "active-filter"
                            : ""
                    }`}
                    onClick={() =>
                        setSelectedPlatform("instagram")
                    }
                >
                    📸 Instagram
                </button>

            </div>

            <div className="draft-summary">

                <h2>

                    Saved Drafts

                    <span className="draft-count">

                        ({drafts.length})

                    </span>

                </h2>

            </div>

            {

                drafts.length === 0 ? (

                    <div className="empty-state">

                        <h3>No Drafts Found</h3>

                        <p>

                            Save a post to see it here.
                        </p>

                    </div>

                ) : (

                    <div className="draft-grid">

                        {draftCards}

                    </div>

                )

            }

        </>

    );

}

export default React.memo(DraftList);