import { RootStackScreenProps } from '@/navigation/types';
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

    const onLoginBtnPressed = () => {
        props.navigation.navigate('Home');
    }
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
                        value={id}
                    />
                    <TextInput 
                        placeholder='비밀번호' 
                        value={password}
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
                        onPress={onLoginBtnPressed}
                    >
                        로그인
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}
