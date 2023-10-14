import React, { useState } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Button,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { emailValidator } from '../../validators/emailValidator';
import { usernameValidator } from '../../validators/usernameValidator';
import { cnicValidator } from '../../validators/cnicValidator';
import { genderValidator } from '../../validators/genderValidator';
import { roleValidator } from '../../validators/roleValidator';
import { passwordValidator } from '../../validators/passwordValidator';
import { Image } from 'react-native';
import { ip } from '../../ip';
import { OtpScreen } from './OtpScreen';
import { ScrollView } from 'react-native-gesture-handler';

let handleSubmit;
    const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [cnic, setCnic] = useState('');
    const [gender, setGender] = useState('Unknown');
    const [selectedRole, setSelectedRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [seePassword, setSeePassword] = useState(true);
    const [seePassword1, setSeePassword1] = useState(true);

    const sendOTP = () => {
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

    const handleButtonRegister = () => {
        if (!emailValidator(email)) return alert('Invalid email Address');
        else if (!usernameValidator(username)) return alert('Invalid username');
        else if (!cnicValidator(cnic)) return alert('Invalid CNIC number');
        else if (!genderValidator(gender))
            return alert('Please select your gender');
        else if (!roleValidator) return alert('Please select your role');
        else if (!passwordValidator(password))
            return alert('Invalid or Weak Password');
        else if (!passwordValidator(confirmPassword))
            return alert('Comfirm Password is wrong');
        else if (password !== confirmPassword) {
            return alert("Passwords deosn't match", password, confirmPassword);
        }

        sendOTP();

        // Navigate to otp screen
        navigation.navigate('OtpScreen', { email: email });
    };

    handleSubmit = async () => {
        
        if (selectedRole === 'citizen') {
            try {
                let dataToSend = {
                    email,
                    username,
                    cnic,
                    gender,
                    role: selectedRole,
                    password,
                };

                const response = await fetch(`http://${ip}:3001/register_user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });
                const message = await response.json();
                alert(message.message, 'message');

                if (message.message === 'emailExists')
                    return alert('email already exists');
                else if (message.message === 'data saved')
                    navigation.navigate('Signin');
            } catch (error) {
                console.log('Error! uploading to server: %s', error);
            }
        } else if (selectedRole === 'admin') {

            try {
                let dataToSend = {
                    email,
                    username,
                    cnic,
                    gender,
                    role: selectedRole,
                    password,
                };

                const response = await fetch(`http://${ip}:3001/register_admin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });
                const message = await response.json();
                alert(message.message, 'message');

                if (message.message === 'emailExists')
                    return alert('email already exists');
                else if (message.message === 'data saved')
                    navigation.navigate('Signin');
            } catch (error) {
                console.log('Error! uploading to server: %s', error);
            }
        } else if (selectedRole === 'police') {
            try {
                let dataToSend = {
                    email,
                    username,
                    cnic,
                    gender,
                    role: selectedRole,
                    password,
                };

                const response = await fetch(`http://${ip}:3001/register_police`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToSend),
                });
                const message = await response.json();
                alert(message.message, 'message');

                if (message.message === 'emailExists')
                    return alert('email already exists');
                else if (message.message === 'data saved')
                    navigation.navigate('Signin');
            } catch (error) {
                console.log('Error! uploading to server: %s', error);
            }
        }
    };
    return (
        <ScrollView>
        <View style={style.Container}>
            <Text style={style.Header1}>User Registration Form</Text>

            <View style={style.innerContainer}>
                <Text style={style.label}>Email</Text>
                <TextInput
                    placeholder="Email"
                    style={style.TextInput}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={value => setEmail(value)}
                />
                <Text style={style.label}>User name</Text>
                <TextInput
                    placeholder="User Name"
                    style={style.TextInput}
                    onChangeText={value => setUsername(value)}
                />
                <Text style={style.label}>CNIC NO</Text>
                <TextInput
                    placeholder="CNIC Number"
                    style={style.TextInput}
                    onChangeText={value => setCnic(value)}
                />

                <View style={{ flexDirection: 'row' }}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(value, index) => setGender(value)}
                        mode="dropdown" // Android only
                        style={style.picker}>
                        <Picker.Item style={style.gender} label="Gender" value="Unknown" />
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                    <Picker
                        // selectedValue={selectedValue}
                        style={style.picker2}
                        selectedValue={selectedRole}
                        onValueChange={itemValue => setSelectedRole(itemValue)}
                        mode={'dropdown'}>
                        <Picker.Item label="Select role" />
                        <Picker.Item label="Admin" value="admin" />
                        <Picker.Item label="Citizen" value="citizen" />
                        <Picker.Item label="Police" value="police" />
                    </Picker>
                </View>
                <Text style={style.label}>Password</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        secureTextEntry={seePassword}
                        placeholder="Password"
                        style={style.TextInput}
                        onChangeText={value => setPassword(value)}
                    />
                    <TouchableOpacity
                        style={style.Rappericon}
                        onPress={() => setSeePassword(!seePassword)}>
                        <Image
                            source={
                                seePassword
                                    ? require('./icon.png')
                                    : require('./ActiveIcon.png')
                            }
                            style={style.icon}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={style.label}>Confirm password</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        secureTextEntry={seePassword1}
                        placeholder="Confirm Password"
                        style={style.TextInput}
                        onChangeText={value => setConfirmPassword(value)}
                    />
                    <TouchableOpacity
                        style={style.Rappericon}
                        onPress={() => setSeePassword1(!seePassword1)}>
                        <Image
                            source={
                                seePassword1
                                    ? require('./icon.png')
                                    : require('./ActiveIcon.png')
                            }
                            style={style.icon}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleButtonRegister} style={style.btn}>
                    <Text style={style.btnText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    TextInput: {
        borderBottomColor: '#3FC0F4',
        borderBottomWidth: 3,
        width: 350,
        marginLeft: 20,
        width: 330,
        color: 'black',

        // placeholderTextColor:'black'
    },
    Header1: {
        fontSize: 24,
        marginLeft: 35,
        color: 'black',
    },
    Container: {
        flex: 1,
        // backgroundColor: 'white',
        alignItems: 'center',
    },
    innerContainer: {
        padding: 0,
        height: 550,
        width: 370,
        backgroundColor: '#FEFEFE',
        justifyContent: 'center',
        borderRadius: 25,
    },
    btn: {
        backgroundColor: '#3FC0F4',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 50,
      },
      btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
    ChkBox: {
        marginLeft: 20,
        marginTop: 10,
    },
    picker: {
        marginVertical: 5,
        width: 150,
        padding: 0,
        borderWidth: 1,
        borderColor: '#fff',
        color: '#000',
    },
    picker2: {
        marginVertical: 5,
        // marginTop: -12,
        width: 160,
        padding: 0,
        borderWidth: 1,
        borderColor: '#fff',
        color: '#000',
    },
    gender: {
        color: 'gray',
    },
    label: {
        color: 'black',
        marginLeft: 16,
        marginTop: 1,
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 19,
        marginLeft: -50,
    },
});
export { Signup, handleSubmit };
