import { Link, useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") {
      return;
    }

    const s = event.currentTarget.value.trim();
    if (!s) {
      return;
    }

    navigate(`blogs?s=${s}`);
  }

  return (
    <main className="bg-white relative flex min-h-screen items-center justify-center  bg-snow bg-cover">
      <div className="flex w-full -translate-y-10 flex-col items-center justify-center space-y-5 text-center">
        <div className="mb-5 -mt-5 text-4xl">Dovrak 的博客</div>
        <input
          autoFocus={true}
          type="search"
          className="w-11/12 rounded-2xl px-3 py-2 outline-none hover:ring hover:ring-secondary focus:ring focus:ring-primary focus:ring-offset-2 md:w-8/12 lg:w-6/12"
          placeholder="按回车搜索我的博文"
          onKeyDown={handleKeyDown}
        />
        <span className="bg-gray-800 bg-opacity-60 px-6 py-1">
          <Link
            to="/blogs"
            className="text-sm text-primary text-[white] text-opacity-60"
          >
            所有文章
          </Link>
        </span>
      </div>
      <span className="absolute bottom-0 right-0 z-20 bg-gray-800 bg-opacity-80 px-4  py-1 text-sm text-[white]">
        <a
          href="https://unsplash.com/photos/RgTI2KaQ5N4"
          target="_blank"
          title="友情推荐 unsplash.com"
        >
          图片来源
        </a>
      </span>
    </main>
  );
}
