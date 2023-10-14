import React from "react";
import { Text, View, StyleSheet, TextInput, Button, Pressable, TouchableOpacity, Image, Alert } from "react-native";
import { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { emailValidator } from "../../validators/emailValidator";
import { useApplicationProvider } from "../../context/applicationContext";
import { ip } from "../../ip";

const image = require("./lawyer.png");


const Signin = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const { setToken } = useApplicationProvider();
  const [selectedRole, setSelectedRole] = useState("")
  const [color, setColor] = useState(0);

  const handleEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    setEmail(text)
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    }
    else {
      setCheckValidEmail(true);
    }
  }
  // Check if password is valid
  const checkValidityPassword = value => {
    const isNoneWhiteSpcae = /^\S*$/;
    if (!isNoneWhiteSpcae.test(value)) {
      return false
    }
    const isValidLenght = /^.{8,20}$/;
    if (!isValidLenght.test(value)) {
      return false
    }
    return true
  }

  const colors = ['#3FC0F4', 'darkgreen']; // define an array of colors

  useEffect(() => {
    const interval = setInterval(() => {
      // increment the colorIndex state variable by 1
      setColor((color + 1) % colors.length);
    }, 500); // set interval to 2 seconds

    // clear interval when component unmounts to avoid memory leaks
    return () => clearInterval(interval);
  }, [color]);




  const handlLogin = async () => {

    const checkPassword = checkValidityPassword(Password);
    const isEmailValid = emailValidator(email);


    if (!isEmailValid) {
      return alert("Email is not correct");
    }
    else if (!checkPassword) {
      return alert("Invalide password")
    }
    else if (!selectedRole) {
      return alert("Please select your role")
    }

    if (selectedRole === "citizen") {
      //  return navigation.navigate('Citizen')
      try {

        let dataToSend = {
          email,
          password: Password
        }


        const response = await fetch(`http://${ip}:3001/user_login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        });
        const message = await response.json();

        if (message.message === "reged") {
          setToken(message.token); // access token for user
          navigation.navigate("Citizen");
        }
        else alert(message.message);

      } catch (error) {
        console.log("Error! uploading to server: %s", error);
      }
    }
    // if selected role is Admin
    else if (selectedRole === "admin") {
      // return navigation.navigate('AdminHome')
      try {

        let dataToSend = {
          email,
          password: Password
        }
        const response = await fetch(`http://${ip}:3001/admin_login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        });
        const message = await response.json();

        if (message.message === "reged") {
          setToken(message.token); // access token for user
          navigation.navigate("AdminHome");
        }
        else alert(message.message);

      } catch (error) {
        console.log("Error! uploading to server: %s", error);
      }
    }
    else if (selectedRole === "police") {
      // return navigation.navigate('PoliceHome')
      try {

        let dataToSend = {
          email,
          password: Password
        }
        const response = await fetch(`http://${ip}:3001/police_login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        });
        const message = await response.json();

        if (message.message === "reged") {
          if (message.approve === 1) {
            setToken(message.token); // access token for user
            navigation.navigate("PoliceHome");
          } else {
            alert("Your account has not been approved yet.");
          }
        }
        else alert(message.message);

      } catch (error) {
        console.log("Error! uploading to server: %s", error);
      }
    }



  }


  return (

    <ImageBackground style={MyStyle.image} source={image} resizeMode="cover">
      <View style={MyStyle.container}>

        <Text style={MyStyle.header}>WELLCOME</Text>
        <Text style={MyStyle.header3}>TO CRIME REPORTING</Text>

        <View style={MyStyle.footer}>

          <Text style={MyStyle.header2}>LOGIN</Text>

          <Text style={MyStyle.labels}>Email</Text>

          <TextInput placeholder='Email' value={email}
            keyboardType="email-address"
            onChangeText={(text) => handleEmail(text)} autoCapitalize='none' style={MyStyle.txtInput} />
          {checkValidEmail ? <Text style={MyStyle.VlEmail}>Wrong emial format</Text> : <Text></Text>}

          <Text style={MyStyle.labels}>Password</Text>

          <View style={{ flexDirection: "row" }}>

            <TextInput placeholder='Password' value={Password}
              onChangeText={(text) => setPassword(text)} autoCapitalize='none'
              secureTextEntry={seePassword} style={MyStyle.txtInput} />

            <TouchableOpacity
              style={MyStyle.Rappericon}
              onPress={() => setSeePassword(!seePassword)}>
              <Image
                source={
                  seePassword
                    ? require('./icon.png')
                    : require('./ActiveIcon.png')

                }
                style={MyStyle.icon}
              />

            </TouchableOpacity>

          </View>
          <View style={{ alignItems: 'center' }}>
            <Picker
              style={MyStyle.picker}
              enabled={true}
              selectedValue={selectedRole}
              onValueChange={(itemValue) => setSelectedRole(itemValue)}
              mode={"dropdown"}
            >
              <Picker.Item style={{ color: colors[color], fontSize: 18 }} label="Select Role" />
              <Picker.Item style={{ color: colors[color] }} label="Admin" value="admin" />
              <Picker.Item style={{ color: colors[color] }} label="Citizen" value="citizen" />
              <Picker.Item style={{ color: colors[color] }} label="Police" value="police" />
            </Picker>



          </View>


          <View style={{ flexDirection: 'row', marginTop: -25, padding: 10 }}>

            <TouchableOpacity style={MyStyle.BtnLogin} onPress={handlLogin}>
              <Text style={MyStyle.loginlbl}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={MyStyle.btnForgot} onPress={() => {
              navigation.navigate("ForgotPassword")
            }}>
              <Text style={MyStyle.forgotlbl}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center', padding: 10 }}>
            <Pressable style={MyStyle.btnSignup} onPress={() => {
              navigation.navigate("Signup")
            }} >
              <Text style={MyStyle.Signuplbl}>Don't have accoount?</Text>
            </Pressable>
          </View>



        </View>

        

      </View>
    </ImageBackground>

  )
}


const MyStyle = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  header: {
    fontSize: 24,
    color: '#B28A07',
    fontFamily: 'regular',
    marginTop: 12,
    marginLeft: 87
  },
  header3: {
    fontSize: 20,
    color: '#C0960D',
    fontFamily: 'regular',
    marginLeft: 50
  },
  footer: {
    backgroundColor: 'white',
    height: 610,
    width: 410,
    marginTop: 190,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    marginLeft: -63

  },
  header2: {
    marginLeft: 150,
    fontSize: 24,
    fontFamily: 'regular',
    fontWeight: 'bold',
    color: '#3FC0F4'
  },
  header1: {
    fontSize: 18,
    color: 'blue',

  },
  image: {
    height: 255,
    width: 300,
    marginLeft: 63
  },
  txtInput: {
    borderBottomColor: '#3FC0F4',
    borderBottomWidth: 3,
    width: 350,
    marginLeft: 20,
    color: "black",
    marginTop: -8

  },
  labels: {
    marginTop: -10,
    fontSize: 18,
    marginLeft: 20,
    color: '#3FC0F4'
  },

  BtnLogin: {
    marginLeft: 140,
    marginTop: 29,
    backgroundColor: '#3FC0F4',
    borderWidth: 0.4,
    borderRadius: 5,
  },
  loginlbl: {
    fontSize: 21,
    color: 'red',
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 1.5
  },
  btnSignup: {
    // marginLeft: 110,
    width: 170,
    height: 50,

  },
  Signuplbl: {
    color: '#3FC0F4',
    marginTop: 15,
    fontSize: 14
  },
  btnForgot: {
    marginLeft: 20,
    marginTop: 35,
  },
  forgotlbl: {
    color: '#3FC0F4',
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 1.5
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginLeft: -30
  },
  VlEmail: {
    marginLeft: 250,
    color: 'red'
  },
  picker: {
    marginTop: 5,
    height: 50,
    width: 170,
  }

});

export{Signin}