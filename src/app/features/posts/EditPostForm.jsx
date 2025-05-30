import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { selectAllUsers } from "../users/userSlice";
import {
  selectPostById,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "./postsSlice";

const EditPostForm = () => {
  const { updatePost, isLoading } = useUpdatePostMutation();
  const { deletePost } = useDeletePostMutation();

  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);
  const [userId, setUserId] = useState(post?.userId);

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post.id,
          title,
          body: content,
          userId,
        }).unwrap;

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.err("Failed to save post", err);
      }
    }
  };

  const onDeletePostClicked = async () => {
    try {
      await deletePost({
        id: postId,
      }).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="p-5 border-black border-2 round-2xl mt-5 ">
      <h2 className="text-2xl font-bold">Edit Post</h2>
      <form className="grid gap-4">
        <label htmlFor="postTitle" className="flex flex-col-reverse gap-1">
          <input
            type="text"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
            className="border-gray-300 border-2"
          />
          <span className="font-semibold"> Post Title</span>
        </label>

        <label htmlFor="postAuthor" className="flex flex-col-reverse gap-1">
          <select
            name="postAuthor"
            id="postAuthor"
            defaultValue={userId}
            onChange={onAuthorChanged}
            className="border-gray-300 border-2"
          >
            <option value=""></option>
            {usersOptions}
          </select>
          <span className="font-semibold"> Post Author</span>
        </label>

        <label htmlFor="postContent" className="flex flex-col-reverse gap-1">
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            className="border-gray-300 border-2"
          />
          <span className="font-semibold"> Content</span>
        </label>

        <article className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
            className="bg-indigo-500 text-white p-4"
          >
            Save Post
          </button>
          <button
            type="button"
            onClick={onDeletePostClicked}
            className="bg-red-500 text-white p-4"
          >
            Delete Post
          </button>
        </article>
      </form>
    </section>
  );
};

export default EditPostForm;
