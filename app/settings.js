import {
	View,
	Text,
	Pressable,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Link } from "expo-router";

export default function Page() {
	const [semester, setSemester] = useState([]);
	const db = SQLite.openDatabase("jornal.db");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		db.transaction((tx) => {
			tx.executeSql(
				`select * from semesters where active = true;`,
				[],
				(_, { rows: { _array } }) => {
					console.log(_array);
					setSemester(_array);
				},
				(_, error) => {
					console.error("Ошибка при получении данных: ", error);
				}
			);
		});
	};

	const handlePrevButtonPress = () => {
		db.transaction((tx) => {
			tx.executeSql(
				`UPDATE semesters SET active = false WHERE id = ?;`,
				[semester[0].id],
				(_, { rows: { _array } }) => {
					tx.executeSql(
						`UPDATE semesters SET active = true WHERE id = ?;`,
						[semester[0].id - 1],
						(_, { rows: { _array } }) => {
							fetchData();
						},
						(_, error) => {
							console.error(
								"Ошибка при обновлении предыдущего семестра (установление активности предыдущего семестра) ",
								error
							);
						}
					);
					fetchData();
				},
				(_, error) => {
					console.error(
						"Ошибка при обновлении предыдущего семестра (установление неактивности текущего семестра): ",
						error
					);
				}
			);
		});
	};

	const handleNextButtonPress = () => {
		db.transaction((tx) => {
			tx.executeSql(
				`UPDATE semesters SET active = false WHERE id = ?;`,
				[semester[0].id],
				(_, { rows: { _array } }) => {
					// Проверка существующего семестра с таким же ID
					tx.executeSql(
						`SELECT * FROM semesters WHERE id = ?;`,
						[semester[0].id + 1],
						(_, { rows: { _array } }) => {
							if (_array.length > 0) {
								tx.executeSql(
									`UPDATE semesters SET active = true WHERE id = ?;`,
									[semester[0].id + 1],
									(_, { rows: { _array } }) => {
										fetchData();
									},
									(_, error) => {
										console.error(
											"Ошибка при смене вперед семестра, когда он существует: ",
											error
										);
									}
								);
								fetchData();
							} else {
								tx.executeSql(
									`INSERT INTO semesters (name, active) VALUES (?, ?);`,
									[`${semester[0].id + 1} сем`, true],
									(_, { rows: { _array } }) => {
										fetchData();
									},
									(_, error) => {
										console.error(
											"Ошибка при добавлении нового семестра: ",
											error
										);
									}
								);
							}
						}
					);
				},
				(_, error) => {
					console.error(
						"Ошибка при обновлении предыдущего семестра: ",
						error
					);
				}
			);
		});
	};

	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<View style={styles.content}>
					{semester.length != 0 ? (
						<Text style={styles.semester}>
							Текущий семестр:{" "}
							<Text style={styles.activeText}>
								{semester[0].name}
							</Text>
						</Text>
					) : (
						<TouchableOpacity
							onPress={() => {
								db.transaction((tx) => {
									tx.executeSql(
										`INSERT INTO semesters (name, active) VALUES (?, ?);`,
										["1 сем", true],
										(_, { rows: { _array } }) => {
											console.log(semester);
											fetchData();
										},
										(_, error) => {
											console.error(
												"Ошибка при получении данных: ",
												error
											);
										}
									);
								});
							}}
						>
							<View style={styles.addButton}>
								<Text style={styles.addButtonText}>
									Добавить семестр
								</Text>
							</View>
						</TouchableOpacity>
					)}
					{semester.length !== 0 && semester[0].name !== "1 сем" && (
						<TouchableOpacity
							onPress={() => {
								handlePrevButtonPress();
							}}
						>
							<View style={styles.prevButton}>
								<Text style={styles.buttonText}>
									Предыдущий
								</Text>
							</View>
						</TouchableOpacity>
					)}

					{semester.length !== 0 && (
						<TouchableOpacity
							onPress={() => {
								handleNextButtonPress();
							}}
						>
							<View style={styles.nextButton}>
								<Text style={styles.buttonText}>Следующий</Text>
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
		borderBottomWidth: 1,
	},
	activeText: {
		color: "#30BA8F",
		fontWeight: "600",
	},
	addButton: {
		backgroundColor: "blue", // или любой другой цвет
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	},
	addButtonText: {
		color: "white",
		fontWeight: "bold",
	},
	prevButton: {
		backgroundColor: "red",
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	},
	nextButton: {
		backgroundColor: "green",
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
});
