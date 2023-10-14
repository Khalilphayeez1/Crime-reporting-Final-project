import react from "react";
import { Text, View, Button, StyleSheet, TextInput , TouchableOpacity} from "react-native";
import { useState } from "react";
import { Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import { ForgotPassword } from "./ForgotPassword";
import { sendOTP } from "./ForgotPassword";
import { ip } from "../../ip";


const ResetPassword = ({navigation}) => {


    const route = useRoute();
    const { email, role } = route.params;
    const [otp, setOtp] = useState('');
    const handleOtpChange = (text) => {
        setOtp(text);
    };

    const handleVerifyOTP = () => {

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
            navigation.navigate('UpdatePassword', {email, role})
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

    return (
        <View style={styles.container}>
            <Text style={styles.header}>ENTER YOUR OTP</Text>

            <Text style={styles.instructions}>
                Enter the 6-digit OTP sent to your Email
            </Text>
            <Text style={styles.email}>
                {email}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="OTP Input"
                keyboardType="numeric"
                maxLength={6}
                value={otp}
                onChangeText={handleOtpChange}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={sendOTP} >
                    <Text style={styles.buttonText}>Resend OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
                    <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'black'
    },
    instructions: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color:"black"
    },
    email:{
        color:'darkblue',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor:'lightblue',
        color:'black'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#3FC0F4',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export { ResetPassword }