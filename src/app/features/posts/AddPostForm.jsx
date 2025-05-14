import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsSlice";

const AddPostForm = () => {
  const { addNewPost, isLoading } = useAddNewPostMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({
          title,
          body: content,
          userId,
        }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (err) {
        console.log("Failed to save the post", err);
      }
    }
  };

  const usersOptions = users.map((user, id) => (
    <option key={id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="flex flex-col items-center mb-8 mt-4 px-5">
      <h2 className="text-xl capitalize font-bold mb-5">Add a New Posts</h2>
      <form className="flex flex-col gap-2 w-full min-w-[350px]  ">
        <label htmlFor="postTitle">Title</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          className="w-full p-2 text-gray-600 border-gray-300 border-2 rounded-sm"
          placeholder="Enter Post Title..."
        />

        <label htmlFor="postAuthor">Author</label>
        <select
          id="postAuthor"
          value={userId}
          className="w-full p-2 text-gray-600 rounded-sm border-gray-300 border-2"
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
          className="p-2  text-gray-600 rounded-sm border-gray-300 border-2"
        />
        <article>
          <button
            type="button"
            onClick={onSavePostClicked}
            className="bg-white text-black focus:bg-black focus:text-white p-3 rounded-lg font-semibold cursor-pointer disabled:bg-slate-500"
            disabled={!canSave}
          >
            Save Post
          </button>
        </article>
      </form>
    </section>
  );
};

export default AddPostForm;
