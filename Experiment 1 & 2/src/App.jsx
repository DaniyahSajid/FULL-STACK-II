import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import PostComposer from "./components/PostComposer";
import DraftList from "./components/DraftList";
import Toast from "./components/Toast";

import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  updatePost,
  deletePost,
  fetchPosts,
} from "./features/posts/postSlice";
import { selectAllPosts } from "./features/posts/postSelectors";

function App() {
  const dispatch = useDispatch();

  const drafts = useSelector(selectAllPosts);
  const loading = useSelector((state) => state.posts.loading);

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

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const resetComposer = () => {
    setContent("");
    setPlatform("twitter");
    setEditingId(null);
  };

  const saveDraft = () => {
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

      const updatedDrafts = drafts.map((draft) =>
        draft.id === editingId
          ? {
              ...draft,
              platform,
              content,
            }
          : draft
      );

      localStorage.setItem("drafts", JSON.stringify(updatedDrafts));

      showToast("Draft Updated Successfully");
    } else {
      const newDraft = {
        id: Date.now(),
        platform,
        content,
        createdAt: new Date().toLocaleString(),
      };

      dispatch(addPost(newDraft));

      localStorage.setItem(
        "drafts",
        JSON.stringify([newDraft, ...drafts])
      );

      showToast("Draft Saved Successfully");
    }

    resetComposer();
  };

  const editDraft = (draft) => {
    setEditingId(draft.id);
    setPlatform(draft.platform);
    setContent(draft.content);
  };

  const cancelEditing = () => {
    resetComposer();
  };

  const deleteDraft = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this draft?"
    );

    if (!confirmDelete) return;

    dispatch(deletePost(id));

    const updatedDrafts = drafts.filter((draft) => draft.id !== id);

    localStorage.setItem("drafts", JSON.stringify(updatedDrafts));

    showToast("Draft Deleted Successfully");
  };

  const filteredDrafts =
    selectedPlatform === "all"
      ? drafts
      : drafts.filter((draft) => draft.platform === selectedPlatform);

  return (
    <div className="app">
      <div className="dashboard">
        <Header />

        <div className="content">
          <div className="left-panel">
            <h2>📝 Compose Post</h2>

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
            />
          </div>

          <div className="right-panel">
            <h2>📂 Saved Drafts ({filteredDrafts.length})</h2>

            <DraftList
              drafts={filteredDrafts}
              editDraft={editDraft}
              deleteDraft={deleteDraft}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
            />
          </div>
        </div>
      </div>

      <Toast message={toast} />
    </div>
  );
}

export default App;