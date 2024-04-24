import React, {createContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useQuery} from '@tanstack/react-query';
import {RootStackParamList, RootTabParamList} from '@/navigation/types';
import Home from './screens/Home';
import ClaimLocker from './screens/Claim/ClaimLocker';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Register from './screens/Register';
import authAPI from '@/network/auth/api';
import {getSecureToken, setSecureTokens} from '@/utils/keychain';
import ShareLocker from './screens/ShareLocker';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { ILockerWithUserInfo } from './types/locker';

interface ILockerScreenContext {
  selectedLocker: ILockerWithUserInfo | undefined,
  setSelectedLocker: React.Dispatch<React.SetStateAction<ILockerWithUserInfo | undefined>>
}
export const LockerContext = createContext<ILockerScreenContext>({
  selectedLocker: undefined,
  setSelectedLocker: () => {}
});

export default function Intro(): JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const Tab = createMaterialBottomTabNavigator<RootTabParamList>();
  const [rfToken, setRfToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedLocker, setSelectedLocker] = useState<ILockerWithUserInfo>();

  const {
    status: authState,
    data: authData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery(['auth'], () => authAPI().refreshToken(), {
    // 캐시 유효기간을 4초로 설정하여 비슷한 시간에 여러번 요청되는 경우를 방지.
    staleTime: 1000 * 4,
    enabled: rfToken !== '',
    retry: false,
  });

  useEffect(() => {
    getSecureToken('refreshToken').then(res => {
      if (res) {
        setRfToken(res);
      }
    });
  }, []);

  useEffect(() => {
    if (isSuccess && authData) {
      const _data = authData.data;
      const success = _data.success;
      const token = _data.token;
      const tokenExist = token ? true : false;

      const accessToken = tokenExist ? _data.token.accessToken : '';
      const refreshToken = tokenExist ? _data.token.refreshToken : '';

      console.log(
        '[App] useQuery refresh Token authData.data: ',
        authData.data,
      );

      if (success && !tokenExist) {
        setIsLoggedIn(false);
      }
      if (success && tokenExist) {
        setIsLoggedIn(true);
        setSecureTokens(accessToken, refreshToken).then(() => {
          console.log('[Intro] 토큰이 KeyChain 에 저장되었습니다.');
        });
      }
    }
  }, [authState, isLoading, isSuccess, isError, authData]);

  
  return (
    <LockerContext.Provider value={{selectedLocker, setSelectedLocker}}>
      <NavigationContainer>
        {
          isLoggedIn ? (
            <Tab.Navigator initialRouteName='Home'>
              <Tab.Screen
                name="Home"
                component={Home}
              />
              <Tab.Screen
                name="ClaimLocker"
                component={ClaimLocker}
              />
              <Tab.Screen
                name="ShareLocker"
                component={ShareLocker}
              />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator initialRouteName="Welcome">
              <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            </Stack.Navigator>
          )
        }
      </NavigationContainer>
    </LockerContext.Provider>

  );
}
