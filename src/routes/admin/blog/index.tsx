import React, { useState } from "react";
import { NavLink, useSearchParams, useLocation } from "react-router-dom";

import localforage from "localforage";
import { CACHE_CONTENT_KEY, getBlogs, Blog } from "~/models";
import { format } from "date-fns";

export default function BlogsPage() {
  const [s, setSearchParams] = useSearchParams();
  const queryS = s.get("s") ?? "";
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const location = useLocation();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  React.useEffect(() => {
    if (location.hash) {
      localforage.removeItem(CACHE_CONTENT_KEY);
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      const data = await getBlogs(queryS);
      setBlogs(data);
    })();
  }, [s]);

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-center space-x-2 p-5">
        <input
          ref={searchInputRef}
          type="search"
          className="mx-2 rounded
          p-2 outline-none ring-1 hover:ring"
          onKeyUp={typeEnterSearchBlogs}
          defaultValue={queryS}
        />
        <button
          type="submit"
          className="rounded-md bg-primary px-2 text-bg ring-1 focus:ring focus:ring-primary focus:ring-offset-2"
          onClick={searchBlogs}
        >
          Search
        </button>
        <NavLink to="new" className="align-middle text-primary">
          New Blog
        </NavLink>
      </div>
      <div className="my-2 h-[1px] w-full bg-primary"></div>
      <div className="mx-2 space-y-2">
        {blogs.map((blog) => {
          return (
            <div
              key={blog.id}
              className="flex justify-center space-x-2 rounded p-1 text-center
              text-text hover:shadow hover:ring-1"
            >
              <NavLink className="flex-grow" to={blog.id}>
                {blog.title}
              </NavLink>
              <div className="text-right text-sm">
                {blog?.createAt &&
                  format(new Date(blog.createAt), "yyyy-MM-dd HH:mm")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  function typeEnterSearchBlogs(
    event: React.KeyboardEvent<HTMLInputElement>
  ): void {
    if (event.key !== "Enter") {
      return;
    }
    searchBlogs();
  }

  async function searchBlogs() {
    const qs = new URLSearchParams(location.search);
    const newSearchInput = searchInputRef.current?.value;

    const s = (newSearchInput ?? "").trim();
    qs.set("s", s);
    setSearchParams(qs);
  }
}
