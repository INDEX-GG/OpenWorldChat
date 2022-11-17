import React, { useEffect } from "react";
import { useAuthStore } from "hooks/store/useAuthStore";
import {
  clearStorageTokens,
  getStorageTokens,
} from "lib/services/storageServices";

const SessionInit = () => {
  const { handleUserLogout, handleRefreshToken, handleChangeAuth } =
    useAuthStore();

  const handleSuccessLogout = () => {
    clearStorageTokens();
    handleChangeAuth();
  };

  useEffect(() => {
    const { sessionRefresh, localRefresh } = getStorageTokens();
    // автологин (до закрытии вкладки)
    if (sessionRefresh) {
      handleRefreshToken({
        refresh: sessionRefresh,
      });
    }
    // логаут после открытия новой вкладки
    if (!sessionRefresh && localRefresh) {
      handleUserLogout({
        refresh: localRefresh,
        successCallback: handleSuccessLogout,
      });
    }
    // полозавтель небыл на сайте ни разу
    if (!sessionRefresh && !localRefresh) {
      handleChangeAuth();
    }
  }, []);

  return null;
};

export default React.memo(SessionInit);
