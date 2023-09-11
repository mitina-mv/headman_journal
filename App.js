import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { FormSchedule } from "./src/components/FormSchedule";
import { Schedule } from "./src/components/Schedule";

export default function App() {
    const [subjects, setSubjects] = useState([]);

    const addSubject = (title) => {
        setSubjects((prevSubjects) => [
            ...prevSubjects,
            {
                id: Date.now().toString(),
                title: title,
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Navbar title="eee"></Navbar>
            <FormSchedule onSubmit={addSubject} />
            <StatusBar style="auto" />

            <View style={styles.container}>
                <Text style={styles.text}>Список предметов</Text>
                {subjects.map((subject) => {
                    return (
                        <Schedule
                            key={subject.id}
                            title={subject.title}
                        ></Schedule>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
