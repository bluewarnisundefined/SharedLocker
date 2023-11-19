import { RootStackScreenProps } from '@/navigation/types';
import authAPI from '@/network/auth/api';
import userAPI from '@/network/user/api';
import { removeAllSecureToken } from '@/utils/keychain';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import {
    Button,
    Card,
    Text,
} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

export default function Home(props: RootStackScreenProps<'Home'>): JSX.Element {
    const { status: authStatus, data: authData, refetch: authRefetch } = useQuery(['auth'], () => authAPI().signOut(), {
        enabled: false,
        retry: false
    });

    const { data: userLocker } = useQuery(
        ['userLocker'],
        () => userAPI().locker(),
    )

    const userLockerName = useCallback(() => {
        const locker = userLocker?.data.locker;

        if (!locker) return '';

        const building = locker.building;
        const floorNum = locker.floorNumber;
        const lockerNum = locker.lockerNumber;

        return `${building} ${floorNum}층 ${lockerNum}번`
    }, [userLocker]);

    useEffect(() => {
        if (authStatus == 'success' && authData) {
            const _data = authData.data;

            if (_data && _data.success) {
                const tokenExist = _data.token ? true : false;
                if (!tokenExist) removeAllSecureToken();
            }
        }
    }, [authStatus, authData])

    return (
        <ScrollView style={{
            padding: 16,
        }}>
            <Card mode='contained' style={{
                padding: 8
            }}>
                <Card.Title title="사용중인 보관함" />
                <Card.Content>
                    <View style={{
                        margin: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 8
                    }}>
                        <QRCode
                            value="http://awesome.link.qr"
                            logoBackgroundColor='transparent'
                        />
                        <Text>ABC 123</Text>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: 'bold'
                        }}>
                            {userLockerName()}
                        </Text>
                    </View>
                </Card.Content>
            </Card>
            {
                userLocker?.data.success ? (
                    <Button
                        mode='outlined'
                        onPress={() => {

                        }}
                    >
                        보관함 삭제 (아직 구현 안됨)
                    </Button>
                ) : (
                    <Button
                        mode='outlined'
                        onPress={() => {
                            props.navigation.navigate('ClaimLocker');
                        }}
                    >
                        보관함 신청
                    </Button>
                )
            }

            <Button
                mode='outlined'
                onPress={() => {
                    props.navigation.navigate('ShareLocker');
                }}
            >
                보관함 공유
            </Button>
            <Button
                mode='outlined'
                onPress={() => {
                    authRefetch();
                }}
            >
                로그아웃
            </Button>
        </ScrollView>
    );
}
