import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";

import { Blog, getBlogs } from "~/models/blog";
import { TopNav, LoadingSpin } from "~/components";
import { format as dateFormat } from "date-fns";

type BlogsState = {
  blogs: Blog[];
  loading: boolean;
};

export default function ArticlesPage() {
  const [blogsState, setBlogsState] = React.useState({
    blogs: [],
    loading: true,
  } as BlogsState);
  const [search, setSearchParams] = useSearchParams();
  const s = search.get("s") ?? "";

  React.useEffect(() => {
    (async () => {
      const data = await getBlogs(s);
      setBlogsState({
        loading: false,
        blogs: data,
      });
    })();
  }, [s]);

  return (
    <div className="flex h-full min-h-screen flex-col space-y-5 bg-gray-200 bg-[url(/articles-list-bg.svg)] bg-center">
      <TopNav />
      <div className="text-center">
        <input
          type="search"
          className="w-11/12 rounded-2xl px-3 py-2 shadow outline-none hover:ring-1 hover:ring-primary hover:ring-offset-2 focus:ring focus:ring-primary focus:ring-offset-2 md:w-10/12 lg:w-8/12 xl:w-5/12"
          placeholder="回车搜索"
          defaultValue={s}
          onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== "Enter") {
              return;
            }
            const input = event.currentTarget.value.trim();
            setSearchParams(`s=${input}`);
          }}
        />
      </div>
      <div className="xl:6/12 mx-auto h-full w-11/12 rounded bg-white bg-opacity-70 p-5 shadow-lg md:w-10/12 lg:w-8/12 xl:w-5/12">
        <ul className="mx-auto max-w-xl space-y-2 text-lg">
          {blogsState.loading && (
            <div className="flex justify-center">
              <LoadingSpin className="animate-spin h-5 w-5 text-primary stroke-primary" />
            </div>
          )}
          {blogsState.blogs.map((blog) => (
            <li
              key={blog.id}
              className="rounded-lg px-3 py-1 hover:bg-white hover:shadow-lg hover:ring-1 hover:ring-opacity-25"
            >
              <div>
                <NavLink
                  className="hover:underline hover:underline-offset-2"
                  to={blog.id}
                >
                  {blog.title}
                </NavLink>
              </div>
              <div className="flex">
                <span className="flex-grow">
                  <NavLink
                    className="text-sm hover:underline hover:underline-offset-2"
                    to={`.?s=${blog.category}`}
                  >
                    {blog.category}
                  </NavLink>
                </span>
                <span className="self-end text-sm">
                  {dateFormat(new Date(blog.createAt.toString()), "yyyy-MM-dd")}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="text-center text-lg">
          {blogsState.blogs.length || blogsState.loading ? null : (
            <div>找不到有关 {s} 的博文</div>
          )}
        </div>
      </div>
    </div>
  );
}
