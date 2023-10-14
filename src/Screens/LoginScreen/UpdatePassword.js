import React from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { ip } from "../../ip";
import { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { color } from "react-native-reanimated";
import { Alert } from "react-native";


const UpdatePassword = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const route = useRoute();
    const { email, role } = route.params;
    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Please enter both fields');
            return;
        }

        if (newPassword !== confirmPassword) { 
            Alert.alert('Passwords do not match');     
            return;
        }

        try {
            const response = await fetch(`http://${ip}:3001/reset-password`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, role, newPassword }),
            });
      
            if (response.ok) {
              Alert.alert('Password reset successful');
              navigation.navigate('Signin');
            } else {
              Alert.alert('Password reset failed');
            }
          } catch (error) {
            console.error(error);
            Alert.alert('An error occurred');
          }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color:'black'
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        paddingHorizontal: 8,
        backgroundColor:'lightblue',
        color:'black'
    },
    button: {
        backgroundColor: '#3FC0F4',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export { UpdatePassword }