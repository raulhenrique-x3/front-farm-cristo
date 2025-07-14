import { queryClient } from "@/api";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { Tabs, useRouter } from "expo-router";
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
          backgroundColor="#0d0d0d"
          translucent={false}
        />
        <AuthProvider>
          <UserProvider>
            <Tabs>
              <Tabs.Screen
                name="index"
                options={{ headerShown: false, href: null }}
              />
              <Tabs.Screen
                name="/home"
                options={{
                  headerShown: true,
                  title: "Home",
                  headerStyle: {
                    backgroundColor: "#0d0d0d",
                  },
                  tabBarActiveTintColor: "#4da6ff",
                  tabBarInactiveTintColor: "#999999",
                  tabBarStyle: {
                    backgroundColor: "#0d0d0d",
                  },
                  headerTintColor: "#fff",
                }}
              />
              <Tabs.Screen
                name="/profile"
                options={{
                  headerShown: true,
                  title: "Profile",
                  headerStyle: {
                    backgroundColor: "#0d0d0d",
                  },
                  tabBarActiveTintColor: "#4da6ff",
                  tabBarInactiveTintColor: "#999999",
                  tabBarStyle: {
                    backgroundColor: "#0d0d0d",
                  },
                  headerTintColor: "#fff",
                }}
              />
            </Tabs>
          </UserProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
