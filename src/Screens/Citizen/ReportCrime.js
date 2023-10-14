import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Button, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { launchImageLibrary } from 'react-native-image-picker';
import { useApplicationProvider } from "../../context/applicationContext";
import { ip } from "../../ip";
import { Image } from "react-native";
import { Home } from "./Home";

const ReportCrime = ({ navigation }) => {
    const [location, setLocation] = useState({
        latitude: 34.1926,
        longitude: 73.2397,
    });
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [crimeType, setCrimeType] = useState("");
    const { token } = useApplicationProvider();

    const handleChoosePhoto = () => {
        launchImageLibrary({ noData: true }, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.errorCode === 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode === 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode === 'others') {
                alert(response.errorMessage);
                return;
            } else if (response) {
                setImage(response);
            }
        });
    };

    const handleSubmit = async () => {
        if (!description) {
            return alert("Provide a description of the crime");
        } else if (!image) {
            return alert("No image selected");
        } else if (!location.longitude || !location.latitude) {
            return alert("Please mark the location");
        }

        const imageSecureUrl = await handleImage(image.assets[0]);
        const url = await imageSecureUrl;

        try {
            const response = await fetch(`http://${ip}:3001/crime_report`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image_url: url,
                    description,
                    crimeType,
                    location: `${location.longitude} ${location.latitude}`,
                    token
                })
            });
            alert("Crime reported");
            navigation.navigate('Home');
        } catch (error) {
            console.log("Error image upload:", error);
        }
    };

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
            const json = await response.json();
            console.log(json, '============> JSON');
            const url = json.secure_url;
            console.log("Secure url ===================> ", url);
            return url;
        } catch (error) {
            return "Failed to upload";
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.content}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    onChangeText={(value) => setDescription(value)}
                    multiline
                    numberOfLines={2}
                    style={styles.textInput}
                />

                <Text style={styles.label}>Crime Type</Text>
                <Picker
                    selectedValue={crimeType}
                    style={styles.picker}
                    onValueChange={(itemValue) => setCrimeType(itemValue)}
                >
                    <Picker.Item label="select crime type" value="" />
                    <Picker.Item label="Robbery" value="Robbery" />
                    <Picker.Item label="Murder" value="Murder" />
                    <Picker.Item label="Kidnapping" value="kid" />
                    <Picker.Item label="CarJacking" value="carj" />
                    <Picker.Item label="Home invasion" value="homeinvasion" />
                    <Picker.Item label="Rape" value="Rape" />
                    <Picker.Item label="Sexual abuse of minor" value="abuse" />
                    <Picker.Item label="Terrorist attack" value="terrorist" />
                    <Picker.Item label="Fraud" value="fraud" />
                    <Picker.Item label="Money Laundering" value="money" />
                    <Picker.Item label="Ransome" value="ransome" />
                    <Picker.Item label="Drug Trafficking" value="drug" />
                    <Picker.Item label="Other..." value="other" />

                </Picker>

                {image && (
                    <>
                        <Image
                            source={{ uri: image.assets[0].uri }}
                            style={styles.image}
                        />
                    </>
                )}

                <TouchableOpacity style={styles.choosePhotoButton} onPress={handleChoosePhoto}>
                    <Text style={styles.buttonText}>Choose Photo</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Mark Location</Text>
                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: 34.1926,
                            longitude: 73.2397,
                            latitudeDelta: 0.021,
                            longitudeDelta: 0.0121,
                        }}
                        showUserLocation
                    >
                        <Marker
                            draggable
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            onDragEnd={(e) => setLocation({ longitude: e.nativeEvent.coordinate.longitude, latitude: e.nativeEvent.coordinate.latitude })}
                        />
                    </MapView>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>

                <Pressable style={styles.button} onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
    },
    content: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 16,
        marginTop: 16,
    },
    label: {
        color: 'black',
        fontWeight: '700',
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        padding: 8,
        marginBottom: 16,
        fontSize: 16,
        color: '#333333',
        backgroundColor: '#FFFFFF',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        color:'black'
    },
    choosePhotoButton: {
        alignItems: 'center',
        backgroundColor: '#4287F5',
        paddingVertical: 12,
        borderRadius: 5,
        marginBottom: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 16,
    },
    mapContainer: {
        height: 400,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 16,
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4287F5',
        paddingVertical: 12,
        borderRadius: 5,
        marginRight: 8,
    },
});

export { ReportCrime };
