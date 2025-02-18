import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPosts } from "./postSlice";
import { selectAllUsers } from "../users/userSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPosts({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.log("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user, id) => (
    <option key={id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="flex flex-col items-center mb-8 mt-4">
      <h2 className="text-xl capitalize font-bold mb-5">Add a New Posts</h2>
      <form className="flex flex-col gap-2 w-full min-w-[350px]  ">
        <label htmlFor="postTitle">Title</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          className="w-full p-2 text-gray-600 rounded-sm"
          placeholder="Enter Post Title..."
        />

        <label htmlFor="postAuthor">Author</label>
        <select
          id="postAuthor"
          value={userId}
          className="w-full p-2 text-gray-600 rounded-sm"
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Content</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          rows={10}
          cols={10}
          onChange={onContentChanged}
          placeholder="Enter Post..."
          className="p-2  text-gray-600 rounded-sm"
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          className="bg-white text-black focus:bg-black focus:text-white p-3 rounded-lg font-semibold cursor-pointer disabled:bg-slate-500"
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
