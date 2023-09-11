import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { FormSchedule } from "./src/components/FormSchedule";

export default function App() {
    return (
        <View style={styles.container}>
            <Navbar title='eee'></Navbar>
            <FormSchedule></FormSchedule>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({

});
