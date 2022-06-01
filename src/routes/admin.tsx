import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Logo, useEnsureLoggedIn } from "~/components";

import { Helmet } from "react-helmet";

import { logout } from "~/models";

/**
 * 后台管理页面
 * 需要登录才能进，所以进入这个页面时会检查登录了没有，如果没有登录，会重定向到登录页面
 */
export default function AdminPage() {
  const checked = useEnsureLoggedIn();

  return checked.current ? (
    <>
      <Helmet>
        <title>Dvorak Chen 后台管理</title>
      </Helmet>
      <main className="flex h-full">
        <nav
          className="f-full flex
        w-64 flex-col overflow-x-clip border-r border-r-secondary
        bg-bg
        pt-5
        shadow-lg"
        >
          <div className="py-4 text-center">
            <div className="p-4">
              <Link to="/admin" className="text-center">
                <Logo />
              </Link>
            </div>
          </div>
          <div className="flex space-x-2 self-center">
            <Logout />
          </div>
          <div className="mt-4 h-full">
            <NavLink className="block w-full p-3 text-center" to="blogs">
              文章列表
            </NavLink>
          </div>
        </nav>
        <div className="flex h-full w-full flex-col">
          <Outlet />
        </div>
      </main>
    </>
  ) : (
    // 因为验证登录需要一个过程, 在验证的过程中就显示白屏
    // 只有确认登录了才显示界面
    <></>
  );
}

function Logout() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <span className="cursor-pointer" title="logout" onClick={handleLogout}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </span>
  );
}
