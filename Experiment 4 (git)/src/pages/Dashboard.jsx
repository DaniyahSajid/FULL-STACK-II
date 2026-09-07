import {
    useEffect,
    useState,
    useCallback,
    useMemo,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    useNavigate,
    Link,
} from "react-router-dom";

import "../App.css";

import Header from "../components/Header";
import PostComposer from "../components/PostComposer";
import DraftList from "../components/DraftList";
import Toast from "../components/Toast";

import { logout } from "../features/auth/authSlice";

import {
    addPost,
    updatePost,
    deletePost,
    fetchPosts,
} from "../features/posts/postSlice";

import { selectAllPosts } from "../features/posts/postSelectors";

const limits = {
    twitter: 280,
    linkedin: 3000,
    instagram: 2200,
};

function Dashboard() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const drafts = useSelector(selectAllPosts);

    const loading = useSelector(
        (state) => state.posts.loading
    );

    const username = useSelector(
        (state) => state.auth.username
    );

    const role = useSelector(
        (state) => state.auth.role
    );

    const [platform, setPlatform] =
        useState("twitter");

    const [title, setTitle] =
        useState("");

    const [content, setContent] =
        useState("");

    const [image, setImage] =
        useState("");

    /* ---------- FIXED ---------- */

    const [schedule, setSchedule] =
        useState("");

    /* --------------------------- */

    const [editingId, setEditingId] =
        useState(null);

    const [toast, setToast] =
        useState("");

    const [
        selectedPlatform,
        setSelectedPlatform,
    ] = useState("all");

    useEffect(() => {

        dispatch(fetchPosts());

    }, [dispatch]);

    useEffect(() => {

        localStorage.setItem(
            "drafts",
            JSON.stringify(drafts)
        );

    }, [drafts]);

    const showToast = useCallback((message) => {

        setToast(message);

        setTimeout(() => {

            setToast("");

        }, 3000);

    }, []);

    const resetComposer = useCallback(() => {

        setTitle("");

        setContent("");

        setPlatform("twitter");

        setImage("");

        /* ---------- FIXED ---------- */

        setSchedule("");

        /* --------------------------- */

        setEditingId(null);

    }, []);

    const saveDraft = useCallback(() => {

        if (role === "viewer") return;

        if (title.trim() === "") return;

        if (content.trim() === "") return;

        if (schedule === "") {

            alert(
                "Please select Schedule Date & Time."
            );

            return;

        }

        if (
            content.length >
            limits[platform]
        )
            return;

        if (editingId !== null) {

            dispatch(
                updatePost({

                    id: editingId,

                    changes: {

                        title,

                        platform,

                        content,

                        image,

                        /* ---------- FIXED ---------- */

                        schedule,

                        /* --------------------------- */

                    },

                })
            );

            showToast(
                "Draft Updated Successfully"
            );

        } else {

            dispatch(
                addPost({

                    id: Date.now(),

                    title,

                    platform,

                    content,

                    image,

                    /* ---------- FIXED ---------- */

                    schedule,

                    /* --------------------------- */

                    createdAt:
                        new Date().toLocaleString(),

                })
            );

            showToast(
                "Draft Saved Successfully"
            );

        }

        resetComposer();

    }, [

        role,

        title,

        content,

        platform,

        image,

        schedule,

        editingId,

        dispatch,

        showToast,

        resetComposer,

    ]);

    const editDraft = useCallback((draft) => {

        if (role === "viewer") return;

        setEditingId(draft.id);

        setTitle(draft.title || "");

        setPlatform(draft.platform);

        setContent(draft.content);

        setImage(draft.image || "");

        /* ---------- FIXED ---------- */

        setSchedule(draft.schedule || "");

        /* --------------------------- */

    }, [role]);

    const cancelEditing = useCallback(() => {

        resetComposer();

    }, [resetComposer]);

    const deleteDraft = useCallback((id) => {

        if (role !== "admin") return;

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this draft?"
            );

        if (!confirmDelete) return;

        dispatch(deletePost(id));

        showToast(
            "Draft Deleted Successfully"
        );

    }, [

        role,

        dispatch,

        showToast,

    ]);

    const handleLogout = useCallback(() => {

        dispatch(logout());

        navigate("/");

    }, [

        dispatch,

        navigate,

    ]);

    const filteredDrafts = useMemo(() => {

        return selectedPlatform === "all"

            ? drafts

            : drafts.filter(

                  (draft) =>
                      draft.platform ===
                      selectedPlatform

              );

    }, [

        drafts,

        selectedPlatform,

    ]);

    return (

        <div className="app">

            <div className="dashboard">

                <Header />

                <div className="dashboard-top">

                    <div>

                        <h3>

                            Welcome, {username}

                        </h3>

                        <p>

                            Role :

                            <strong>

                                {" "}
                                {role.toUpperCase()}

                            </strong>

                        </p>

                    </div>

                    <div className="dashboard-actions">

                        <Link
                            to="/calendar"
                            className="calendar-link"
                        >
                            📅 Calendar
                        </Link>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            🚪 Logout
                        </button>

                    </div>

                </div>

                <div className="content">

                    {

                        role !== "viewer" && (

                            <div className="left-panel">

                                <h2>

                                    📝 Compose Post

                                </h2>

                                <PostComposer

                                    title={title}

                                    setTitle={setTitle}

                                    platform={platform}

                                    setPlatform={setPlatform}

                                    content={content}

                                    setContent={setContent}

                                    image={image}

                                    setImage={setImage}

                                    schedule={schedule}

                                    setSchedule={setSchedule}

                                    saveDraft={saveDraft}

                                    cancelEditing={cancelEditing}

                                    editingId={editingId}

                                    loading={loading}

                                    limit={limits[platform]}
                                    role={role}

                                />

                            </div>

                        )

                    }

                    {
    role === "viewer" ? (

        <div
            style={{
                width:"100%",
                display:"flex",
                justifyContent:"center",
            }}
        >

            <div className="viewer-panel">

                <h2>

                    📂 Saved Drafts ({filteredDrafts.length})

                </h2>

                <DraftList
                    drafts={filteredDrafts}
                    editDraft={editDraft}
                    deleteDraft={deleteDraft}
                    selectedPlatform={selectedPlatform}
                    setSelectedPlatform={setSelectedPlatform}
                    role={role}
                />

            </div>

        </div>

    ) : (

        <div className="right-panel">

            <h2>

                📂 Saved Drafts ({filteredDrafts.length})

            </h2>

            <DraftList
                drafts={filteredDrafts}
                editDraft={editDraft}
                deleteDraft={deleteDraft}
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={setSelectedPlatform}
                role={role}
            />

        </div>

    )
}

                </div>

            </div>

            <Toast
                message={toast}
            />

        </div>

    );

}

export default Dashboard;