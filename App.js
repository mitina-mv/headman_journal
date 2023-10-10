import React, { useState } from "react";
import bootstrap from "./src/bootstrap"
import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { FormSchedule } from "./src/components/FormSchedule";
import { Schedule } from "./src/components/Schedule";

export default function App() {
    const [isReady, setIsReady] = useState(false);

    if (!isReady) {
        return (
            <AppLoading
                startAsync={bootstrap}
                onFinish={() => setIsReady(true)}
                onError={(err) => console.log(err)}
            />
        );
    }

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

    const deleteSubject = (id) => {
        setSubjects((prev) => prev.filter((item) => item.id != id));
    };

    const deleteItem = (index) => {
        const newItems = [...subjects];
        newItems.splice(index, 1);
        setSubjects(subjects);
    };

    return (
        <View>
            <Navbar title="спонсор Мегафон" />
            <FormSchedule onSubmit={addSubject} />
            <StatusBar style="auto" />

            <FlatList
                data={subjects}
                renderItem={({ item }) => (
                    <Schedule item={item} onDelete={deleteSubject}></Schedule>
                )}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        height: 400,
    },
});
