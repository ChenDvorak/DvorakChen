import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { API_BASE_ADDRESS, login } from "~/models";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirectTo = searchParams.get("redirectTo") || "/admin";

  const accountRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const [error, setError] = React.useState<{
    account: string | null;
    password: string | null;
  }>({ account: null, password: null });

  React.useEffect(() => {
    if (error.account) {
      accountRef.current?.focus();
    } else if (error.password) {
      passwordRef.current?.focus();
    }
  }, [error]);

  async function handleLogin() {
    const accountError = accountRef.current?.value ? null : "账号不能为空";
    const passwordError = passwordRef.current?.value ? null : "密码不能为空";
    if (accountError || passwordError) {
      setError({ account: accountError, password: passwordError });
      return;
    }

    const data = await login(
      accountRef.current?.value!,
      passwordRef.current?.value!
    );

    if (data) {
      alert(data);
    } else {
      navigate(redirectTo);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center bg-x-img">
      <div className="mx-auto w-full max-w-md px-8">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="account"
              className="block text-sm font-medium text-gray-700"
            >
              Name or email address
            </label>
            <div className="mt-1">
              <input
                ref={accountRef}
                id="account"
                required
                autoFocus={true}
                name="account"
                type="text"
                autoComplete="account"
                aria-describedby="account-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {error.account && (
                <div className="pt-1 text-red-700" id="account-error">
                  {error.account}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {error.password && (
                <div className="pt-1 text-red-700" id="password-error">
                  {error.password}
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="button"
            onClick={handleLogin}
            className="bg-primary text-white hover:ring w-full rounded py-2 px-4"
          >
            登录
          </button>
        </div>
      </div>
    </div>
  );
}
