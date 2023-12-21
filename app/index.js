import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, ScrollView } from "react-native";
import DateSwitcher from "./../src/components/DateSwitcher";
import { setupDatabase } from "./../src/modules/Database";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("jornal.db");

export default function Page() {
	const [currentDate, setCurDate] = useState(new Date((new Date()).getTime() + 3 * 60 * 60 * 1000)); // (new Date()).getTime() + 3 * 60 * 60 * 1000)
	const [students, setStudents] = useState([]);
	const [schedule, setSchedule] = useState([]);
	const [attendance, setAttendance] = useState([]);
	const [selectedNedela, setSelectedNedela] = useState("white");

	useEffect(() => {
		setupDatabase(); // Создание таблицы при запуске приложения
		fetchStudents();
		fetchSchedule();
		fetchAttendance();
	}, []);

	const updateDate = (newDate) => {
	  	setCurDate(newDate)
		fetchSchedule(newDate);
		fetchAttendance(newDate);
	}

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
	};

	const fetchSchedule = (curDate = currentDate) => {
		const dayOfWeek = curDate
			.toLocaleString("en-us", { weekday: "short" })
			.toLowerCase()
			.split(", ")[0];
		console.log(dayOfWeek);

		db.transaction((tx) => {
			tx.executeSql(
				"SELECT schedule.*, subjects.reduction as subject_reduction FROM schedule LEFT JOIN subjects ON schedule.subject_id = subjects.id LEFT JOIN times ON schedule.time_id = times.id WHERE schedule.day = ? AND schedule.nedela = ? ORDER BY times.name ASC;",
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

	const fetchAttendance = (curDate = currentDate) => {
		const formattedDate = formatDate(curDate);

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
		console.log(schedule);
		console.log('attendance toggleNedela:',attendance);
	};

	const pressHandle = () => {
		fetchStudents();
		fetchSchedule();
		fetchAttendance();
	}

	const markAttendance = (studentId, subjectId) => {
		const formattedDate = formatDate(currentDate);
	  
		db.transaction((tx) => {
		  tx.executeSql(
			"SELECT id, absent FROM attendance WHERE date = ? AND person_id = ? AND schedule_id = ?;",
			[formattedDate, studentId, subjectId],
			(_, { rows: { _array } }) => {
			  if (_array.length > 0) {
				const { id, absent } = _array[0];
				tx.executeSql(
				  "DELETE FROM attendance WHERE id = ?;",
				  [id],
				  (_, result) => {
					console.log("Запись удалена");
					fetchAttendance();
				  },
				  (_, error) => {
					console.error("Ошибка при удалении записи: ", error);
				  }
				);
			  } else {
				tx.executeSql(
				  "INSERT INTO attendance (date, person_id, schedule_id, absent) VALUES (?, ?, ?, 1);",
				  [formattedDate, studentId, subjectId],
				  (_, result) => {
					console.log("Запись создана");
					fetchAttendance();
				  },
				  (_, error) => {
					console.error("Ошибка при создании записи: ", error);
				  }
				);
			  }
			},
			(_, error) => {
			  console.error("Ошибка при проверке записи: ", error);
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
					onDateChange={updateDate}
				/>

				<ScrollView style={styles.table}>
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
				</ScrollView>
				<Pressable style={styles.addButton} onPress={pressHandle}>
					<FontAwesome name="refresh" size={24} color="#fff" />
				</Pressable>
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
	addButton: {
		position: "absolute",
		bottom: 10,
		right: 10,
		padding: 15,
		paddingHorizontal: 18,
		backgroundColor: "#aaa",
		borderRadius: 100,
	},
});
