import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Content } from "~/components";
import { getBlog, deleteBlog, updateBlog } from "~/models";
import { format } from "date-fns";

import type { Blog } from "~/models";

export default function BlogDetailPage() {
  const navigate = useNavigate();
  const { blogId } = useParams();

  const [blog, setBlog] = React.useState<Blog>({} as Blog);

  React.useEffect(() => {
    (async () => {
      const data = await getBlog(blogId!);
      setBlog(data);
    })();
  }, []);

  return (
    <div className="p-5">
      <div className="my-3 flex">
        <span>文章详情</span>
        <div className="flex flex-grow justify-end space-x-2">
          <button
            type="button"
            className="rounded px-3 ring-1"
            onClick={() => {
              navigate("..");
            }}
          >
            返回
          </button>
          <div>
            <button
              className="rounded-md bg-red-400 px-3 py-2 text-bg hover:ring hover:ring-red-500 hover:ring-offset-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <h2 className="text-4xl">
          <input
            name="title"
            type="text"
            className="rounded-md p-2 text-center outline-none ring-1 hover:ring-primary hover:ring-offset-2"
            defaultValue={blog?.title}
            required
            onChange={(event) => {
              setBlog({
                ...blog,
                title: event.currentTarget.value,
              });
            }}
          />
        </h2>
        <div>
          <input
            name="category"
            type="text"
            className="rounded-md p-2 text-center outline-none ring-1 hover:ring-primary hover:ring-offset-2"
            defaultValue={blog?.category}
            required
            onChange={(event) => {
              setBlog({
                ...blog,
                category: event.currentTarget.value,
              });
            }}
          />
        </div>
        <div className="border-b border-b-primary">
          {blog?.createAt &&
            format(new Date(blog.createAt), "yyyy-MM-dd HH:mm")}
        </div>
        <textarea
          className="rounded-md p-2 text-center outline-none ring-1 hover:ring-primary hover:ring-offset-2 w-9/12"
          defaultValue={blog?.description}
          required
          onChange={(event) => {
            setBlog({
              ...blog,
              description: event.currentTarget.value,
            });
          }}
        ></textarea>
        <div className="w-full">
          <div className="mx-auto mt-10 w-11/12 text-lg sm:w-10/12">
            <Content
              onChange={(contentValue) => {
                setBlog({
                  ...blog,
                  body: contentValue,
                });
              }}
              defaultContent={blog?.body ?? ""}
            />
            <div className="mt-2 text-right">
              <input type="text" name="id" hidden defaultValue={blog.id} />
              <TransitionButton onClick={handleUpdate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  async function handleUpdate() {
    await updateBlog(blogId!, blog);
  }

  async function handleDelete() {
    if (confirm("continue? you'll can't cancel!")) {
      await deleteBlog(blogId!);
      navigate("..");
    }
  }
}

function TransitionButton(props: { onClick: any }) {
  const UPDATEING_TEXT = "修改中...";
  const UPDATE_TEXT = "修改";
  const [text, setText] = React.useState(UPDATE_TEXT);
  function handleClick() {
    setText(UPDATEING_TEXT);
    props.onClick();
    setTimeout(() => {
      setText(UPDATE_TEXT);
    }, 1000);
  }
  return (
    <button
      className="rounded-md bg-primary px-3 py-1 text-bg hover:ring hover:ring-primary hover:ring-offset-2 disabled:bg-secondary"
      onClick={handleClick}
      disabled={text === UPDATEING_TEXT}
    >
      {text}
    </button>
  );
}
