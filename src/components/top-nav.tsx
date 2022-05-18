import { Logo } from "./logo";

export function TopNav() {
  return (
    <div className="h-16 bg-gradient-to-b from-gray-400 px-5 py-3 shadow-md">
      <a href="/">
        <Logo className="text-2xl" />
      </a>
    </div>
  );
}
