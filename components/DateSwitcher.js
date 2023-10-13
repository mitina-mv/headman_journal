import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DateSwitcher = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    setCurrentDate(newDate);
  };
  // Русские сокращения дней недели и месяцев
  const daysOfWeekNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const monthsNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleDateChange(-1)}>
        <Text style={styles.button}>Назад</Text>
      </TouchableOpacity>
      <Text style={styles.date}>
        {daysOfWeekNames[currentDate.getDay()]}, {currentDate.getDate()} {monthsNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </Text>
      <TouchableOpacity onPress={() => handleDateChange(1)}>
        <Text style={styles.button}>Вперед</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 10,
  },
  button: {
    fontSize: 18,
    color: 'blue',
  },
  date: {
    fontSize: 18,
  },
});

export default DateSwitcher;
