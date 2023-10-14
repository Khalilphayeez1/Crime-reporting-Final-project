import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, StyleSheet } from 'react-native';
import { ip } from '../../ip';
import { useRef } from 'react';
import { Signup } from './Signup';
import { useRoute } from '@react-navigation/native';
import { handleSubmit } from './Signup'

const OtpScreen = () => {

  const [otp, setOTP] = useState('');
  const otpInputs = useRef([]);
  const route = useRoute();
  const { email } = route.params;


  const handleVerifyOTP = () => {
    // Send email and OTP to the server for verification
    fetch(`http://${ip}:3001/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server
      if (data.success) {
        // OTP verification successful
        Alert.alert('Success', 'OTP verified successfully');
        handleSubmit();
      } else {
        // OTP verification failed
        Alert.alert('Error', 'Invalid OTP');
      }
    })
    .catch((error) => {
      console.error(error);
      Alert.alert('Error', 'Failed to verify OTP');
    });
  };


  const handleOTPChange = (text, index) => {
    const newOTP = otp.split('');
    newOTP[index] = text;
    setOTP(newOTP.join(''));
  };

  const focusNextInput = (index) => {
    if (otpInputs.current[index + 1]) {
      otpInputs.current[index + 1].focus();
    }
  };




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verfication code is sent to: {email}</Text>
      <View style={styles.otpContainer}>
        {Array.from({ length: 6 }, (_, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={otp[index]}
            onChangeText={(text) => handleOTPChange(text, index)}
            ref={(ref) => (otpInputs.current[index] = ref)}
            onFocus={() => otpInputs.current[index].setNativeProps({ selection: { start: 0, end: 1 } })}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && otp[index] === '') {
                focusNextInput(index - 1);
              }
            }}
            onBlur={() => otpInputs.current[index].setNativeProps({ selection: { start: 0, end: 0 } })}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 2,
    borderColor: '#ff6f61',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    width: 50,
    textAlign: 'center',
    color: '#555',
    marginRight: 10,
  },
  button: {
    backgroundColor: '#ff6f61',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export { OtpScreen }