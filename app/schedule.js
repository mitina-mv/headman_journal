import { View, StyleSheet, FlatList, Pressable, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import FlatListItem from "../src/components/FlatListItem";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Time() {
	const [isRefreshing, setIsRefreshing] = useState(false);
	const db = SQLite.openDatabase("jornal.db");
	const [currentSemester, setCurrentSemester] = useState(null);
	const [whiteSchedule, setWhiteSchedule] = useState([]);
	const [greenSchedule, setGreenSchedule] = useState([]);
	const [selectedNedela, setSelectedNedela] = useState("white");

	const fetchCurrentSemester = () => {
		db.transaction((tx) => {
			tx.executeSql(
				`select * from semesters where active = true;`,
				[],
				(_, { rows: { _array } }) => {
					console.log(_array);
					if (_array.length > 0) {
						setCurrentSemester(_array[0]);
					} else {
						setCurrentSemester(null);
					}
				},
				(_, error) => {
					console.error(
						"Ошибка при получении текущего семестра: ",
						error
					);
				}
			);
		});
	};

	useEffect(() => {
		fetchCurrentSemester();
		fetchSchedule("white");
		fetchSchedule("green");
	}, [isRefreshing]);

	// Функция для запроса расписания с учетом текущего семестра и недели
	const fetchSchedule = (nedela) => {
		if (!currentSemester) {
			console.error("Текущий семестр не определен.");
			return;
		}

		db.transaction((tx) => {
			tx.executeSql(
				`SELECT * FROM schedule WHERE semester_id = ? AND nedela = ?;`,
				[currentSemester.id, nedela],
				(_, { rows: { _array } }) => {
					// Разделяем расписание на белую и зеленую недели
					if (nedela === "white") {
						setWhiteSchedule(_array);
					} else if (nedela === "green") {
						setGreenSchedule(_array);
					}
				},
				(_, error) => {
					console.error("Ошибка при получении расписания: ", error);
				}
			);
		});
	};

	// Вместо вызова fetchData в deleteSchedule и handleRefresh используем fetchSchedule
	const deleteSchedule = (id, nedela) => {
		db.transaction((tx) => {
			tx.executeSql(
				"DELETE FROM schedule WHERE id=(?);",
				[id],
				(_, result) => {
					console.log(`Удалили: `, id);
					fetchSchedule(nedela);
				},
				(_, error) => {
					console.error("Ошибка при удалении элемента: ", error);
				}
			);
		});
	};

	const handleRefresh = () => {
		setIsRefreshing(true);
		fetchSchedule("white"); // Здесь укажите нужную неделю
		fetchSchedule("green"); // Здесь укажите нужную неделю
		setIsRefreshing(false);
	};

	const toggleNedela = (nedela) => {
		setSelectedNedela(nedela);
	};

	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={styles.nedelaToggleContainer}>
						<Pressable
							style={[
								styles.nedelaToggle,
								selectedNedela === "white" &&
									styles.selectedNedelaToggle,
							]}
							onPress={() => toggleNedela("white")}
						>
							<Text style={styles.nedelaToggleText}>Белая</Text>
						</Pressable>
						<Pressable
							style={[
								styles.nedelaToggle,
								selectedNedela === "green" &&
									styles.selectedNedelaToggle,
							]}
							onPress={() => toggleNedela("green")}
						>
							<Text style={styles.nedelaToggleText}>Зеленая</Text>
						</Pressable>
					</View>

					<FlatList
						data={
							selectedNedela === "white"
								? whiteSchedule
								: greenSchedule
						}
						renderItem={({ item }) => (
							<FlatListItem
								name={item.name + ` (${item.reduction})`}
								id={item.id}
								onDelete={() =>
									deleteSchedule(item.id, selectedNedela)
								}
							/>
						)}
						keyExtractor={(item) => item.id}
						refreshing={isRefreshing}
						onRefresh={handleRefresh}
					></FlatList>

					<Link
						href="/create/schedul"
						asChild
						style={styles.addButton}
					>
						<Pressable>
							<FontAwesome name="plus" size={24} color="#fff" />
						</Pressable>
					</Link>
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
		paddingTop: 10,
	},
	addButton: {
		position: "absolute",
		bottom: 10,
		right: 10,
		padding: 15,
		paddingHorizontal: 18,
		backgroundColor: "#30BA8F",
		borderRadius: 100,
	},
	nedelaToggleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	nedelaToggle: {
		flex: 1,
		padding: 10,
		backgroundColor: "#30BA8F",
		borderRadius: 5,
		alignItems: "center",
	},
	selectedNedelaToggle: {
		backgroundColor: "#40803D",
	},
	nedelaToggleText: {
		color: "#fff",
		fontWeight: "bold",
	},
});
