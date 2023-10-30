import React from 'react';
import { ScrollView, View } from 'react-native';
import {
    Button,
    Checkbox,
    Text,
    TextInput,
} from 'react-native-paper';

export default function Register(): JSX.Element {
    const [checked, setChecked] = React.useState(false);
    return (
        <ScrollView style={{
            // width: '100%',
            // height: '100%',
            // justifyContent: 'center',
            // gap: 64,
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
                    <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>새로운 계정 생성</Text>
                    <Text variant='titleSmall'>이미 계정이 있으신가요? 로그인</Text>
                </View>
                <View
                    style={{
                        gap: 14,
                    }}>
                    <TextInput placeholder='이름' />
                    <TextInput placeholder='아이디' />
                    <TextInput placeholder='비밀번호' />
                    <TextInput placeholder='비밀번호 재입력' />


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
                    <Text>이용약관에 동의합니다.</Text>
                </View>

                <View>
                    <Button mode='contained-tonal'>
                        회원가입
                    </Button>
                </View>
            </View>

        </ScrollView>
    );
}
