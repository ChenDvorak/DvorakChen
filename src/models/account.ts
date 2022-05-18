export async function login(
  account: string,
  password: string
): Promise<string> {
  const response = await fetch(`${process.env.API_BASE_ADDRESS}login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      account: account,
      password: password,
    }),
  });
  const data: string = await response.json();
  return data;
}

export function logout() {
  return fetch(`${process.env.API_BASE_ADDRESS}logout`, {
    method: "post",
    credentials: "include",
  });
}
