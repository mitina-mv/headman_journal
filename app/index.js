import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DateSwitcher from "./../src/components/DateSwitcher";
import { useEffect } from "react";
import { setupDatabase } from "./../src/modules/Database";

export default function Page() {
	useEffect(() => {
		setupDatabase(); // Создание таблицы при запуске приложения
	}, []);

	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<DateSwitcher />
				<View style={styles.content}>
					<Text>Моя страница!</Text>
				</View>
			</View>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
	},
	content: {
		flex: 1,
	},
});
