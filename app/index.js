import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import DateSwitcher from "./../src/components/DateSwitcher";
import { setupDatabase } from "./../src/modules/Database";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("jornal.db");

export default function Page() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [students, setStudents] = useState([]);
	const [schedule, setSchedule] = useState([]);
	const [attendance, setAttendance] = useState([]);
	const [selectedNedela, setSelectedNedela] = useState("white");

	useEffect(() => {
		setupDatabase(); // Создание таблицы при запуске приложения
		fetchStudents();
		fetchSchedule();
		fetchAttendance();
	}, [currentDate]);

	const fetchStudents = () => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM peoples ORDER BY firstname;",
				[],
				(_, { rows: { _array } }) => {
					setStudents(_array);
				},
				(_, error) => {
					console.error("Ошибка при получении студентов: ", error);
				}
			);
		});

		console.log(attendance);
		console.log(schedule);
		console.log(students);
	};

	const fetchSchedule = () => {
		const dayOfWeek = currentDate
			.toLocaleString("en-us", { weekday: "short" })
			.toLowerCase()
			.split(", ")[0];
		console.log(dayOfWeek);

		db.transaction((tx) => {
			tx.executeSql(
				"SELECT schedule.*, subjects.reduction as subject_reduction FROM schedule LEFT JOIN subjects ON schedule.subject_id = subjects.id WHERE schedule.day = ? AND schedule.nedela = ?;", // TODO поменять неделю
				[dayOfWeek, selectedNedela],
				(_, { rows: { _array } }) => {
					setSchedule(_array);
				},
				(_, error) => {
					console.error("Ошибка при получении расписания: ", error);
				}
			);
		});
	};

	const fetchAttendance = () => {
		const formattedDate = formatDate(currentDate);

		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM attendance WHERE date = ?;",
				[formattedDate],
				(_, { rows: { _array } }) => {
					setAttendance(_array);
				},
				(_, error) => {
					console.error("Ошибка при получении посещаемости: ", error);
				}
			);
		});
	};

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const toggleNedela = (nedela) => {
		setSelectedNedela(nedela);
		fetchAttendance();
		fetchSchedule();
		console.log(nedela);
	};

	const markAttendance = (studentId, subjectId) => {
		const formattedDate = formatDate(currentDate);

		db.transaction((tx) => {
			tx.executeSql(
				"INSERT OR REPLACE INTO attendance (date, person_id, schedule_id, absent) VALUES (?, ?, ?, NOT COALESCE((SELECT absent FROM attendance WHERE date = ? AND person_id = ? AND schedule_id = ?), 0));",
				[
					formattedDate,
					studentId,
					subjectId,
					formattedDate,
					studentId,
					subjectId,
				],
				(_, result) => {
					fetchAttendance();
				},
				(_, error) => {
					console.error(
						"Ошибка при обновлении посещаемости: ",
						error
					);
				}
			);
		});
	};

	return (
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
				
				<DateSwitcher
					currentDate={currentDate}
					onDateChange={setCurrentDate}
				/>

				<View style={styles.table}>
					{/* Заголовок таблицы */}
					<View style={styles.tableRow}>
						<View style={styles.tableCell} />
						{schedule.map((subject) => (
							<View style={styles.tableCell} key={subject.id}>
								<Text>{subject.subject_reduction}</Text>
							</View>
						))}
					</View>

					{/* Тело таблицы */}
					{students.map((student) => (
						<View style={styles.tableRow} key={student.id}>
							<View style={styles.tableCell}>
								<Text>{student.firstname}</Text>
							</View>
							{schedule.map((subject) => (
								<TouchableOpacity
									style={[
										styles.tableCell,
										{
											backgroundColor: attendance.find(
												(a) =>
													a.person_id ===
														student.id &&
													a.schedule_id === subject.id
											)?.absent
												? "#ec4b4b"
												: "white",
										},
									]}
									key={subject.id}
									onPress={() =>
										markAttendance(student.id, subject.id)
									}
								>
									<Text>-</Text>
								</TouchableOpacity>
							))}
						</View>
					))}
				</View>
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
	table: {
		flex: 1,
	},
	tableRow: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "lightgray",
	},
	tableCell: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		borderRightColor: "lightgray",
		borderRightWidth: 1,
	},
	nedelaToggleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
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
});
