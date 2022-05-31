import { Content } from "~/components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createBlog, Blog } from "~/models";

export default function NewBlogPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const titleRef = React.useRef<HTMLInputElement>(null);
  const categoryRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
  const [body, setBody] = React.useState("");

  return (
    <div className="container px-7 pt-5">
      <div>New Article</div>
      <div className="flex flex-col items-center space-y-3">
        <input
          ref={titleRef}
          className={`w-[400px] rounded-md p-2 outline-none ring-2`}
          type="text"
          name="title"
          placeholder="Title"
          required
        />
        <input
          ref={categoryRef}
          className={`w-[400px] rounded-md p-2 outline-none ring-2`}
          type="text"
          name="category"
          placeholder="Category"
          required
        />
        <textarea
          ref={descriptionRef}
          className={`w-[400px] rounded-md p-2 outline-none ring-2`}
          placeholder="Description"
          required
        ></textarea>
        <Content
          onChange={(value) => {
            setBody(value);
          }}
          defaultContent={body}
        />
        <div className="self-end">
          <button
            className="rounded-md bg-primary px-3 py-2 text-bg hover:ring hover:ring-offset-2 focus:ring-primary focus:ring-offset-2
            disabled:bg-gray-400 disabled:text-gray-50 disabled:ring-gray-400"
            onClick={handleCreate}
            disabled={loading}
          >
            提交
          </button>
        </div>
      </div>
    </div>
  );

  async function handleCreate() {
    setLoading(true);
    if (!titleRef.current?.value) {
      titleRef.current?.focus();
      setLoading(false);
      return;
    }
    if (!categoryRef.current?.value) {
      categoryRef.current?.focus();
      setLoading(false);
      return;
    }
    if (!descriptionRef.current?.value) {
      descriptionRef.current?.focus();
      setLoading(false);
      return;
    }

    await createBlog({
      title: titleRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
      body,
    } as Blog);

    navigate("..");
  }
}
