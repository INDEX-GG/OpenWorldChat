import React, { useEffect } from "react";
import { useAuthStore } from "hooks/store/useAuthStore";

const SessionInit = () => {
  const { handleNotAuth } = useAuthStore();

  useEffect(() => {
    console.log(123);
    handleNotAuth();
  }, []);

  return null;
};

export default React.memo(SessionInit);
