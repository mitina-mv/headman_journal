import { View, Text, StyleSheet } from "react-native";
import DateSwitcher from "./../src/components/DateSwitcher";
import { useEffect } from "react";
import { setupDatabase } from "./../src/modules/Database";

export default function Page() {
	useEffect(() => {
		setupDatabase(); // Создание таблицы при запуске приложения
	}, []);

	return (
		<View style={styles.container}>
			<DateSwitcher />
			<View style={styles.content}>
				<Text>Моя страница!</Text>
			</View>
		</View>
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
