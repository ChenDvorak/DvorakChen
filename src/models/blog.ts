export class Blog {
  id!: string;
  title!: string;
  category!: string;
  description!: string;
  /**
   * 列表接口不会返回这个字段
   */
  body!: string;
  createAt!: string;
  /**
   * 列表接口不会返回这个字段
   */
  updateAt!: string;
}

export async function getBlogs(s: string): Promise<Blog[]> {
  const url = `${process.env.API_BASE_ADDRESS}blogs?s=${s}`;

  const response = await fetch(url, {
    method: "get",
  });
  return (await response.json()) as Blog[];
}

export async function getBlog(id: string): Promise<Blog> {
  const url = `${process.env.API_BASE_ADDRESS}blogs/${id}`;

  const response = await fetch(url, {
    method: "get",
  });
  return (await response.json()) as Blog;
}

export async function createBlog(blog: Blog): Promise<string | null> {
  const url = `${process.env.API_BASE_ADDRESS}blogs`;

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(blog),
  });
  if (!response.ok) {
    const error = await response.text();
    console.error(error);
    return error;
  }
  return null;
}

export async function deleteBlog(blogId: string) {
  const url = `${process.env.API_BASE_ADDRESS}blogs/${blogId}`;

  await fetch(url, {
    method: "delete",
    credentials: "include",
  });
}

export async function updateBlog(blogId: string, blog: Blog) {
  const url = `${process.env.API_BASE_ADDRESS}blogs/${blogId}`;

  await fetch(url, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(blog),
  });
}
