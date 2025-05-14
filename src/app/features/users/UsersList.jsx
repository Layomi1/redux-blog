import { useSelector } from "react-redux";
import { selectAllUsers } from "./userSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li key={user.id} className=" underline list-disc">
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section className="flex flex-col items-center ">
      <h2 className="font-bold text-xl mb-2 text-left">Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
