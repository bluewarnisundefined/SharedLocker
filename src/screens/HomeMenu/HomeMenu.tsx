import { MenuStackParamList } from "@/navigation/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Profile } from "./Profile";
import Test from "./Test";

export default function HomeMenu(): JSX.Element {
    const MenuStack = createNativeStackNavigator<MenuStackParamList>();

    return (
        <MenuStack.Navigator initialRouteName="Profile">
            <MenuStack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
            <MenuStack.Screen name="Test" component={Test} options={{headerShown: false}}/>
        </MenuStack.Navigator>
    )
}