import React from "react";
import AddPostForm from "./app/features/posts/AddPostForm";
import PostList from "./app/features/posts/PostList";
import SinglePostPage from "./app/features/posts/SinglePostPage";
// import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import EditPostForm from "./app/features/posts/EditPostForm";
import Header from "./components/Header";

function App() {
  return (
    <section>
      <Header />
      <Routes>
        <Route index element={<PostList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path=":edit/:postId" element={<EditPostForm />} />
        </Route>
      </Routes>
    </section>
  );
}

export default App;
