import React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Image} from "react-native";
import { ip } from "../../ip";

const MostWantedPerson =()=>{
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
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Most Wanted Criminals</Text>
    
          {crimes.map((item, index) => (
            <View key={item.id || index} style={styles.crimeContainer}>
              <View style={styles.crimeInfo}>
                <Text style={styles.head}>Crime ID</Text>
                <Text style={styles.blueText}>{item.id}</Text>
                <Text style={styles.head}>Name</Text>
                <Text style={styles.blueText}>{item.name}</Text>
                <Text style={styles.head}>Last Name</Text>
                <Text style={styles.blueText}>{item.lname}</Text>
                <Text style={styles.head}>Age</Text>
                <Text style={styles.blueText}>{item.age}</Text>
                <Text style={styles.head}>Nationality</Text>
                <Text style={styles.blueText}>{item.nationality}</Text>
                <Text style={styles.head}>Crimes Committed</Text>
                <Text style={styles.blueText}>{item.crime}</Text>
              </View>
              <View style={styles.imageContainer}>
                <Text style={styles.head}>Crime Image</Text>
                <Image source={{ uri: item.image }} style={styles.image} alt="Crime image" />
              </View>
            </View>
          ))}
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f5f5f5",
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color:'black',
        marginLeft:85,
        color:'#43C4C0'
      },
      crimeContainer: {
        flexDirection: "row",
        padding: 10,
        borderWidth: 2,
        marginVertical: 5,
        backgroundColor: "#fff",
      },
      crimeInfo: {
        flex: 1,
      },
      head: {
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 2,
        color:'black',
      },
      blueText: {
        color: "blue",
        marginBottom: 5,
      },
      imageContainer: {
        marginLeft: 20,
        padding: 10,
        alignItems: "center",
      },
      image: {
        width: 200,
        height: 200,
      },
    });

    export {MostWantedPerson}