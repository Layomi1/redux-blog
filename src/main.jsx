import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { fetchUsers } from "./app/features/users/userSlice.js";
import { BrowserRouter } from "react-router-dom";
import { fetchPosts } from "./app/features/posts/postSlice.js";

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
