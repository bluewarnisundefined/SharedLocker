import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryCache, QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { RootStackParamList } from '@/navigation/types';
import Home from './screens/Home';
import ClaimLocker from './screens/Claim/ClaimLocker';
import Main from './screens/Main';
import Login from './screens/Login';
import Register from './screens/Register';
import authAPI from '@/network/auth/api';
import { getSecureToken, removeAllSecureToken, setSecureToken, setSecureTokens } from '@/utils/keychain';
import ShareLocker from './screens/ShareLocker';

export default function Intro(): JSX.Element {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const [rfToken, setRfToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { status: authState, data: authData, isLoading, isSuccess, isError } =
        useQuery(['auth'], () => authAPI().refreshToken(), {
            // 캐시 유효기간을 4초로 설정하여 비슷한 시간에 여러번 요청되는 경우를 방지.
            staleTime: 1000 * 4,
            enabled: rfToken != '',
            retry: false
        });

    useEffect(() => {
        getSecureToken('refreshToken').then(res => {
            if(res) setRfToken(res);
        })
    }, []);

    useEffect(() => {
        if(isSuccess && authData){
            const _data = authData.data;
            const success = _data.success;
            const token = _data.token;
            const tokenExist = token ? true : false;

            const accessToken = tokenExist ? _data.token.accessToken : '';
            const refreshToken = tokenExist ? _data.token.refreshToken : '';

            console.log('[App] useQuery refresh Token authData.data: ', authData.data);

            if (success && !tokenExist){
                setIsLoggedIn(false);
            }
            if (success && tokenExist) {
                setIsLoggedIn(true);
                setSecureTokens(accessToken, refreshToken).then(res => {
                    console.log('[Intro] 토큰이 KeyChain 에 저장되었습니다.')
                });
            }
        }
    }, [authState, isLoading, isSuccess, isError, authData]);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                {isLoggedIn ?
                    (
                        <>
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="ClaimLocker" component={ClaimLocker} options={{ headerShown: false }} />
                            <Stack.Screen name="ShareLocker" component={ShareLocker} options={{ headerShown: false }}/>
                        </>
                    ) :
                    (
                        <>
                            <Stack.Screen name="Main" component={Main} />
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Register" component={Register} />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}
