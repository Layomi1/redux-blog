import { useSelector } from "react-redux";
import { selectUserById } from "./userSlice";

import { Link, useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery } from "../posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const {
    data: postsForUser,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetPostsByUserIdQuery(userId);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = postsForUser;
    content = ids.map((id) => {
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
      </li>;
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section className="w-full pt-4 mx-30">
      <h2 className="mb-2 font-bold text-xl ">{user?.name}</h2>
      <ol className="">{content}</ol>
    </section>
  );
};

export default UserPage;
