import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const DateSwitcher = ({ currentDate, onDateChange }) => {
    const handleDateChange = (days) => {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + days);
      onDateChange(newDate);
    };

	// Русские сокращения дней недели и месяцев
	const daysOfWeekNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
	const monthsNames = ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"];

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => handleDateChange(-1)}>
				<Text style={styles.button}>
					<FontAwesome name="angle-left" size={24} color="#fff" />
				</Text>
			</TouchableOpacity>
			<Text style={styles.date}>
				{daysOfWeekNames[currentDate.getDay()]}, {currentDate.getDate()}{" "}
				{monthsNames[currentDate.getMonth()]}{" "}
				{currentDate.getFullYear()}
			</Text>
			<TouchableOpacity onPress={() => handleDateChange(1)}>
				<Text style={styles.button}>
					<FontAwesome name="angle-right" size={24} color="#fff" />
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomColor: "lightgray",
		borderBottomWidth: 1,
		padding: 10,
		marginBottom: 10,
	},
	button: {
		fontSize: 18,
		padding: 6,
		paddingHorizontal: 16,
		backgroundColor: "#30BA8F",
		color: "#fff",
		borderRadius: 5,
	},
	date: {
		fontSize: 18,
	},
});

export default DateSwitcher;
