import { RootStackScreenProps } from '@/navigation/types';
import lockerAPI from '@/network/locker/api';
import userAPI from '@/network/user/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
    Button,
    Text,
    TextInput,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function ShareLocker(props: RootStackScreenProps<'ShareLocker'>): JSX.Element {
    const buildingName = useRef('');
    const floorNumber = useRef(0);
    const lockerNumber = useRef(0);
    const [sharedWith, setSharedWith]  = useState('');

    const { isSuccess, data: userLocker } = useQuery(
        ['userLocker'],
        () => userAPI().locker(),
    )

    const { data: shareLockerData, refetch: refetchShareRequest } = useQuery(
        ['shareLocker'],
        () => lockerAPI().shareLocker(
            buildingName.current, 
            floorNumber.current, 
            lockerNumber.current, 
            sharedWith
        ),
        {
            enabled: false,
            retry: false
        }
    )

    const onButtonPressed = useCallback(() => {
        if(!isSuccess) return;

        const locker = userLocker?.data.locker;

        buildingName.current = locker.building;
        floorNumber.current = locker.floorNumber;
        lockerNumber.current = locker.lockerNumber;

        refetchShareRequest();

    }, [userLocker, isSuccess])

    useEffect(() => {
        if(!shareLockerData) return;

        console.log('[ShareLocker] shareLockerData.data: ', shareLockerData);

        const data = shareLockerData.data;

        if(data.success){
            Toast.show({
                type: 'success',
                text1: '성공',
                text2: data.message
            });
            props.navigation.navigate('Home');
        }
    }, [shareLockerData])

    return (
        <ScrollView style={{
            padding: 16,
        }}>
            <View style={{
                gap: 16
            }}>
                <View style={{
                    marginTop: 64,
                    marginBottom: 16,
                    gap: 8
                }}>
                    <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>공유자 추가</Text>
                    <Text variant='titleSmall'>보관함을 함께 공유할 수 있습니다.</Text>
                </View>
                <View
                    style={{
                        gap: 14,
                    }}>
                    <TextInput placeholder='공유자 아이디를 입력하세요' onChangeText={newText => setSharedWith(newText)}/>
                </View>

                <View>
                    <Button mode='contained-tonal' onPress={() => onButtonPressed()}>
                        등록
                    </Button>
                </View>
            </View>

        </ScrollView>
    );
}
