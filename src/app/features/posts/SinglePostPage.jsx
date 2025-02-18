import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams, Link } from "react-router-dom";

const SinglePostPage = () => {
  const { postId } = useParams();
  const posts = useSelector(selectAllPosts);

  // const post = useSelector((state) => selectPostById(state, Number(postId)));

  const post = useMemo(() => {
    return posts.find((post) => post.id === Number(postId));
  }, [posts, postId]);

  if (!post) {
    return (
      <section className="mt-4">
        <h2 className="mb-4 text-xl font-bold capitalize">Post not found</h2>
      </section>
    );
  }
  return (
    <article className="border-2 grid gap-2 border-black rounded-md p-4 mt-4">
      <h2 className="mb-4 text-xl font-bold capitalize">{post.title}</h2>
      <p className="text-[1.2rem] mx-2 my-0">{post.body}</p>
      <p className="text-[1.2rem] mx-2 my-0">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
