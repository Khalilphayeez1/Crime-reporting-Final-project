import React from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { ip } from "../../ip";
import { useState, useEffect } from "react";
import { Table, Row } from "react-native-table-component";
import { Image } from "react-native";

const ViewComplaints = () => {
  const [crimes, setCrimes] = useState([{}]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dlrea1e3l/image/upload";
  
  useEffect(() => {
    const getCrime = async () => {
      try {
        let response = await fetch(`http://${ip}:3001/get_crime`, {
          method: "GET",
        });
        let json = await response.json();
        setCrimes(json.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCrime();
  }, []);

  const handleStatusChange = async (index, status) => {
    try {
      const crimeId = crimes[index].id;

      const response = await fetch(`http://${ip}:3001/update_status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ crimeId, status }),
      });

      if (response.ok) {
        const updatedCrimes = [...crimes];
        updatedCrimes[index].status = status;
        setCrimes(updatedCrimes);

        setSelectedStatus(status);
      } else {
        console.log("Status update failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tableData = crimes.map((item) => [
    item.description,
    item.location,
    item.type,
    item.image,
  ]);

  return (
    <ScrollView style={style.container}>
      <Text style={style.title}>Complaints</Text>

      {crimes.map((item, index) => (
        <View key={index} style={{ padding: 10, borderWidth: 1,borderColor:'#D10A1E', marginBottom: 20 }}>
          <View>
            <ScrollView>
              <Text style={style.head}>Crime ID</Text>
              <Text style={{ color: 'blue' }}>{item.id}</Text>
              <Text style={style.head}>Crime description</Text>
              <Text style={{ color: 'blue' }}> {item.description}</Text>
              <Text style={style.head}>Crime Type</Text>
              <Text style={{ color: 'blue' }}>{item.type}</Text>
              <Text style={style.head}>Crime Location</Text>
              <Text style={{ color: 'blue' }}> {item.location}</Text>
            </ScrollView>
            <View style={{ marginLeft: 20, padding: 10 }}>
              <Text style={style.head}>Crime image</Text>
              <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} alt={"Crime image"} />
            </View>
          </View>
          <View style={{ marginTop: 10, alignItems: 'center' }}>
            {!item.status && (
              <>
                <TouchableOpacity
                  style={[style.button, style.acceptButton]}
                  onPress={() => handleStatusChange(index, 'accepted')}
                >
                  <Text style={[style.buttonText, style.acceptButtonText]}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[style.button, style.ignoreButton]}
                  onPress={() => handleStatusChange(index, 'rejected')}
                >
                  <Text style={[style.buttonText, style.ignoreButtonText]}>Ignore</Text>
                </TouchableOpacity>
              </>
            )}
            {item.status && (
              <Text style={style.statusText}>
                {item.status === 'accepted' ? 'Approved' : 'Ignored'}
              </Text>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color:'black',
    marginLeft:85
  },
  head: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: "green",
  },
  ignoreButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  acceptButtonText: {
    color: "white",
  },
  ignoreButtonText: {
    color: "white",
  },
  statusText: {
    color:'lightgreen',
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export { ViewComplaints };
