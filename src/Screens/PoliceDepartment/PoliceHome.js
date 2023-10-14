import react from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./Home";
import { ViewComplaints } from "./ViewComplaints";
import { ViewCriminals } from "./ViewCriminals";
import { AddCriminals } from "./AddCriminals";
import { AddNews } from "./AddNews";
import Icon from 'react-native-vector-icons/FontAwesome';
import Exit from "../HandleLogoutComp/Exit";
import { Signin } from "../LoginScreen/SignIn";
import { useApplicationProvider } from "../../context/applicationContext";

const Drawer = createDrawerNavigator();
const PoliceHome = ({ navigation }) => {
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
                        <Drawer.Screen name='Add News' component={AddNews}
                            options={{
                                drawerIcon: ({ focused, size }) => (
                                    <Icon name="newspaper-o" size={size} color="#900" />
                                )
                            }}
                        />
                        <Drawer.Screen name='Add Criminals' component={AddCriminals}
                            options={{
                                drawerIcon: ({ focused, size }) => (
                                    <Icon name="male" size={size} color="#900" />
                                )
                            }}
                        />
                        <Drawer.Screen name="View Complaints" component={ViewComplaints}
                            options={{
                                drawerIcon: ({ focused, size }) => (
                                    <Icon name="vcard-o" size={size} color="#900" />
                                )
                            }}
                        />
                        <Drawer.Screen name='View Criminals' component={ViewCriminals}
                            options={{
                                drawerIcon: ({ focused, size }) => (
                                    <Icon name="user-circle-o" size={size} color="#900" />
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
    )
}
export { PoliceHome }