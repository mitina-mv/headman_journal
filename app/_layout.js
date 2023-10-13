import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#424242",
      }}
    >
      <Tabs.Screen
        name="time"
        options={{
          title: "Время",
          tabBarIcon: ({focused}) => {
            if(focused)
                return <FontAwesome name="clock-o" size={24} color="#30BA8F" />
            else 
                return <FontAwesome name="clock-o" size={24} color="#474A51" />
            },
          headerStyle: {
            backgroundColor: "#424242",
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: "Группа",
          tabBarIcon: ({focused}) => {
            if(focused)
                return <FontAwesome name="users" size={24} color="#30BA8F" />
            else 
                return <FontAwesome name="users" size={24} color="#474A51" />
            },
          headerStyle: {
            backgroundColor: "#424242",
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({focused}) => {
            if(focused)
                return <FontAwesome name="home" size={24} color="#30BA8F" />
            else 
                return <FontAwesome name="home" size={24} color="#474A51" />
            },
          headerStyle: {
            backgroundColor: "#424242",
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Расписание",
          tabBarIcon: ({focused}) => {
            if(focused)
                return <FontAwesome name="calendar" size={24} color="#30BA8F" />
            else 
                return <FontAwesome name="calendar" size={24} color="#474A51" />
            },
          headerStyle: {
            backgroundColor: "#424242",
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Настройки",
          tabBarIcon: ({focused}) => {
            if(focused)
                return <FontAwesome name="cog" size={24} color="#30BA8F" />
            else 
                return <FontAwesome name="cog" size={24} color="#474A51" />
            },
          headerStyle: {
            backgroundColor: "#424242",
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Tabs>
  );
}
