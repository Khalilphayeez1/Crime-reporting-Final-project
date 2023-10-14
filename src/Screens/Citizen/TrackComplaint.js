import React, { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useApplicationProvider } from "../../context/applicationContext";
import { ip } from "../../ip";

const TrackComplaint = () => {

    const [complaints, setComplaints] = useState([{}]);
    const { token } = useApplicationProvider();


    useEffect(() => {

        const showComplaints = async () => {

            if (Object.keys(complaints[0]).length) return;

            try {

                const dataToSend = { token }
                const response = await fetch(`http://${ip}:3001/get_my_complaints`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                });

                let json = await response.json();

                // console.log(json.result);
                if (json?.result) {
                    setComplaints(json.result);
                }

            } catch (error) {
                console.log(error, "ERROR");
            }
        }

        showComplaints();

    }, [])


    return (
        <ScrollView style={MyStyle.Container}>
            <Text style={MyStyle.lbl}>Complaints </Text>
            {complaints.map((item, index) => (
                <TouchableOpacity  key={`${item.id}_${index}`}>
                    <View style={MyStyle.cont}>
                        <Text style={MyStyle.title}></Text>
                        <Text style={MyStyle.txt}>  Crime ID: {item?.id}</Text>
                        <Text style={MyStyle.txt}> Location: {item?.location}</Text>
                        <Text style={MyStyle.txt}> Crime description: {item?.description}</Text>
                        <Text style={MyStyle.txt}> Crime Type: {item?.type}</Text>
                        <Text style={MyStyle.status}> Status: {item?.status}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView> 
    )
}
export { TrackComplaint }

const MyStyle = StyleSheet.create({
    Container: {
        flex: 1,
        margin: 20
    },
    cont: {
        borderWidth: 1,
        margin:5
    },
    Lable: {
        marginTop: 10,
        fontSize: 15,
        marginLeft: 20,
        color: 'black'
    },
    TextInput: {
        borderBottomColor: '#3FC0F4',
        borderBottomWidth: 3,
        width: 350,
        marginLeft: 20,
        color: 'balck'
    },
    Lable2: {
        marginLeft: 130,
        fontSize: 22,
        padding: 40,
    },
    btn: {
        height: 50,
        width: 80,
        marginLeft: 150,
        marginTop: 10,

    },
    txt: {
        color: 'black',
        fontSize: 18,
    },
    lbl: {
        fontWeight: '700',
        fontSize: 20,
        color: 'black'
    },
    status:{
        color:'red',
        fontSize:20,
        marginLeft:100
        
    }

})