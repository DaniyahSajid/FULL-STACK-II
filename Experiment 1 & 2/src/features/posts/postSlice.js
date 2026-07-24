import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.id - a.id,
});

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    return JSON.parse(localStorage.getItem("drafts")) || [];
  }
);

const initialState = postsAdapter.getInitialState({
  loading: false,
  error: null,
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: postsAdapter.addOne,

    updatePost: postsAdapter.updateOne,

    deletePost: postsAdapter.removeOne,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        postsAdapter.setAll(state, action.payload);
      })

      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
        state.error = "Unable to load drafts";
      });
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
} = postSlice.actions;

export default postSlice.reducer;

export const postSelectors =
  postsAdapter.getSelectors((state) => state.posts);