import react, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ip } from "../../ip";
import { Home } from "./Home";
const AddNews = ({ navigation }) => {

    const [headline, setHeadline] = useState("");
    const [details, setDetails] = useState("");

    const SubmitNews = () => {
      if (!headline.length) {
        return alert("Please provide news headline");
      } else if (!details.length) {
        return alert("Please provide news details");
      }
      // saving to database part
      const newsToSend = {
        headline,
        details
      };
  
      fetch(`http://${ip}:3001/submit_news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newsToSend)
      })
        .then(async (res) => {
          try {
            const jsonRes = await res.json();
            alert(jsonRes.message);
            if (res.status === "News posted successfully") {
              navigation.navigate("Home");
            }
          } catch (error) {
            alert("Error while uploading news: " + error);
          }
        })
        .catch((error) => alert(error));
    };
    
    return (
        <View style={styles.container}>
          
          <Text style={styles.title}>Post Today's News</Text>
          <Text style={styles.label}>Title</Text>
          <TextInput
            placeholder="News Headline"
            multiline
            numberOfLines={2}
            style={styles.textInput}
            onChangeText={(value) => setHeadline(value)}
          />
          <Text style={styles.label}>Contents</Text>
          <TextInput
            placeholder="Contents"
            multiline
            numberOfLines={4}
            style={styles.textInput}
            onChangeText={(value) => setDetails(value)}
          />
          <TouchableOpacity style={styles.button} onPress={SubmitNews}>
            <Text style={styles.buttonLabel}>Post</Text>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 24,
      color: "black",
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: "black",
      alignSelf: "flex-start",
      marginLeft: 10,
    },
    textInput: {
      borderWidth: 1,
      borderColor: "#D10A1E",
      width: "90%",
      marginBottom: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      color:'black'
    },
    button: {
      width: "30%",
      backgroundColor: "#3FC0F4",
      borderRadius: 5,
      alignItems: "center",
      paddingVertical: 10,
      marginTop: 20,
    },
    buttonLabel: {
      fontSize: 18,
      color: "black",
    },
  });
  export { AddNews }