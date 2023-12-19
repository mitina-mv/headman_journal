import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, Stack  } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import {THEME} from './../../src/modules/theme'


export default function Layout() {
	return (
		<Stack>
			<Stack.Screen
				name="subject"
				options={{
					title: "Создание предмета",
					presentation: "modal",
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
		</Stack>
	);
}
