import React from 'react';
import { Text, View, TextInput, Button, Image, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { ip } from '../../ip';
import { Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
let sendOTP;


const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [color, setColor] = useState(0);

  sendOTP = () => {
    const otpEndpoint = `http://${ip}:3001/send-otp`;

    fetch(otpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(response => {
        if (response.ok) {
          alert('Success', 'OTP sent successfully');
        } else {
          alert('Error', 'Failed to send OTP');
        }
      })
      .catch(error => {
        alert('Error', 'Failed to send OTP');
      });
  };


  const handleCheckEmail = () => {
    // return navigation.navigate('ResetPassword',{email, role});
    if (!email) {
      Alert.alert("Enter your email")
    }
    if (!role) {
      Alert.alert("Please select role")
    }
    else {
      fetch(`http://${ip}:3001/check-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.exists) {
            
            navigation.navigate('ResetPassword', { email, role });
            sendOTP();
          } else {
            Alert.alert('Email does not exist !');
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert('An error occurred');
        });
    }

  };
  const colors = ['#3FC0F4', 'darkgreen']; // define an array of colors

  useEffect(() => {
    const interval = setInterval(() => {
      setColor((color + 1) % colors.length);
    }, 500); // set interval to 2 seconds

    return () => clearInterval(interval);
  }, [color]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your Email</Text>
      <TextInput style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={{ alignItems: 'center' }}>
        <Picker
          style={styles.picker}
          enabled={true}
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          mode={"dropdown"}
        >
          <Picker.Item style={{ color: colors[color], fontSize: 18 }} label="Select Role" />
          <Picker.Item style={{ color: colors[color] }} label="Citizen" value="citizen" />
          <Picker.Item style={{ color: colors[color] }} label="Police" value="police" />
        </Picker>



      </View>
      <TouchableOpacity style={styles.button} onPress={handleCheckEmail}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 24,
    color: 'darkblue'
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "lightblue",
    color: 'black'
  },
  button: {
    width: '30%',
    height: 48,
    backgroundColor: '#3FC0F4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    marginTop: 5,
    height: 50,
    width: 170,
  }
});

export { ForgotPassword, sendOTP };
