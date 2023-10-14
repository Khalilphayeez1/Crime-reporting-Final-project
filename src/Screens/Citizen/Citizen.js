import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { Home } from './Home';
import { ReportCrime } from './ReportCrime';
import { MostWantedPerson } from './MostWantedPerson';
import { FeedBack } from './Feedback'
import { TrackComplaint } from './TrackComplaint';
import { Signin } from '../LoginScreen/SignIn';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useApplicationProvider } from "../../context/applicationContext";
import Exit from '../HandleLogoutComp/Exit';



const Drawer = createDrawerNavigator();
const Citizen = ({ navigation }) => {

  const { token } = useApplicationProvider()

  return (
    <NavigationContainer independent={true}>
      {
        token ?
          <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerRight: () => <Exit /> }}>
            <Drawer.Screen name='Home' component={Home}
              options={{
                drawerIcon: ({ focused, size }) => (
                  <Icon name="home" size={size} color="#900" />
                )
              }}
            />
            <Drawer.Screen name="Report Crime" component={ReportCrime}
              options={{
                drawerIcon: ({ focused, size }) => (
                  <Icon name="newspaper-o" size={size} color="#900" />
                )
              }}
            />
            <Drawer.Screen name='Track Complaint' component={TrackComplaint}
              options={{
                drawerIcon: ({ focused, size }) => (
                  <Icon name="history" size={size} color="#900" />
                )
              }}
            />
            <Drawer.Screen name='Most Wanted Persons' component={MostWantedPerson}
              options={{
                drawerIcon: ({ focused, size }) => (
                  <Icon name="user-secret" size={size} color="#900" />
                )
              }}
            />
            <Drawer.Screen name='Give feedback' component={FeedBack}
              options={{
                drawerIcon: ({ focused, size }) => (
                  <Icon name="commenting" size={size} color="#900" />
                )
              }}
            />
            <Drawer.Screen
              name="Logout"
              component={Signin}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  e.preventDefault(); // Prevent default navigation
                  handleLogout(); // Handle logout functionality
                  navigation.navigate('Signin'); // Navigate to the sign-in screen
                }
              })}
              options={{
                drawerLabel: 'Logout',
                drawerIcon: ({ focused, size }) => (
                  <Icon name="sign-out" size={size} color="#900" />
                )
              }}
            />
          </Drawer.Navigator>
          : <Signin />
      }
    </NavigationContainer>
  );
}
export { Citizen }
