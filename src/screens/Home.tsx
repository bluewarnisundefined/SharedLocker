import { RootStackScreenProps } from '@/navigation/types';
import authAPI from '@/network/auth/api';
import { removeAllSecureToken } from '@/utils/keychain';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import {
    Button,
    Card,
    Text,
} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

export default function Home(props: RootStackScreenProps<'Home'>): JSX.Element {
    const { status, data, refetch } = useQuery(['auth'], () => authAPI().signOut(), {
        enabled: false,
        retry: false
    });

    useEffect(() => {
        if(status == 'success' && data){
            const _data = data.data;

            if(_data && _data.success){
                const tokenExist = _data.token ? true : false;
                if(!tokenExist) removeAllSecureToken();
            }
        }
    }, [status, data])

    return (
        <ScrollView style={{
            padding: 16,
        }}>
            <Card mode='contained' style={{
                padding: 8
            }}>
                <Card.Title title="보관함" />
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
                            정보공학관-8-4
                        </Text>
                    </View>

                </Card.Content>
            </Card>
            <Button 
                mode='outlined' 
                onPress={() => {
                    props.navigation.navigate('ClaimLocker');
                }}
            >
                ClaimLocker
            </Button>
            <Button 
                mode='outlined' 
                onPress={() => {
                    refetch();
                }}
            >
                로그아웃
            </Button>
        </ScrollView>
    );
}
