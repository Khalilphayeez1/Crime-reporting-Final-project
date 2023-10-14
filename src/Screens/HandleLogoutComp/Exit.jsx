import { useNavigation, CommonActions } from "@react-navigation/native";
import { useApplicationProvider } from "../../context/applicationContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Signin } from "../LoginScreen/SignIn";
import { DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Exit = () => {
    
    const navigation = useNavigation();
    const {setToken} = useApplicationProvider();
  
    const handleLogout =  () => {
      // Clear the token from storage
      setToken(null); 
    }
    return (
      <TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
        <Icon name="sign-out" size={24} color="#900" />
      </TouchableOpacity>
    );
};
export default Exit;