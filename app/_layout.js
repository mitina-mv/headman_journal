import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

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
          tabBarIcon: ({focused}) => <FontAwesome
            name="clock-o"
            size={24}
            color={focused ? "#30BA8F" : "#474A51"}
            />,
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
          tabBarIcon: ({focused}) => <FontAwesome
            name="users"
            size={24}
            color={focused ? "#30BA8F" : "#474A51"}
            />,
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
          tabBarIcon: ({focused}) => <FontAwesome
          name="home"
          size={24}
          color={focused ? "#30BA8F" : "#474A51"}
          />,
          headerStyle: {
            backgroundColor: "#424242",
          },
          headerRight: () => (
            <Link href="/settings" asChild style={styles.settingsButton}>
              <Pressable>
              <FontAwesome
                name="cog"
                size={24}
                color="#fff"
                />
              </Pressable>
            </Link>
          ),

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
          tabBarIcon: ({focused}) => <FontAwesome
          name="calendar"
          size={24}
          color={focused ? "#30BA8F" : "#474A51"}
          />,
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
        name="subjects"
        options={{
          title: "Предметы",
          tabBarIcon: ({focused}) => <FontAwesome
          name="book"
          size={24}
          color={focused ? "#30BA8F" : "#474A51"}
          />,
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
          href: null,
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

const styles = StyleSheet.create({
    settingsButton: {
      padding: 20,
      paddingBottom: 0,
      paddingTop: 0,
    },
  });