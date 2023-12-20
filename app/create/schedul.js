import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Pressable,
	Alert,
	Button,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router } from "expo-router";
import {THEME} from '../../src/modules/theme'
import * as SQLite from "expo-sqlite";
import PickerModal from 'react-native-picker-modal-view';


export default function Page() {
	const [selectedNedela, setSelectedNedela] = useState(null);
	const [subjects, setSubjects] = useState([]);
	const [times, setTimes] = useState([]);
	const [selectedSubject, setSelectedSubject] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [selectedDay, setSelectedDay] = useState(null);
	const [currentSemester, setCurrentSemester] = useState(null);

	const db = SQLite.openDatabase("jornal.db");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		db.transaction((tx) => {
		  tx.executeSql(
			`select * from subjects;`,
			[],
			(_, { rows: { _array } }) => {
				let data = _array.map(item => ({
					Id: item.id,
					Name: item.name + ` (${item.reduction})`,
					Value: item.id
				  }));
				setSubjects(data)},
			(_, error) => {
			  console.error("Ошибка при получении данных предметов: ", error);
			}
		  );
		});

		db.transaction((tx) => {
		  tx.executeSql(
			`select * from times;`,
			[],
			(_, { rows: { _array } }) => {
				let data = _array.map(item => ({
					Id: item.id,
					Name: item.name,
					Value: item.id
				  }));
				setTimes(data)},
			(_, error) => {
			  console.error("Ошибка при получении данных времени: ", error);
			}
		  );
		});

		db.transaction((tx) => {
			tx.executeSql(
				`select * from semesters where active = true;`,
				[],
				(_, { rows: { _array } }) => {
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
		})
	};

    const pressHandler = () => {
        if(selectedSubject && selectedTime && selectedNedela && selectedDay && currentSemester) {
            addSchedule()
        } else {
            Alert.alert('Все поля должны быть заполнены!')	
        }
    };

	const addSchedule = () => {
		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO schedule (subject_id, time_id, nedela, day, semester_id) VALUES (?, ?, ?, ?, ?);",
				[selectedSubject.Value, selectedTime.Value, selectedNedela.Value, selectedDay.Value, currentSemester.id],
				(_, result) => {
					console.log(`Добавлен элемент: `, selectedSubject.Value);
					router.replace('/schedule');
				},
				(_, error) => {
					console.error("Ошибка при добавлении элемента: ", error);
				}
			);
		});
	};
	
	return (
		<SafeAreaProvider>
			<View style={styles.container}>
				<PickerModal				
					renderSelectView={(disabled, selected, showModal) =>
						<TouchableOpacity style={styles.input} onPress={showModal}>
							<View style={styles.row}>
							<Text style={styles.inputText}>
								{selectedNedela ? selectedNedela.Name : 'Выбор недели'}
							</Text>
							<FontAwesome name="angle-down" size={24} color="#424242" style={styles.icon} />
							</View>
						</TouchableOpacity>
					}
					onSelected={(selected) => {
						setSelectedNedela(selected)
					}}
					items={[
						{Id: 1, Name: "Белая", Value: 'white'},
						{Id: 2, Name: "Зеленая", Value: 'green'},
					]}
					showToTopButton={true}
					selected={selectedNedela}
					requireSelection={true}
					selectPlaceholderText={'Выбор недели'}
					searchPlaceholderText={'Поиск...'}
					style={styles.input}
				/>

				<PickerModal
					renderSelectView={(disabled, selected, showModal) =>
						<TouchableOpacity style={styles.input} onPress={showModal}>
							<View style={styles.row}>
							<Text style={styles.inputText}>
								{selectedSubject ? selectedSubject.Name : 'Выбор предмета'}
							</Text>
							<FontAwesome name="angle-down" size={24} color="#424242" style={styles.icon} />
							</View>
						</TouchableOpacity>
					}
					onSelected={(selected) => {
						setSelectedSubject(selected)
					}}
					items={subjects}
					showToTopButton={true}
					selected={selectedSubject}
					requireSelection={true}
					selectPlaceholderText={'Выбор предмета'}
					searchPlaceholderText={'Поиск...'}
					style={styles.input}
				/>

				<PickerModal
					renderSelectView={(disabled, selected, showModal) =>
						<TouchableOpacity style={styles.input} onPress={showModal}>
							<View style={styles.row}>
							<Text style={styles.inputText}>
								{selectedTime ? selectedTime.Name : 'Выбор времени'}
							</Text>
							<FontAwesome name="angle-down" size={24} color="#424242" style={styles.icon} />
							</View>
						</TouchableOpacity>
					}
					onSelected={(selected) => {
						setSelectedTime(selected)
					}}
					items={times}
					showToTopButton={true}
					selected={selectedTime}
					requireSelection={true}
					selectPlaceholderText={'Выбор времени'}
					searchPlaceholderText={'Поиск...'}
					style={styles.input}
				/>

				<PickerModal
					renderSelectView={(disabled, selected, showModal) =>
						<TouchableOpacity style={styles.input} onPress={showModal}>
							<View style={styles.row}>
							<Text style={styles.inputText}>
								{selectedDay ? selectedDay.Name : 'Выбор дня недели'}
							</Text>
							<FontAwesome name="angle-down" size={24} color="#424242" style={styles.icon} />
							</View>
						</TouchableOpacity>
					}
					onSelected={(selected) => {
						setSelectedDay(selected)
					}}
					items={[
						{Id: 1, Name: "ПН", Value: 'mon'},
						{Id: 2, Name: "ВТ", Value: 'tue'},
						{Id: 3, Name: "СР", Value: 'wed'},
						{Id: 4, Name: "ЧТ", Value: 'thu'},
						{Id: 5, Name: "ПТ", Value: 'fri'},
						{Id: 6, Name: "СБ", Value: 'sat'},
						{Id: 7, Name: "ВС", Value: 'sun'},
					]}
					showToTopButton={true}
					selected={selectedDay}
					requireSelection={true}
					selectPlaceholderText={'Выбор дня недели'}
					searchPlaceholderText={'Поиск...'}
				/>
				<TouchableOpacity style={styles.buttonGroup}>
					<Link
						href="/schedule"
						asChild
						style={styles.cancelButton}
					>
						<Pressable>
						<Text style={styles.addButtonText}>Отмена</Text>
						</Pressable>
					</Link>

					<Pressable  style={styles.addButton} onPress={pressHandler}>
						<FontAwesome name="plus" size={18} color="#fff" />
						<Text style={styles.addButtonText}>Сохранить</Text>
					</Pressable>
				</TouchableOpacity>
			</View>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		gap: 10,
		marginBottom: 10,
	},
	text: {
		color: "#fff",
		fontSize: 32,
	},
	input: {
		width: '100%',
		borderStyle: 'solid',
		borderColor: '#ccc',
		borderRadius: 5,
		borderWidth: 2,
		padding: 10,
		backgroundColor: '#fff',
	  },
	  row: {
		flexDirection: 'row', // изменение направления отображения элементов в строке
		alignItems: 'center',
	  },
	  icon: {
		marginLeft: 5, // изменение левого отступа иконки
	  },
	  inputText: {
		flex: 1,
	  },
	addButton: {
		flexDirection: 'row',
		gap: 10,
		backgroundColor: THEME.ACTIVE_COLOR,
		padding: 10,
		borderRadius: 5,
		paddingHorizontal: 15,
		alignItems: 'center',
	},
	addButtonText: {
		color: "#fff",
		fontSize: 18,
	},
	buttonGroup: {
		flexDirection: 'row', 
		gap: 10,
		marginTop: 20,
	},
	cancelButton: {
		flexDirection: 'row',
		gap: 10,
		backgroundColor: THEME.DANGER_COLOR,
		padding: 10,
		borderRadius: 5,
		paddingHorizontal: 15,
		alignItems: 'center',
	}
});
