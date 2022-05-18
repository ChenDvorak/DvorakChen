import { API_BASE_ADDRESS } from "~/models";
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * redirect to given address when current user not logged inw
 * @param redirect redirect address if current user not logged in
 * @returns whether checked or not
 */
export function useEnsureLoggedIn(redirect: string = "/login") {
  const navigate = useNavigate();

  const [checked, setChecked] = React.useState(false);
  const checkRef = React.useRef<boolean>();
  checkRef.current = checked;

  React.useEffect(() => {
    (async () => {
      const response = await fetch(`${API_BASE_ADDRESS}CheckLogged`, {
        method: "post",
        credentials: "include",
      });
      if (response.status === 401) {
        navigate(redirect, { replace: true });
      }
      setChecked(true);
    })();
  }, []);

  return checkRef;
}
