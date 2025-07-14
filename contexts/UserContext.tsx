import * as SecureStore from "expo-secure-store";
import React, { createContext, useCallback, useEffect, useState } from "react";

interface IUserContext {
  id: string | null;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [id, setId] = useState<string | null>(null);

  const loadStorageData = useCallback(async () => {
    const id = await SecureStore.getItemAsync("id");
    setId(id);
  }, []);

  useEffect(() => {
    loadStorageData();
  }, [loadStorageData]);

  return <UserContext.Provider value={{ id }}>{children}</UserContext.Provider>;
};
