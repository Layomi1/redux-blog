import React from "react";
import AddPostForm from "./app/features/posts/AddPostForm";
import PostsList from "./app/features/posts/PostsList";
import SinglePostPage from "./app/features/posts/SinglePostPage";

import { Routes, Route } from "react-router-dom";
import EditPostForm from "./app/features/posts/EditPostForm";

import UserPage from "./components/UserPage";
import UsersList from "./app/features/users/UsersList";

import Header from "./components/Header";

function App() {
  return (
    <section>
      <Header />
      <Routes>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path=":edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />}></Route>
          <Route path=":userId" element={<UserPage />}></Route>
        </Route>

        {/* catch all-replace with 404 components if you want */}
        <Route path="*" element={<h2>404 page</h2>} />
      </Routes>
    </section>
  );
}

export default App;
