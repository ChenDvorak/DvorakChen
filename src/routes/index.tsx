import { Link, useNavigate } from "react-router-dom";
import React, { LegacyRef } from "react";

function useLoadImg(ref: React.RefObject<HTMLElement>) {
  React.useEffect(() => {
    const img = new Image();
    img.onload = function () {
      // ref.current?.classList?.remove("bg-snow-640-487");
      ref.current?.classList?.add("bg-snow-1920-1463");
    };
    img.src = "/assets/snow-1920-1463.jpg";
  }, []);
}

export default function IndexPage() {
  const navigate = useNavigate();
  const bgRef = React.useRef<HTMLDivElement>(null);
  useLoadImg(bgRef);

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
    <div className="bg-snow-640-487 bg-cover">
      <div
        ref={bgRef}
        className="relative flex min-h-screen items-center justify-center bg-cover"
      >
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
      </div>
    </div>
  );
}
