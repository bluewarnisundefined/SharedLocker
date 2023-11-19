import { RootStackScreenProps } from '@/navigation/types';
import lockerAPI from '@/network/locker/api';
import userAPI from '@/network/user/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
    Button,
    Text,
    TextInput,
} from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function ShareLocker(props: RootStackScreenProps<'ShareLocker'>): JSX.Element {
    const [sharedWith, setSharedWith] = useState('');

    const { isSuccess, data: userLocker } = useQuery(
        ['userLocker'],
        () => userAPI().locker(),
    )
    const mutation = useMutation({
        mutationFn: (share: {buildingName: string, floorNumber: number, lockerNumber: number, sharedWith: string}) => {
            return lockerAPI().shareLocker(share)
        },
        onSuccess: (data, variables) => {
            const _data = data.data;

            if(_data.success){
                Toast.show({
                    type: 'success',
                    text2: _data.message
                });
                props.navigation.navigate('Home');
            }
        }
    })

    const onButtonPressed = useCallback(() => {
        if(!isSuccess) return;

        const locker = userLocker?.data.locker;

        const buildingName = locker.building;
        const floorNumber = locker.floorNumber;
        const lockerNumber = locker.lockerNumber;

        mutation.mutate({buildingName, floorNumber, lockerNumber, sharedWith});

    }, [userLocker, isSuccess, sharedWith])

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
