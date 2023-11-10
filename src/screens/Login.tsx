import { RootStackScreenProps } from '@/navigation/types';
import authAPI from '@/network/auth/api';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
    Button,
    Checkbox,
    Text,
    TextInput,
} from 'react-native-paper';

export default function Login(props: RootStackScreenProps<'Login'>): JSX.Element {
    const [checked, setChecked] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
        
    const { refetch } = useQuery(['auth'], () => authAPI().signIn(id, password), {
        enabled: false,
        retry: false
    });

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
                    <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>로그인</Text>
                    <Text variant='titleSmall'>계정이 없으신가요? 회원 가입</Text>
                </View>
                <View
                    style={{
                        gap: 14,
                    }}>
                    <TextInput
                        placeholder='아이디'
                        onChangeText={(newText) => { setId(newText) }}
                    />
                    <TextInput
                        placeholder='비밀번호'
                        onChangeText={(newText) => { setPassword(newText) }}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',

                }}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text>로그인 유지</Text>
                </View>

                <View>
                    <Button
                        mode='contained-tonal'
                        onPress={() => refetch()}
                    >
                        로그인
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}
