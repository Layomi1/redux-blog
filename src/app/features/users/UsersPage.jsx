import React from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserById } from "./userSlice";

const UsersPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const postsForUser = useSelector((state) =>
    selectPostByUser(state, Number())
  );
  return <div></div>;
};

export default UsersPage;
