import React from "react";
import { useParams } from "react-router-dom";

import { format as dateFormat } from "date-fns";
import { TopNav, LoadingSpin, Markdown } from "~/components";

import { getBlog, Blog } from "~/models/blog";
import { Helmet } from "react-helmet";

export default function BlogDetailPage() {
  const { blogId } = useParams();
  const [detail, setDetail] = React.useState({} as Blog);

  React.useEffect(() => {
    (async () => {
      if (blogId) {
        const data = await getBlog(blogId);
        setDetail(data);
      }
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>{detail?.title}</title>
        <meta name="description" content={detail?.description ?? ""} />
        <meta name="keywords" content={detail?.category ?? ""} />
      </Helmet>
      <div className="flex min-h-full flex-col space-y-5 bg-gray-200 bg-x-img bg-center pb-10">
        <TopNav />
        <div className="mx-auto flex flex-col items-center rounded bg-bg py-5 px-8 shadow-lg sm:w-11/12 md:w-10/12 xl:w-8/12">
          <div className="my-5 text-4xl">
            {detail?.title ?? (
              <LoadingSpin className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary stroke-primary" />
            )}
          </div>
          <div>{detail?.category}</div>
          <div className="text-sm">
            {detail?.createAt
              ? dateFormat(new Date(detail.createAt), "yyyy-MM-dd")
              : ""}
          </div>
          <div className="my-5 w-full text-lg">
            <Markdown value={detail.body ?? ""} />
          </div>
        </div>
      </div>
    </>
  );
}
