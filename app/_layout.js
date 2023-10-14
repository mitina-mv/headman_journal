import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import {THEME} from './../modules/theme'

export default function Layout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: THEME.MAIN_COLOR,
			}}
		>
			<Tabs.Screen
				name="time"
				options={{
					title: "Время",
					tabBarIcon: ({ focused }) => (
						<FontAwesome
							name="clock-o"
							size={24}
							color={focused ? THEME.ACTIVE_COLOR : THEME.UNACTIVE_COLOR}
						/>
					),
					headerStyle: {
						backgroundColor: THEME.MAIN_COLOR,
					},

					headerTintColor: THEME.HEADER_TEXT_COLOR,
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Tabs.Screen
				name="group"
				options={{
					title: "Группа",
					tabBarIcon: ({ focused }) => (
						<FontAwesome
							name="users"
							size={24}
							color={focused ? THEME.ACTIVE_COLOR : THEME.UNACTIVE_COLOR}
						/>
					),
					headerStyle: {
						backgroundColor: THEME.MAIN_COLOR,
					},

					headerTintColor: THEME.HEADER_TEXT_COLOR,
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>

			<Tabs.Screen
				name="index"
				options={{
					title: "Главная",
					tabBarIcon: ({ focused }) => (
						<FontAwesome
							name="home"
							size={24}
							color={focused ? THEME.ACTIVE_COLOR : THEME.UNACTIVE_COLOR}
						/>
					),
					headerStyle: {
						backgroundColor: THEME.MAIN_COLOR,
					},
					headerRight: () => (
						<Link
							href="/settings"
							asChild
							style={styles.settingsButton}
						>
							<Pressable>
								<FontAwesome
									name="cog"
									size={24}
									color={THEME.HEADER_TEXT_COLOR}
								/>
							</Pressable>
						</Link>
					),

					headerTintColor: THEME.HEADER_TEXT_COLOR,
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Tabs.Screen
				name="schedule"
				options={{
					title: "Расписание",
					tabBarIcon: ({ focused }) => (
						<FontAwesome
							name="calendar"
							size={24}
							color={focused ? THEME.ACTIVE_COLOR : THEME.UNACTIVE_COLOR}
						/>
					),
					headerStyle: {
						backgroundColor: THEME.MAIN_COLOR,
					},

					headerTintColor: THEME.HEADER_TEXT_COLOR,
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Tabs.Screen
				name="subjects"
				options={{
					title: "Предметы",
					tabBarIcon: ({ focused }) => (
						<FontAwesome
							name="book"
							size={24}
							color={focused ? THEME.ACTIVE_COLOR : THEME.UNACTIVE_COLOR}
						/>
					),
					headerStyle: {
						backgroundColor: THEME.MAIN_COLOR,
					},

					headerTintColor: THEME.HEADER_TEXT_COLOR,
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
						backgroundColor: THEME.MAIN_COLOR,
					},
					headerTintColor: THEME.HEADER_TEXT_COLOR,
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					href: null,
					headerShown: false,
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
