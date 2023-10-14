import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button, Platform } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { ip } from "../../ip";



const FeedBack = () => {
  const [feedback, setFeedback] = useState("");


  const submitEvent = () => {
    if (!feedback.length) {
      return alert("please provide a feedback");
    }
    // saving to database part
    const feedBackToSend = {
      feedback,
    }

    fetch(`http://${ip}:3001/submit_feedback`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedBackToSend)
    })

      .then(async res => {
        try {
          const jsonRes = await res.json();
          alert(jsonRes.message);
          if (res.status === 200)
            alert("Thankyou from your feedback !");
          else
            alert("failed! try again later");
        } catch (error) {
          alert("Error while uploading feedback: ", error);
        }
      }).catch(error => alert(error));

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Give Feedback</Text>
      <TextInput
        multiline
        numberOfLines={10}
        style={styles.textInput}
        onChangeText={value => setFeedback(value)}
      />
      <Pressable style={styles.buttonContainer} onPress={submitEvent}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
}
export { FeedBack }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  textInput: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#333333',
    textAlignVertical: 'top',
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    backgroundColor: '#4287F5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});