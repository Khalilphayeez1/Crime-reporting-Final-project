import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { ip } from "../../ip";
import { useState, useEffect } from "react";
import { Table, Row } from "react-native-table-component";
import { Image } from "react-native";
const ViewCriminals = () => {

    const [crimes, setCrimes] = useState([{}]);
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dlrea1e3l/image/upload";
    useEffect(() => {
        const getCrime = async () => {
            try {
                let response = await fetch(`http://${ip}:3001/view_criminals`, {
                    method: "GET"
                });
                let json = await response.json();
                setCrimes(json.data);
                // else alert("Server error");
            } catch (error) {
                console.log(error)
            }
        }
        getCrime();
    }, [crimes]);

    const tableData = crimes.map((item) => [item.description, item.location, item.type, item.image]);

    return (
        <ScrollView style={style.container}>
            <Text style={style.title}>Complaints { }</Text>

            {crimes.map((item, index) => (
                <View key={item.id || index} style={{flexDirection:'row', borderColor:'#D10A1E', padding:10, borderWidth:1,marginTop:3, marginBottom:20}}>
                    <View>
                        <Text style={style.head}>Crime ID</Text>
                        <Text style={{color:'blue'}}>{item.id}</Text>
                        <Text style={style.head}>Name </Text>
                        <Text style={{color:'blue'}}>{item.name}</Text>
                        <Text style={style.head}>last name</Text>
                        <Text style={{color:'blue'}}> {item.lname}</Text>
                        <Text style={style.head}>Age</Text>
                        <Text style={{color:'blue'}}> {item.age}</Text>
                        <Text style={style.head}>Nationality</Text>
                        <Text style={{color:'blue'}}> {item.nationality}</Text>
                        <Text style={style.head}>Crimes commited</Text>
                        <Text style={{color:'blue'}}> {item.crime}</Text>
                    </View>
                    <View style={{marginLeft:5, padding:5}}>
                        <Text style={style.head}>Crime image</Text>
                        <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} alt={"Crime image"} />

                    </View>
                </View>
            ))}


        </ScrollView>
    )
}
export { ViewCriminals }
const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 33,
        backgroundColor: '#fff',
    },
    head: {
        height: 45,
        backgroundColor: '#f1f8ff',
        color: 'black'
    },
    text:
    {
        margin: 6,
        color: 'black',
        color:'black'
    },
    title: {
        color: 'black',
        fontWeight: '900',
        margin: 20,
        fontSize: 18,
        marginLeft: 110
    },
    head: {
        fontWeight: '800',
        color:'black'
    }
})