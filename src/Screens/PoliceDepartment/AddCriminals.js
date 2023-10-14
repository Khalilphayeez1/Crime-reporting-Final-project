import react, { useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Button, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import { launchImageLibrary } from 'react-native-image-picker';
import { useApplicationProvider } from "../../context/applicationContext";
import { Image } from "react-native";
import { ip } from "../../ip"
import { Alert } from "react-native";


const AddCriminals = () => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("")
    const [lname, setlName] = useState("")
    const [age, setAge] = useState("")
    const [Nationality, setNationality] = useState("")
    const [crime, setCrime] = useState("")
    const { token } = useApplicationProvider();
    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            else if (response) {
                setImage(response);
            }
        });
    };
    const handleSubmit = async () => {

        if (!name)
            return alert("Enter criminal name")
        else if (!lname)
            return alert("Enter last name")
        else if (!age)
            return alert("Age is not defined")
        else if (!Nationality)
            return alert("Enter nationality")
        else if (!image)
            return alert("Image is not selected")
        else if(!crime)
            return alert("Write the crime committed")
        const imageSecureUrl = await handleImage(image.assets[0]);
        const url = await imageSecureUrl;
        try {

            const response = await fetch(`http://${ip}:3001/criminal_record`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image_url: url, name, lname, age, Nationality, crime, token })
            });
            alert(url, '==============')
            alert("crime reported");

        } catch (error) {
            console.log("Error image upload: %s", error)
        }
    }
    const handleImage = async (imageToUpload) => {

        if (!imageToUpload) return 'no image';
        delete imageToUpload.height;
        delete imageToUpload.width;
        imageToUpload.size = imageToUpload.fileSize;
        delete imageToUpload.fileSize;
        imageToUpload.name = imageToUpload.fileName;
        delete imageToUpload.fileName;

        const imageFile = new FormData();
        imageFile.append("file", imageToUpload);
        imageFile.append("upload_preset", "oc8eyn0s");

        try {

            const response = await fetch("https://api.cloudinary.com/v1_1/dlrea1e3l/image/upload", {
                method: "POST",
                body: imageFile
            });
            let json = await response.json();
            console.log(json, '============> JSON');
            let url = json.secure_url;
            console.log("Secure url ===================> ", url);
            return url;
        } catch (error) {
            return "failed to upload"
        }
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.titleText}>Fill the form Correctly</Text>
                
                <Text style={styles.lbl}>Name</Text>
                <TextInput style={styles.txtInput} placeholder="name"
                    onChangeText={(val) => setName(val)}
                />
                <Text style={styles.lbl}>Last name</Text>
                <TextInput style={styles.txtInput} placeholder="Last name"
                    onChangeText={(val) => setlName(val)}
                ></TextInput>
                <Text style={styles.lbl}>Age</Text>
                <TextInput style={styles.txtInput} placeholder="Age"
                    onChangeText={(val) => setAge(val)}
                ></TextInput>
                <Text style={styles.lbl}>Nationality</Text>
                <TextInput style={styles.txtInput} placeholder="Nationality"
                    onChangeText={(val) => setNationality(val)}
                ></TextInput>
                <Text style={styles.lbl}>Crime commited</Text>
                <TextInput style={styles.txtInput} placeholder="Crime commited"
                    onChangeText={(val) => setCrime(val)}
                ></TextInput>
                <View style={{ alignItems: 'center' }}>
                    {image && (
                        <>
                            <Image
                                source={{ uri: image.assets[0].uri }}
                                style={{ width: 300, height: 300, marginLeft: 30 }}
                            />

                        </>
                    )}
                    <Button style={{ padding: 10, marginTop: 25 }} title="Choose Photo" onPress={handleChoosePhoto} />
                    <Pressable style={{ padding: 10, marginTop: 25 }}>
                        <Button onPress={handleSubmit} title='Submit'>

                        </Button>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};
export { AddCriminals }

const styles = StyleSheet.create({

    btnLbl: {
        fontSize: 20,
        fontWeight: '900'
    },
    txtInput: {
        width: 300,
        borderWidth: 2,
        borderColor: '#D10A1E',
        color:'black'
    },
    btn: {
        // marginLeft: 170,
        marginTop: 70,
        width: 95,
        backgroundColor: 'gray',
        borderWidth: 0.4,
        borderRadius: 5,
    },
    btnLbl: {
        fontSize: 21,
        color: 'black',
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 12,
        paddingVertical: 1.5
    },
    lbl: {
        fontWeight: "bold",
        fontSize: 18,
        color: 'black'
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
        color: 'black'
    },

})