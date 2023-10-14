import 'react-native-gesture-handler';
import * as React from 'react';
import { DrawerRouter, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Signup } from './src/Screens/LoginScreen/Signup';
import { Signin } from './src/Screens/LoginScreen/SignIn';
import { OtpScreen } from './src/Screens/LoginScreen/OtpScreen';
import { ForgotPassword } from './src/Screens/LoginScreen/ForgotPassword';
import { Citizen } from './src/Screens/Citizen/Citizen';
import { StatusBar } from 'react-native';
import { ReportCrime } from './src/Screens/Citizen/ReportCrime';
import { applicationContext, ApplicationGlobalContext } from './src/context/applicationContext';
import { AdminHome } from './src/Screens/Admin/AdminHome';
import { PoliceHome } from './src/Screens/PoliceDepartment/PoliceHome';
import { ResetPassword } from './src/Screens/LoginScreen/ResetPassword'
import { UpdatePassword } from './src/Screens/LoginScreen/UpdatePassword';
import Exit from './src/Screens/HandleLogoutComp/Exit';
import { AddNews } from './src/Screens/PoliceDepartment/AddNews';
const Stack = createNativeStackNavigator();



export default App = () => {

    return (
        <ApplicationGlobalContext>

            <NavigationContainer>
                <StatusBar backgroundColor={'skyblue'} />
                <Stack.Navigator >


                    <Stack.Screen name='Signin' component={Signin}
                        options={{ title: '                Crime Reporting System' }} />
                    <Stack.Screen name="reportcrime" component={ReportCrime} />

                    <Stack.Screen name='Citizen' component={Citizen} options={{ headerShown: false }} />

                    <Stack.Screen name='Signup' component={Signup}
                        options={{ title: 'Signup Page' }}>

                    </Stack.Screen>

                    <Stack.Screen name='ForgotPassword' component={ForgotPassword}
                        options={{ title: 'Reset Password' }}>
                    </Stack.Screen>
                    <Stack.Screen name='OtpScreen' component={OtpScreen} />
                    <Stack.Screen name='AdminHome' component={AdminHome} options={{ headerShown: false }} />

                    <Stack.Screen name='PoliceHome' component={PoliceHome} options={{ headerShown: false }} />
                    <Stack.Screen name='ResetPassword' component={ResetPassword} />
                    <Stack.Screen name='UpdatePassword' component={UpdatePassword} />
                    <Stack.Screen name='Exit' component={Exit} />
                    <Stack.Screen name="AddNews"component={AddNews}
                    />
                </Stack.Navigator>


            </NavigationContainer>
        </ApplicationGlobalContext>
    );
};
