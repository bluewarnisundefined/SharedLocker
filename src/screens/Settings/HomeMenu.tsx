import { MenuStackParamList } from "@/navigation/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings, { SettingStack } from "./Settings";

export default function HomeMenu(): JSX.Element {
    const MenuStack = createNativeStackNavigator<MenuStackParamList>();

    return (
        <MenuStack.Navigator initialRouteName="SettingStack">
            <MenuStack.Screen name="SettingStack" component={SettingStack} options={{headerShown: false}}/>
        </MenuStack.Navigator>
    )
}