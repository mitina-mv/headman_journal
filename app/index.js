import { View, Text, StyleSheet } from "react-native";
import DateSwitcher from "./../src/components/DateSwitcher";
import { useEffect, useState } from "react";
import { setupDatabase } from "./../src/modules/Database";
import * as SQLite from "expo-sqlite";

export default function Page() {
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		setupDatabase(); // Создание таблицы при запуске приложения
	}, []);

	const handleDateChange = (newDate) => {
		setCurrentDate(newDate);
	  };

	return (
		<View style={styles.container}>
			<DateSwitcher currentDate={currentDate} onDateChange={handleDateChange} />
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
