import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Pressable,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";


export const FlatListItem = ({name, id, onDelete}) => {
// const FlatListItem = ({name}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity>
                    <Pressable
                        style={styles.deleteButton}
                        onPress={() => onDelete(id)}
                    >
                        <FontAwesome
							name="times"
							size={24}
							color="#c20b00"
						/>
                    </Pressable>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 4,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    text: {
        color: "#000",
        fontSize: 16,
    },
    buttonGroup: {
        flexDirection: "row",
        gap: 8,
    },
    deleteButton: {
        padding: 8,
        borderRadius: 4,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: "#c20b00",
    },
    deleteButtonText: {
        color: "#fff",
        textTransform: "uppercase",
        fontWeight: "bold",
    },
});


export default FlatListItem;