import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("jornal.db");

export const setupDatabase = () => {
	// таблица времени
	db.transaction((tx) => {
		tx.executeSql(
			"create table IF NOT EXISTS times (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR);",
			[],
			(_, result) => {
				console.log("Таблица times создана успешно");
			},
			(_, error) => {
				console.error("Ошибка при создании таблицы times: ", error);
			}
		);
	});
	// таблица группы
	db.transaction((tx) => {
		tx.executeSql(
			"create table IF NOT EXISTS peoples (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, firstname VARCHAR);",
			[],
			(_, result) => {
				console.log("Таблица peoples создана успешно");
			},
			(_, error) => {
				console.error("Ошибка при создании таблицы peoples: ", error);
			}
		);
	});
	// таблица семестров
	db.transaction((tx) => {
		tx.executeSql(
			"create table IF NOT EXISTS semesters (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, active BOOLEAN);",
			[],
			(_, result) => {
				console.log("Таблица semesters создана успешно");
			},
			(_, error) => {
				console.error("Ошибка при создании таблицы semesters: ", error);
			}
		);
	});
	// таблица предметов
	db.transaction((tx) => {
		tx.executeSql(
			"create table IF NOT EXISTS subjects (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, reduction VARCHAR);",
			[],
			(_, result) => {
				console.log("Таблица subjects создана успешно");
			},
			(_, error) => {
				console.error("Ошибка при создании таблицы subjects: ", error);
			}
		);
	});
	// таблица расписания
	db.transaction((tx) => {
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_id INTEGER NOT NULL,
        time_id INTEGER NOT NULL,
        semester_id INTEGER NOT NULL,
        FOREIGN KEY (subject_id) REFERENCES subjects (id),
        FOREIGN KEY (time_id) REFERENCES times (id),
        FOREIGN KEY (semester_id) REFERENCES semesters (id)
      );`,
			[],
			(_, result) => {
				console.log("Таблица schedule создана успешно");
			},
			(_, error) => {
				console.error("Ошибка при создании таблицы schedule: ", error);
			}
		);
	});
	// таблица посещения
	db.transaction((tx) => {
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS attendance (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			date DATE,
			person_id INTEGER,
			schedule_id INTEGER,
			absent BOOLEAN DEFAULT 0,
			FOREIGN KEY (person_id) REFERENCES people (id),
			FOREIGN KEY (schedule_id) REFERENCES schedule (id)
		);`,
			[],
			(_, result) => {
				console.log("Таблица attendance создана успешно");
			},
			(_, error) => {
				console.error(
					"Ошибка при создании таблицы attendance: ",
					error
				);
			}
		);
	});
};

export const insertItem = (name) => {
	db.transaction((tx) => {
		tx.executeSql(
			"INSERT INTO times (name) VALUES (?);",
			[name],
			(_, result) => {
				console.log(`Добавлен элемент: ${name}`);
			},
			(_, error) => {
				console.error("Ошибка при добавлении элемента: ", error);
			}
		);
	});
};

export const getTimes = () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM times",
				[],
				(_, { rows }) => {
					console.log("dsfsdf");
					console.log(rows);
					const data = rows;
					resolve(data);
				},
				(_, error) => {
					console.error("Ошибка при выполнении SELECT: ", error);
					reject(error);
				}
			);
		});
	});
};
