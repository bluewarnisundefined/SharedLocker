import lockerAPI from '@/network/locker/api';
import userAPI from '@/network/user/api';
import { IServerErrorResponse } from '@/types/api';
import { ILockerShare, ILockerWithUserInfo } from '@/types/api/locker';
import { IUsersLocker, User } from '@/types/api/user';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Alert, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function RequestList(props: {
    locker: ILockerWithUserInfo
}) {
    const { refetch: userLockerRefetch } = 
        useQuery<IUsersLocker>(['userLocker'], () => userAPI().locker(),);

    const shareMutation = useMutation<ILockerShare, IServerErrorResponse<string>, string>({
        mutationFn: (sharedWith) => {
            return lockerAPI().shareLocker(
                props.locker.buildingNumber,
                props.locker.floorNumber,
                props.locker.lockerNumber,
                sharedWith,
            );
        },
        onSuccess: shareLockerData => {
            if (!shareLockerData) {
                return;
            }

            const data = shareLockerData.data;

            if (data.success) {
                Toast.show({
                    type: 'success',
                    text1: '성공',
                    text2: data?.message,
                });
                userLockerRefetch()
            }
        },
        onError(error: IServerErrorResponse<string>) {
            Toast.show({
                type: 'error',
                text2: error.response.data.message
            });
        },
    });

    const beforeRequest = (user: User) => {
        Alert.alert(
            '요청 수락',
            `${user.nickname}(${user.userId}) 님의 공유 요청을 수락하시겠습니까?`,
            [
                {
                    text: '취소',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: '확인',
                    onPress: () => {
                        shareMutation.mutate(user.userId);
                    },
                },
            ],
        )
    }
    return (
        <>
            {
                props.locker.shareRequestedUsers.length === 0 &&
                <Text>대기중인 공유 요청이 없습니다.</Text>
            }
            {props.locker.shareRequestedUsers.map((user, index) => (
                <View
                    key={index}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text>
                        {`${user.nickname} (${user.userId})`}
                    </Text>
                    <Button
                        mode='contained'
                        onPress={() => {
                            beforeRequest(user)
                        }}
                    >
                        수락
                    </Button>
                </View>
            ))}
        </>
    )
}
