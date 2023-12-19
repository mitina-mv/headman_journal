import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Link } from "expo-router";


export default function Page() {
	const [semester, setSemester] = useState([]);
	const db = SQLite.openDatabase("jornal.db");

	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql(
			  `select * from semesters where active = true;`,
			  [],
			  (_, { rows: { _array } }) => {
				console.log(_array)
				setSemester(_array)},
			  (_, error) => {
				console.error("Ошибка при получении данных: ", error);
			  }
			);
		  });
	}, []);

	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<View style={styles.content}>
				{semester.length != 0 ? (
					<Text style={styles.semester}>Текущий семестр: <Text style={styles.activeText}>{semester.name}</Text></Text>
				) : (
					<TouchableOpacity onPress={() => { 		
						db.transaction((tx) => {
							tx.executeSql(
							`INSERT INTO semesters (name, active) VALUES (?, ?);`,
							['1 сем', true],
							(_, { rows: { _array } }) => {
								console.log(_array)
								setSemester({name: '1 сем', active: true})
								},
							(_, error) => {
								console.error("Ошибка при получении данных: ", error);
							}
							);
						}); 
					  }}>
						<View style={styles.addButton}>
						<Text style={styles.addButtonText}>Добавить семестр</Text>
						</View>
				  </TouchableOpacity>
				)}
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
	semester: {
		padding: 15,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1
	},
	activeText: {
		color: "#30BA8F",
		fontWeight: '600'
	},
	addButton: {
		backgroundColor: 'blue', // или любой другой цвет
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	  },
	addButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
});
