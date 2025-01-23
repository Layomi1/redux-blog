import AddPostForm from "./app/features/posts/AddPostForm";
import PostList from "./app/features/posts/PostList";
function App() {
  return (
    <main className="w-full flex flex-col items-center bg-gray-700 min-h-screen text-white py-10 px-5 ">
      <AddPostForm />
      <PostList />
    </main>
  );
}

export default App;
