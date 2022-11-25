import React, { useEffect } from "react";
import { useAuthStore } from "hooks/store/useAuthStore";
import { getAuthDataInSessionStorage } from "lib/services/services";

const SessionInit = () => {
  const { handleNotAuth, handleLoginUser } = useAuthStore();

  useEffect(() => {
    const { email, password } = getAuthDataInSessionStorage();
    if (email && password) {
      handleLoginUser({
        email,
        password,
        rejectCallback: () => handleNotAuth(),
      });
      return;
    }
    handleNotAuth();
  }, []);

  return null;
};

export default React.memo(SessionInit);
