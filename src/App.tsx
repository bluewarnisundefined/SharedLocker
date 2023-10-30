import React from 'react';
import Main from './screens/Main';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import { RootStackParamList } from './navigation/types';
import ClaimLocker from './screens/Claim/ClaimLocker';

export default function App(): JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ClaimLocker" component={ClaimLocker} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
