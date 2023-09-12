import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
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
        <View>
            <Navbar title="спонсор Мегафон" />
            <FormSchedule onSubmit={addSubject} />
            <StatusBar style="auto" /> 

            <FlatList
                data={subjects}
                renderItem={({ item }) => (
                    <Schedule title={item.title}></Schedule>
                )}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        height: 400
    }
});
