import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Educational() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Educational Resources</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
                    <Text style={styles.buttonText}>Diet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
                    <Text style={styles.buttonText}>Simpler Terms For</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
                    <Text style={styles.buttonText}>Sleep</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
                    <Text style={styles.buttonText}>Exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
                    <Text style={styles.buttonText}>Mental Health</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
                    <Text style={styles.buttonText}>BUTTON6</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    header: {
        paddingVertical: 15,
        backgroundColor: '#ae887b',
        alignItems: 'center',
        marginBottom: 5,
    },

    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },

    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: 10,

    },

    button: {
        width: 180,
        height: 120,
        backgroundColor: "#839791",
        marginVertical: 2,
        paddingHorizontal: 2,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        elevation: 2, // Adds a slight shadow for a modern look
    },

    buttonText: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "600",
        textAlign: 'center',
    },
});
