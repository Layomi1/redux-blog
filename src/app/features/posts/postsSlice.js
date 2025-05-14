import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";

import { apiSlice } from "../api/apiSlice";

const postsAdaptor = createEntityAdapter({
  sortComparer: (a, b) => new Date(b.date) - new Date(a.date),
});

const initialState = postsAdaptor.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (responseData) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return postsAdaptor.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),
    getPostsByUserId: builder.query({
      query: (id) => `/posts/userId=${id}`,
      transformResponse: (responseData) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return postsAdaptor.setAll(initialState, loadedPosts);
      },
     
      providesTags: (result, error, arg) => {
        // If result exists and has ids
        if (result?.ids) {
          return [
            { type: "Post", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Post", id })),
          ];
        } else {
          // If there's no result or no ids, just return the LIST tag
          return [{ type: "Post", id: "LIST" }];
        }
      },
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...initialPost,
          userId: Number(initialPost.userId),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          },
        },
      }),
      invalidatesTags: [
        {
          type: "Post",
          id: "LIST",
        },
      ],
    }),
    updatePost: builder.mutation({
      query: (initialPost) => ({
        url: `posts/${initialPost.id}`,
        method: "PUT",
        body: {
          ...initialState,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => [
        {
          type: "Post",
          id: arg.id,
        },
      ],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        {
          type: "Post",
          id: arg.id,
        },
      ],
    }),
    addReaction: builder.mutation({
      query: ({ postId, reactions }) => ({
        url: `/post/${postId}`,
        method: "PATCH",
        body: { reactions },
      }),
      async onQueryStarted(
        { postId, reactions },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData(
            "getPosts",
            undefined,
            (draft) => {
              const post = draft.entities(postId);
              if (post) post.reactions = reactions;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,

  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReactionMutation,
} = extendedApiSlice;

// returns the query result object
export const selectPostResult = extendedApiSlice.endpoints.getPosts.select();

// creates memorized resiult selector
const selectPostsData = createSelector(
  selectPostResult,

  (postsResult) => postsResult.data
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdaptor.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);
