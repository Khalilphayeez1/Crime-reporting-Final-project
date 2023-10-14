import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import { ip } from "../../ip";
import { Alert } from 'react-native';

const VerifyAccounts = () => {
  const [policeList, setPoliceList] = useState([]);

  useEffect(() => {
    fetch(`http://${ip}:3001/pending-accounts`)
      .then((response) => {
        console.log('Response:', response);
        return response.json();
      })
      .then((data) => {
        console.log('Data:', data);
        if (data.success) {
          setPoliceList(data.policeList);
        } else {
          Alert.alert('Error', data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred while fetching pending accounts.');
        
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.email}</Text>
      <TouchableOpacity style={styles.approveButton} onPress={() => handleApproval(item.id, true)}>
        <Text style={styles.buttonText}>Approve</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rejectButton} onPress={() => handleApproval(item.id, false)}>
        <Text style={styles.buttonText}>Reject</Text>
      </TouchableOpacity>
    </View>
  );

  const handleApproval = (id, approval) => {    
    fetch(`http://${ip}:3001/approval/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ approval }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Update the policeList state to remove the approved/rejected account
          setPoliceList(policeList.filter((item) => item.id !== id));
          Alert.alert('Success', 'Account approval status updated.');
        } else {
          Alert.alert('Error', data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred while updating approval status.');
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={policeList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  approveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export { VerifyAccounts };
