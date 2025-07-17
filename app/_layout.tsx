import { queryClient } from "@/api";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const route = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        route.push("/home");
      } else {
        route.push("/");
      }
    };

    checkAuthentication();
  }, [route]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#ffffff"
          translucent={false}
        />
        <AuthProvider>
          <UserProvider>
            <Slot />
          </UserProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
