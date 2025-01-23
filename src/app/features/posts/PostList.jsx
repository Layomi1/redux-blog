import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "./postStore";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article
      key={post.id}
      className="border-2 grid gap-2 border-white rounded-md p-4"
    >
      <h3 className="text-xl capitalize font-bold">{post.title}</h3>
      <p className="text-lg">{post.content.substring(0, 100)}</p>

      <div className="flex flex-col md:flex-row  justify-self-end md:justify-self-auto md:justify-between mt-3  ">
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <div>
        <ReactionButtons post={post} />
      </div>
    </article>
  ));
  return (
    <section className=" flex flex-col gap-4">
      <h2 className="text-3xl font-bold">Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostList;
