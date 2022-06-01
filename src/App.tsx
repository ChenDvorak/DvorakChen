import { Routes, Route } from "react-router-dom";

import IndexPage from "./routes/index";
import AdminPage from "./routes/admin";
import AdminBlogLayout from "./routes/admin/blogs";
import AdminBlogsPage from "./routes/admin/blog";
import AdminBlogDetailPage from "./routes/admin/blog/detail";
import AdminNewBlogPage from "./routes/admin/blog/new";
import NotFoundPage from "./routes/404";
import Blogs from "./routes/blogs/index";
import BlogDetail from "./routes/blogs/blog-detail";
import LoginPage from "./routes/login";

import "./styles/index.css";
import "./styles/tailwind.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="blogs">
        <Route index={true} element={<Blogs />} />
        <Route path=":blogId" element={<BlogDetail />} />
      </Route>
      <Route path="/admin" element={<AdminPage />}>
        <Route path="blogs" element={<AdminBlogLayout />}>
          <Route index={true} element={<AdminBlogsPage />} />
          <Route path=":blogId" element={<AdminBlogDetailPage />} />
          <Route path="new" element={<AdminNewBlogPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
