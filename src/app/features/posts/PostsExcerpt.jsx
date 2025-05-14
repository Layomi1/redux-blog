import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostsExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <article className="border-2 grid gap-2 border-black rounded-md p-4 mt-4">
      <h2 className="text-xl capitalize font-bold">{post.title}</h2>
      <p className="text-[1.2rem] mx-2 my-0">{post.body.substring(0, 75)}</p>

      <p className="flex flex-col md:flex-row  justify-self-end md:justify-self-auto md:justify-between mt-3">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <p>
        <ReactionButtons post={post} />
      </p>
    </article>
  );
};

export default PostsExcerpt;
