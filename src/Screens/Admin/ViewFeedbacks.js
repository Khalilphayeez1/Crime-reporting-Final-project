import react, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, View, TouchableHighlight, Button, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ip } from "../../ip";
const ViewFeedbacks = ({ navigation }) => {
    const [feedbacks, setFeedbacks] = useState([{}]);

    const deleteRecord = (feedback_id) => {
        fetch(`http://${ip}:3002/deleteRecord`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                feedback_id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        const getFeedbacks = async () => {
            try {
                let response = await fetch(`http://${ip}:3001/get_feedbacks`, {
                    method: "GET"
                });
                let json = await response.json();
                setFeedbacks(json.data);
                // else alert("Server error");
            } catch (error) {

            }
        }
        getFeedbacks();
    }, [feedbacks]);


    const tableData = feedbacks.map((item) => [item.feedback_id, item.content]);

    return (
        <ScrollView style={styles.container}>
            {feedbacks.map((item) => (
                <View key={item.feedback_id} style={styles.feedbackContainer}>
                    <View style={styles.rowContainer} >
                        <Text style={styles.label}>Feedback ID: </Text>
                        <Text style={styles.content}>{item.feedback_id}</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>Feed: </Text>
                        <Text style={styles.content}>{item.content}</Text>
                    </View>
                    <TouchableOpacity onPress={() => deleteRecord(item.feedback_id)} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Delete Feedback</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>

    )
}
export { ViewFeedbacks }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
        borderWidth: 5,
        borderColor: 'orange',
    },
    feedbackContainer: {
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
        color: 'black',
    },
    content: {
        fontSize: 16,
        color: 'black',
    },
    deleteButton: {
        backgroundColor: 'gray',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'red',
    },
});