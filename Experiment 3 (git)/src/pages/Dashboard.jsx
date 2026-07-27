import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const drafts = useSelector(selectAllPosts);
    const loading = useSelector((state) => state.posts.loading);

    const username = useSelector((state) => state.auth.username);
    const role = useSelector((state) => state.auth.role);

    const [platform, setPlatform] = useState("twitter");
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [toast, setToast] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState("all");

    const limits = {
        twitter: 280,
        linkedin: 3000,
        instagram: 2200,
    };

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    // Automatically save all drafts whenever Redux changes
    useEffect(() => {
        localStorage.setItem(
            "drafts",
            JSON.stringify(drafts)
        );
    }, [drafts]);

    const showToast = (message) => {
        setToast(message);

        setTimeout(() => {
            setToast("");
        }, 3000);
    };

    const resetComposer = () => {
        setContent("");
        setPlatform("twitter");
        setEditingId(null);
    };

    const saveDraft = () => {
        if (role === "viewer") return;

        if (content.trim() === "") return;

        if (content.length > limits[platform]) return;

        if (editingId !== null) {

            dispatch(
                updatePost({
                    id: editingId,
                    changes: {
                        platform,
                        content,
                    },
                })
            );

            showToast("Draft Updated Successfully");

        } else {

            dispatch(
                addPost({
                    id: Date.now(),
                    platform,
                    content,
                    createdAt: new Date().toLocaleString(),
                })
            );

            showToast("Draft Saved Successfully");
        }

        resetComposer();
    };

    const editDraft = (draft) => {

        if (role === "viewer") return;

        setEditingId(draft.id);
        setPlatform(draft.platform);
        setContent(draft.content);
    };

    const cancelEditing = () => {
        resetComposer();
    };

    const deleteDraft = (id) => {

        if (role !== "admin") return;

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this draft?"
        );

        if (!confirmDelete) return;

        dispatch(deletePost(id));

        showToast("Draft Deleted Successfully");
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const filteredDrafts =
        selectedPlatform === "all"
            ? drafts
            : drafts.filter(
                  (draft) =>
                      draft.platform === selectedPlatform
              );

    return (
        <div className="app">

            <div className="dashboard">

                <Header />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
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

                    <button
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

                <div className="content">

                    <div className="left-panel">

                        <h2>
                            📝 Compose Post
                        </h2>

                        <PostComposer
                            platform={platform}
                            setPlatform={setPlatform}
                            content={content}
                            setContent={setContent}
                            saveDraft={saveDraft}
                            cancelEditing={cancelEditing}
                            editingId={editingId}
                            loading={loading}
                            limit={limits[platform]}
                            role={role}
                        />

                    </div>

                    <div className="right-panel">

                        <h2>
                            📂 Saved Drafts (
                            {filteredDrafts.length}
                            )
                        </h2>

                        <DraftList
                            drafts={filteredDrafts}
                            editDraft={editDraft}
                            deleteDraft={deleteDraft}
                            selectedPlatform={selectedPlatform}
                            setSelectedPlatform={
                                setSelectedPlatform
                            }
                            role={role}
                        />

                    </div>

                </div>

            </div>

            <Toast message={toast} />

        </div>
    );
}

export default Dashboard;