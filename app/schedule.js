import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Pressable, Text, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";

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
					if (_array.length > 0) {
						console.log(_array);
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

	const fetchSchedule = (nedela) => {
		if (!currentSemester) {
			// console.error("Текущий семестр не определен.");
			return;
		}

		db.transaction((tx) => {
			tx.executeSql(
				`SELECT schedule.*, semesters.name as semester_name, subjects.name as subject_name, times.name as time_name
				FROM schedule
				LEFT JOIN semesters ON schedule.semester_id = semesters.id
				LEFT JOIN subjects ON schedule.subject_id = subjects.id
				LEFT JOIN times ON schedule.time_id = times.id
				WHERE schedule.semester_id = ? AND schedule.nedela = ?
				ORDER BY times.name ASC;`,
				[currentSemester.id, nedela],
				(_, { rows: { _array } }) => {
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

	const deleteSchedule = (id, nedela) => {
		db.transaction((tx) => {
			tx.executeSql(
				"DELETE FROM schedule WHERE id=(?);",
				[id],
				(_, result) => {
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
		fetchCurrentSemester();
		fetchSchedule("white");
		fetchSchedule("green");
		setIsRefreshing(false);
	};

	const toggleNedela = (nedela) => {
		setSelectedNedela(nedela);
		handleRefresh();
	};

	const groupScheduleByDay = (schedule) => {
		const groupedSchedule = {};
		schedule.forEach((item) => {
			const day = item.day.toLowerCase();
			if (!groupedSchedule[day]) {
				groupedSchedule[day] = [];
			}
			groupedSchedule[day].push(item);
		});
		return groupedSchedule;
	};

	const renderGroupedSchedule = (groupedSchedule) => {
		const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

		return daysOfWeek.map((day) => {
			const scheduleForDay = groupedSchedule[day] || [];
			return (
				<View key={day}>
					<Text style={styles.dayHeading}>{getDayName(day)}</Text>
					<FlatList
						data={scheduleForDay}
						renderItem={({ item }) => (
							<View style={styles.scheduleItem}>
								<Text style={styles.scheduleItemTime}>
									{item.time_name}
								</Text>
								<Text style={styles.scheduleItemText}>
									{item.subject_name}
								</Text>
								<Pressable
									onPress={() =>
										deleteSchedule(item.id, selectedNedela)
									}
								>
									<Text style={styles.deleteButton}>
										Удалить
									</Text>
								</Pressable>
							</View>
						)}
						ListEmptyComponent={() => (
							<View style={styles.scheduleItem}>
								<Text style={styles.noScheduleText}>
									Нет занятий
								</Text>
							</View>
						)}
						keyExtractor={(item) => item.id.toString()}
					/>
				</View>
			);
		});
	};

	const getDayName = (day) => {
		switch (day) {
			case "mon":
				return "Понедельник";
			case "tue":
				return "Вторник";
			case "wed":
				return "Среда";
			case "thu":
				return "Четверг";
			case "fri":
				return "Пятница";
			case "sat":
				return "Суббота";
			case "sun":
				return "Воскресенье";
			default:
				return "";
		}
	};

	useEffect(() => {
		fetchCurrentSemester();
		fetchSchedule("white");
		fetchSchedule("green");
	}, [isRefreshing]);

	const groupedWhiteSchedule = groupScheduleByDay(whiteSchedule);
	const groupedGreenSchedule = groupScheduleByDay(greenSchedule);

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

					<ScrollView>
					{renderGroupedSchedule(
						selectedNedela === "white"
							? groupedWhiteSchedule
							: groupedGreenSchedule
					)}
					</ScrollView>

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
		padding: 10
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
		backgroundColor: "#ccc",
		borderRadius: 5,
		alignItems: "center",
	},
	selectedNedelaToggle: {
		backgroundColor: "#30BA8F",
	},
	nedelaToggleText: {
		color: "#fff",
		fontWeight: "bold",
	},
	dayHeading: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 5,
		marginTop: 10
	},
	scheduleItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	deleteButton: {
		color: "red",
	},
	scheduleItemText: {
		flex: 1,
	},
	scheduleItemTime: {
		fontWeight: '700',
		color: '#424242',
		paddingRight: 10
	},
	noScheduleText: {
		color: "#888", // Либо другой цвет на ваш выбор
	},
});
