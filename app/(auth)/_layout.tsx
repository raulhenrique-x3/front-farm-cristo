import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function AppLayout() {
  // const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) {
  //   return <Redirect href="/" />;
  // }

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,

        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#b4b4b4",
        tabBarStyle: {
          backgroundColor: "#ffffff",
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Feather.glyphMap;

          switch (route.name) {
            case "home":
              iconName = "home";
              break;
            case "profile":
              iconName = "user";
              break;
            case "history":
              iconName = "clock";
              break;
            default:
              iconName = "circle";
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Página Inicial",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="createUser"
        options={{
          title: "Criar Usuário",
          href: null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user-plus" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="personEdit"
        options={{
          title: "Editar Usuário",
          href: null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user-plus" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="adminRegistry"
        options={{
          title: "Registrar Admin",
          href: null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user-plus" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Histórico",
          href: null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="clock" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
