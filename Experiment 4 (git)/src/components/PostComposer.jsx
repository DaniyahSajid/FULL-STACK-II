import React, { useCallback, useState } from "react";
import PlatformSelector from "./PlatformSelector";
import CharacterCounter from "./CharacterCounter";
import "../styles/Composer.css";

function PostComposer({
    title,
    setTitle,
    platform,
    setPlatform,
    content,
    setContent,
    image,
    setImage,
    schedule,
    setSchedule,
    saveDraft,
    cancelEditing,
    editingId,
    loading,
    limit,
}) {

    const [accepted, setAccepted] = useState(false);

    const [showGuidelines, setShowGuidelines] = useState(false);

    const handleChange = useCallback(
        (e) => {

            const value = e.target.value;

            if (value.length <= limit) {

                setContent(value);

            }

        },
        [limit, setContent]
    );

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
        ];

        if (!allowedTypes.includes(file.type)) {

            alert("Only JPG, JPEG and PNG images are allowed.");

            e.target.value = "";

            return;

        }

        const reader = new FileReader();

        reader.onloadend = () => {

            setImage(reader.result);

        };

        reader.readAsDataURL(file);

    };

    const isInvalid =
        title.trim() === "" ||
        content.trim() === "" ||
        schedule === "" ||
        loading;

    return (

        <>

            <PlatformSelector
                platform={platform}
                setPlatform={setPlatform}
            />

            <div className="composer">

                <label className="section-title">
                    Draft Title
                </label>

                <input
                    type="text"
                    className="title-input"
                    placeholder="Enter draft title..."
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />

                <label
                    className="section-title"
                    style={{marginTop:"20px"}}
                >
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

                <label
                    className="section-title"
                    style={{marginTop:"20px"}}
                >
                    Schedule Date & Time
                </label>

                <input
                    type="datetime-local"
                    className="schedule-input"
                    value={schedule}
                    onChange={(e)=>setSchedule(e.target.value)}
                />

                <label
                    className="section-title"
                    style={{marginTop:"20px"}}
                >
                    Upload Image
                </label>

                <div className="upload-guidelines">

                    <input
                        type="checkbox"
                        checked={accepted}
                        onChange={(e)=>setAccepted(e.target.checked)}
                    />

                    <span>

                        I have read the upload guidelines

                    </span>

                    <button
                        type="button"
                        className="guideline-btn"
                        onClick={()=>
                            setShowGuidelines(true)
                        }
                    >
                        View Guidelines
                    </button>

                </div>

                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleImageChange}
                    disabled={!accepted}
                />

                {
                    image && (

                        <img
                            src={image}
                            alt="Preview"
                            className="preview-image"
                        />

                    )
                }

                <div className="button-group">

                    <button
                        className="save-btn"
                        onClick={saveDraft}
                        disabled={isInvalid}
                    >

                        {
                            loading
                                ? "Saving..."
                                : editingId !== null
                                ? "✏ Update Draft"
                                : "💾 Save Draft"
                        }

                    </button>
                                        {

                        editingId !== null && (

                            <button
                                className="cancel-btn"
                                onClick={cancelEditing}
                            >
                                Cancel
                            </button>

                        )

                    }

                </div>

            </div>

            {

                showGuidelines && (

                    <div className="guideline-modal">

                        <div className="guideline-content">

                            <h3>
                                Upload Guidelines
                            </h3>

                            <ul>

                                <li>
                                    Only JPG, JPEG and PNG images are allowed.
                                </li>

                                <li>
                                    Only one image can be uploaded per draft.
                                </li>

                                <li>
                                    Upload clear, high-quality images.
                                </li>

                                <li>
                                    Avoid blurred or corrupted images.
                                </li>

                            </ul>

                            <button
                                className="close-btn"
                                onClick={()=>
                                    setShowGuidelines(false)
                                }
                            >
                                Close
                            </button>

                        </div>

                    </div>

                )

            }

        </>

    );

}

export default React.memo(PostComposer);