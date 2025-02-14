// import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function Educational() {
//     const navigation = useNavigation();
//     return (
//         <SafeAreaView style={styles.container}>
//             {/* Header */}
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Educational Resources</Text>
//             </View>

//             {/* Buttons */}
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
//                     <Text style={styles.buttonText}>Diet</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
//                     <Text style={styles.buttonText}>Simpler Terms For</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
//                     <Text style={styles.buttonText}>Sleep</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
//                     <Text style={styles.buttonText}>Exercise</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
//                     <Text style={styles.buttonText}>Mental Health</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
//                     <Text style={styles.buttonText}>BUTTON6</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//     },

//     header: {
//         paddingVertical: 15,
//         backgroundColor: '#ae887b',
//         alignItems: 'center',
//         marginBottom: 5,
//     },

//     headerText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#fff',
//     },

//     buttonContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-evenly',
//         padding: 10,

//     },

//     button: {
//         width: 180,
//         height: 120,
//         backgroundColor: "#839791",
//         marginVertical: 2,
//         paddingHorizontal: 2,
//         borderRadius: 15,
//         alignItems: "center",
//         justifyContent: "center",
//         elevation: 2, // Adds a slight shadow for a modern look
//     },

//     buttonText: {
//         fontSize: 30,
//         color: "#fff",
//         fontWeight: "600",
//         textAlign: 'center',
//     },
// });

import React from "react";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function Educational() {
    const navigation = useNavigation();

    return (
        <LinearGradient colors={["#dac6be", "#ccb0a4", "#bd9989"]} style={styles.container}>
            <SafeAreaView>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Lifestyle</Text>
                </View>

                {/* Scrollable Content */}
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
                        <MaterialIcons name="local-dining" size={40} color="#fff" />
                        <Text style={styles.buttonText}>Diet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
                        <FontAwesome5 name="book-reader" size={40} color="#fff" />
                        <Text style={styles.buttonText}>Simpler Terms</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
                        <MaterialIcons name="hotel" size={40} color="#fff" />
                        <Text style={styles.buttonText}>Sleep</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
                        <FontAwesome5 name="dumbbell" size={40} color="#fff" />
                        <Text style={styles.buttonText}>Exercise</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
                        <MaterialIcons name="self-improvement" size={40} color="#fff" />
                        <Text style={styles.buttonText}>Mental Health</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('history')}>
                        <MaterialIcons name="nature" size={40} color="#fff" />
                        <Text style={styles.buttonText}>Mindfulness</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('profile')}>
                        <FontAwesome5 name="heartbeat" size={40} color="#fff" />
                        <Text style={styles.buttonText}>Heart Health</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('telemed')}>
                        <MaterialIcons name="emoji-nature" size={40} color="#fff" />
                        <Text style={styles.buttonText}>Stress Relief</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        display: 'flex',
        paddingVertical: 10,
        backgroundColor: "#ae887b",
        alignItems: "center",
        elevation: 5,
    },

    headerText: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
    },

    contentContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        paddingVertical: 20,
    },

    button: {
        width: 160,
        height: 140,
        backgroundColor: "#8c9a8d",
        marginVertical: 10,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    buttonText: {
        marginTop: 10,
        fontSize: 20,
        color: "#fff",
        fontWeight: "600",
        textAlign: "center",
    },
});
