import react from "react";
import { View, Text, Button } from "react-native";
import { ViewFeedbacks } from "./ViewFeedbacks";
import { Home } from "./Home";
import { VerifyAccounts } from "./VerifyAccount";
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Signin } from "../LoginScreen/SignIn";
import { NavigationContainer } from "@react-navigation/native";
import { useApplicationProvider } from "../../context/applicationContext";
import Exit from "../HandleLogoutComp/Exit";
import { CommonActions } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
const AdminHome = ({ Navigatotion }) => {
    const { token } = useApplicationProvider()
    return (
        <NavigationContainer independent={true}>
            {
                token ?
                <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerRight: () => <Exit /> }}>
                        <Drawer.Screen name="Home" component={Home}
                            options={{
                                drawerIcon: ({ focused, size }) => (
                                    <Icon name="home" size={size} color="#900" />
                                )
                            }}
                        />
                        <Drawer.Screen name="View Feedbacks" component={ViewFeedbacks}
                            options={{
                                drawerIcon: ({ focused, size }) => (
                                    <Icon name="eye" size={size} color="#900" />
                                )
                            }}
                        />
                        <Drawer.Screen name="Acount approvale" component={VerifyAccounts}
                            options={{
                                drawerIcon: ({ focused, size }) => (
                                    <Icon name="user-o" size={size} color="#900" />
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
export { AdminHome }