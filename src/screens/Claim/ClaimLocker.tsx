import { createContext, useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainCategory from './MainCategory';
import SubCategory from './SubCategory';
// import DetailCategory from './DetailCategory';
import { ClaimStackParamList } from '@/navigation/types';
import DetailCategory from './DetailCategory';

export default function ClaimLocker() {

    // 건물 이름 (대분류) ex) 정보공학관, 지천관 등
    // 건물 층수 (중분류) ex) 1층 2층..
    // 보관함 번호 (소분류) ex) 1번 2번..

    const Stack = createNativeStackNavigator<ClaimStackParamList>();

    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainCategory} />
            <Stack.Screen name="Sub" component={SubCategory} />
            <Stack.Screen name="Detail" component={DetailCategory} />
        </Stack.Navigator>
    )
}