import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", // 'idle' || 'loading" ||'succeed" || 'failed'
  error: null,
};

export const fetchPosts = createAsyncThunk("post/fetchposts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});
export const addNewPosts = createAsyncThunk(
  "post/addNewPosts",
  async (initialState) => {
    const response = await axios.post(POSTS_URL, initialState);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (err) {
      // reytun err.message
      return initialPost; // onlyn for testing redux
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletPost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response.status} : ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: String(nanoid()),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = "loading";
    });
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;

        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        const existingIds = new Set(state.posts.map((post) => post.id));
        const uniquePosts = loadedPosts.filter(
          (post) => !existingIds.has(post.id)
        );

        // state.posts = state.posts.concat(uniquePosts);
        state.posts = [
          ...new Map(
            [...state.posts, ...uniquePosts].map((post) => [post.id, post])
          ).values(),
        ];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPosts.fulfilled, (state, action) => {
        const existingPost = state.posts.find(
          (post) => post.id === action.payload.id
        );

        if (!existingPost) {
          action.payload.userId = Number(action.payload.userId);
          action.payload.date = new Date().toISOString();
          action.payload.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          console.log(action.payload);
          state.posts.push(action.payload);
        }
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const { postsAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
